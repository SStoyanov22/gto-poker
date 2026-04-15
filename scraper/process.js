#!/usr/bin/env node
// ── GTO Range Processor ───────────────────────────────────────────────────────
//
// Converts raw scraped JSON (1326-combo played arrays) into compact
// per-hand-type frequency maps used by the app.
//
// Input:  scraper/out/raw/{stake}/{pfrSize}/{stack}/{id}.json
// Output: scraper/out/processed/{stake}/{pfrSize}/{stack}/{id}.json
//
// Run after each scraping session:
//   node scraper/process.js                       # process everything
//   node scraper/process.js --stake nl100         # one stake
//   node scraper/process.js --pfr-size 2.5bb      # one pfr size
//   node scraper/process.js --stack 100           # one stack
//   node scraper/process.js --force               # overwrite existing output
//
// Output format (standard scenario):
//   {
//     "raise": { "9bb": { "AA": 1.0, "AKs": 0.8, ... }, "allin": { ... } },
//     "call":  { "2.5bb": { "AA": 0.0, "AKs": 0.2, ... } }
//   }
//
// Output format (sqz vs 4b — variant scenario):
//   {
//     "rfi_4b":  { "raise": { ... }, "call": { ... } },
//     "cc_fold": { "call": { ... } },
//     "cc_call": { "call": { ... } }
//   }
//
// Output format (vs sqz — rfi_fold variant):
//   {
//     "default":  { "raise": { ... }, "call": { ... } },
//     "rfi_fold": { "raise": { ... }, "call": { ... } }
//   }
// ─────────────────────────────────────────────────────────────────────────────

import { readFileSync, writeFileSync, mkdirSync, readdirSync, existsSync, statSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = fileURLToPath(new URL('.', import.meta.url))
const RAW_DIR       = join(__dirname, 'out', 'raw')
const PROCESSED_DIR = join(__dirname, 'out', 'processed')

// ── Combo → hand-type mapping ─────────────────────────────────────────────────
// Cards ordered: 2c(0), 2d(1), 2h(2), 2s(3), 3c(4), ..., As(51)
// rank = Math.floor(cardIdx / 4), suit = cardIdx % 4
const RANKS = ['2','3','4','5','6','7','8','9','T','J','Q','K','A']

const COMBO_HAND = new Array(1326)
let k = 0
for (let i = 0; i < 52; i++) {
  for (let j = i + 1; j < 52; j++) {
    const ri = Math.floor(i / 4), si = i % 4
    const rj = Math.floor(j / 4), sj = j % 4
    if (ri === rj) {
      COMBO_HAND[k] = RANKS[ri] + RANKS[ri]                          // pair: AA, KK…
    } else {
      const hi = ri > rj ? ri : rj
      const lo = ri < rj ? ri : rj
      COMBO_HAND[k] = RANKS[hi] + RANKS[lo] + (si === sj ? 's' : 'o') // AKs, AKo…
    }
    k++
  }
}

// Precompute: hand type → array of combo indices
const HAND_COMBOS = {}
for (let i = 0; i < 1326; i++) {
  const h = COMBO_HAND[i]
  if (!HAND_COMBOS[h]) HAND_COMBOS[h] = []
  HAND_COMBOS[h].push(i)
}

// ── Helpers ───────────────────────────────────────────────────────────────────

// "Raise to 13.00" → "13bb", "Call 2.50" → "2.5bb", "Raise to 100.00" → "100bb"
function parseSizeBb(actionName) {
  const m = actionName?.match(/([\d.]+)\s*$/)
  if (!m) return null
  return parseFloat(parseFloat(m[1]).toFixed(4)).toString() + 'bb'
}

// Average played[] values for the given combo indices
function avgFreq(played, indices) {
  let sum = 0
  for (const i of indices) sum += played[i] ?? 0
  return sum / indices.length
}

// Build compact { handType: value } map from a 1326-element array.
// Entries where the averaged value is below threshold are omitted.
function buildHandMap(arr, threshold = 0.0001, decimals = 4) {
  const out = {}
  for (const [hand, indices] of Object.entries(HAND_COMBOS)) {
    const v = avgFreq(arr, indices)
    if (Math.abs(v) > threshold) out[hand] = parseFloat(v.toFixed(decimals))
  }
  return out
}

// Convert a raw API response object →
//   {
//     raise: { sizeBb: { handType: freq } },
//     call:  { sizeBb: { handType: freq } },
//     ev: {
//       main:          { handType: ev },   // GTO strategy EV
//       raise_<size>:  { handType: ev },   // EV of raising to this size
//       call_<size>:   { handType: ev },   // EV of calling
//     }
//   }
function processResponse(response) {
  const raise = {}
  const call  = {}
  const ev    = {}

  // Per-action frequencies and EVs
  for (const action of (response.actions ?? [])) {
    const name   = action.action ?? ''
    const lower  = name.toLowerCase()
    const played = action.played
    const evArr  = action.ev

    if (lower.startsWith('fold') || !played) continue

    const sizeBb = parseSizeBb(name)
    if (!sizeBb) continue

    const freqMap = buildHandMap(played)
    if (Object.keys(freqMap).length === 0) continue

    const isCall = lower.startsWith('call') || lower.startsWith('limp') ||
                   lower.startsWith('check') || lower.startsWith('complete')

    if (isCall) {
      call[sizeBb] = freqMap
      if (evArr) ev[`call_${sizeBb}`] = buildHandMap(evArr, 0.0001, 4)
    } else {
      raise[sizeBb] = freqMap
      if (evArr) ev[`raise_${sizeBb}`] = buildHandMap(evArr, 0.0001, 4)
    }
  }

  // Overall GTO strategy EV (main_ev array on the response itself)
  if (response.main_ev) {
    ev.main = buildHandMap(response.main_ev, 0.0001, 4)
  }

  const out = {}
  if (Object.keys(raise).length) out.raise = raise
  if (Object.keys(call).length)  out.call  = call
  if (Object.keys(ev).length)    out.ev    = ev
  return out
}

// ── Core processor ────────────────────────────────────────────────────────────

function processFile(rawPath, outPath, force) {
  if (!force && existsSync(outPath)) return 'skipped'

  const raw = JSON.parse(readFileSync(rawPath, 'utf8'))

  let processed

  if (raw.variants) {
    // Sqz vs 4b (rfi_4b / cc_fold / cc_call) or vs sqz with rfi_fold variant
    processed = {}
    for (const [variantKey, variantData] of Object.entries(raw.variants)) {
      if (!variantData?.response) continue
      const result = processResponse(variantData.response)
      if (Object.keys(result).length) processed[variantKey] = result
    }

    // If it's a vs_sqz scenario with a base response + rfi_fold variant in separate files,
    // the base is stored as 'default' — but with our current scraper they're always separate
    // scenario IDs (e.g. btn_vs_sqz_co_bb vs btn_vs_sqz_co_bb_rfi_fold), not variants.
    // So this branch only handles sqz_vs4b files with spec.variants.
    if (Object.keys(processed).length === 0) return 'empty'
  } else if (raw.response) {
    // Standard scenario
    processed = processResponse(raw.response)
    if (Object.keys(processed).length === 0) return 'empty'
  } else {
    return 'empty'
  }

  mkdirSync(dirname(outPath), { recursive: true })
  writeFileSync(outPath, JSON.stringify(processed), 'utf8')
  return 'ok'
}

// ── CLI ───────────────────────────────────────────────────────────────────────

function parseArgs(argv) {
  const args = {}
  for (let i = 0; i < argv.length; i++) {
    if (argv[i].startsWith('--')) {
      const key = argv[i].slice(2)
      const val = argv[i + 1] && !argv[i + 1].startsWith('--') ? argv[++i] : true
      args[key] = val
    }
  }
  return args
}

function main() {
  const args     = parseArgs(process.argv.slice(2))
  const filterStake  = args.stake    ?? null
  const filterPfr    = args['pfr-size'] ?? null
  const filterStack  = args.stack ? `${args.stack}bb` : null
  const force        = !!args.force

  if (!existsSync(RAW_DIR)) {
    console.error(`Raw dir not found: ${RAW_DIR}`)
    process.exit(1)
  }

  let ok = 0, skipped = 0, empty = 0, errors = 0

  // Walk raw/{stake}/{pfrSize}/{stack}/
  for (const stake of readdirSync(RAW_DIR)) {
    if (filterStake && stake !== filterStake) continue
    const stakeDir = join(RAW_DIR, stake)
    if (!statSync(stakeDir).isDirectory()) continue

    for (const pfrSize of readdirSync(stakeDir)) {
      if (filterPfr && pfrSize !== filterPfr) continue
      const pfrDir = join(stakeDir, pfrSize)
      if (!statSync(pfrDir).isDirectory()) continue

      for (const stack of readdirSync(pfrDir)) {
        if (filterStack && stack !== filterStack) continue
        const stackDir = join(pfrDir, stack)
        if (!statSync(stackDir).isDirectory()) continue

        const files = readdirSync(stackDir).filter(f => f.endsWith('.json'))
        console.log(`Processing ${stake}/${pfrSize}/${stack} — ${files.length} files`)

        for (const file of files) {
          const rawPath = join(stackDir, file)
          const outPath = join(PROCESSED_DIR, stake, pfrSize, stack, file)
          try {
            const result = processFile(rawPath, outPath, force)
            if (result === 'ok')      ok++
            else if (result === 'skipped') skipped++
            else if (result === 'empty')   empty++
          } catch (err) {
            console.error(`  ✗ ${file}: ${err.message}`)
            errors++
          }
        }
      }
    }
  }

  console.log(`\nDone: ${ok} written, ${skipped} skipped, ${empty} empty, ${errors} errors`)
}

main()
