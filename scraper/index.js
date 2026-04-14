#!/usr/bin/env node
// ── GTO Range Scraper ────────────────────────────────────────────────────────
//
// Scrapes GTO preflop ranges from gtobase.com and writes them as JS modules
// compatible with the app's range file format.
//
// Usage:
//   node scraper/index.js --token <JWT> [options]
//
// Options:
//   --token <jwt>         Bearer token (required)
//   --stake <stake>       nl50 | nl100 | nl200 | nl500  (default: nl100)
//   --pfr-size <size>     2bb | 2.25bb | 2.5bb | 3bb    (default: 2.5bb)
//   --stack <depth>       Stack depth in bb               (default: 100)
//   --scenario <id>       Scrape a single scenario id
//   --inspect             Print API response for the root node and exit
//   --dry-run             Navigate without writing files
//   --raw                 Save raw JSON responses (no transformation)
//   --out-dir <dir>       Output directory                (default: scraper/out)
//
// Examples:
//   # Inspect the root API response for nl100/2.5bb/100bb
//   node scraper/index.js --token eyJ... --inspect
//
//   # Scrape a single scenario
//   node scraper/index.js --token eyJ... --scenario rfi_btn
//
//   # Scrape all nl100/2.5bb/100bb scenarios
//   node scraper/index.js --token eyJ... --stake nl100 --pfr-size 2.5bb --stack 100
//
// ─────────────────────────────────────────────────────────────────────────────

import { setToken, getStrategy } from './lib/api.js' // getStrategy used in --inspect mode
import { scrapeSpot, scrapeSpotRaw, clearCache } from './lib/navigate.js'
import { formatRange } from './lib/format.js'
import { getSpotId } from './lib/spot_ids.js'
import { writeRangeFile } from './lib/write_output.js'
import SCENARIO_PATHS from './lib/paths.js'
import { join, resolve } from 'path'
import { fileURLToPath } from 'url'
import { writeFile, mkdir } from 'fs/promises'
import { dirname } from 'path'

const __dirname = fileURLToPath(new URL('.', import.meta.url))

// ── CLI argument parsing ──────────────────────────────────────────────────────
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

// ── File path resolver ────────────────────────────────────────────────────────
// Maps scenario id to its output file path under the output directory.
// Mirrors the structure of src/ranges/cash_6max/{stake}/{stack}/...
function scenarioToFilePath(id, stake, stack, outDir) {
  // Determine subdirectory based on scenario id prefix
  let subdir
  if (/^rfi_/.test(id)) subdir = 'rfi'
  else if (/^(bb|sb|btn|co|hj)_vs_(utg|hj|co|btn|sb|bb)$/.test(id)) subdir = 'vs_rfi'
  else if (/_vs_3b_/.test(id)) subdir = 'vs3b'
  else if (/_vs_4b_allin_/.test(id)) subdir = 'vs4b_allin'
  else if (/_vs_4b_/.test(id)) subdir = 'vs4b'
  else if (/_vs_5b_/.test(id)) subdir = 'vs5b'
  else if (/^(co|btn|sb|bb)_vs_(utg|hj|co|btn)_(hj|co|btn|sb)$/.test(id)) subdir = 'sqz'
  else if (/_vs_sqz_/.test(id) && !/_rfi_fold$/.test(id)) subdir = 'vs_sqz'
  else if (/_rfi_fold$/.test(id)) subdir = 'vs_sqz'
  else if (/_sqz_.*_rfi_4b_/.test(id)) subdir = 'vs_4b_sqz'
  else if (/_sqz_.*_(folds|calls)_.*_cc_4b$/.test(id)) subdir = 'vs_4b_sqz'
  else if (/^(co|btn|sb|bb)_sqz_(utg|hj|co|btn)_(hj|co|btn|sb)$/.test(id)) subdir = 'vs_4b_sqz'
  else if (/vs_limp/.test(id)) subdir = 'vs_limp'
  else subdir = 'other'

  const stackStr = `${stack}bb`
  return join(outDir, stake, stackStr, subdir, `${id}.js`)
}

// ── Human-readable name ───────────────────────────────────────────────────────
function scenarioName(id) {
  return id
    .replace(/_/g, ' ')
    .replace(/\b(utg|hj|co|btn|sb|bb)\b/gi, s => s.toUpperCase())
    .replace(/\b(rfi|sqz)\b/gi, s => s.toUpperCase())
    .replace(/\b(vs|allin)\b/gi, s => s)
}

// ── Raw JSON file writer ──────────────────────────────────────────────────────
async function writeRawFile(filePath, data) {
  await mkdir(dirname(filePath), { recursive: true })
  await writeFile(filePath, JSON.stringify(data, null, 2), 'utf8')
}

// ── Raw file path resolver ────────────────────────────────────────────────────
function scenarioToRawFilePath(id, stake, stack, pfrSize, outDir) {
  const stackStr = `${stack}bb`
  return join(outDir, 'raw', stake, pfrSize, stackStr, `${id}.json`)
}

// ── Main ──────────────────────────────────────────────────────────────────────
async function main() {
  const args = parseArgs(process.argv.slice(2))

  const token   = args.token
  const stake   = args.stake    ?? 'nl100'
  const pfrSize = args['pfr-size'] ?? '2.5bb'
  const stack   = parseInt(args.stack ?? '100', 10)
  const outDir  = resolve(__dirname, args['out-dir'] ?? 'out')
  const singleId = args.scenario ?? null
  const dryRun  = !!args['dry-run']
  const rawMode = !!args.raw

  if (!token || token === true) {
    console.error('Error: --token <JWT> is required')
    process.exit(1)
  }

  setToken(token)

  const spotId = getSpotId(stake, pfrSize)
  if (!spotId) {
    console.error(`No spot id for ${stake}/${pfrSize} — check spot_ids.js`)
    process.exit(1)
  }

  const rootQ = String(stack)

  // ── Inspect mode ─────────────────────────────────────────────────────────
  if (args.inspect) {
    const inspectQ = args['inspect-q'] ?? rootQ
    console.log(`Inspecting node: id=${spotId}, q="${inspectQ}"`)
    const data = await getStrategy(spotId, inspectQ)

    console.log('\n── actions:')
    for (const a of (data.actions ?? [])) {
      const played5 = a.played?.slice(0, 5)
      console.log(`  ${JSON.stringify(a.action).padEnd(24)} nextQuery=${JSON.stringify(a.nextQuery ?? null).padEnd(30)} played[:5]=${JSON.stringify(played5)}`)
    }

    // Sanity check: do played values sum to ~1 per combo for first few combos?
    const actions = data.actions ?? []
    if (actions.every(a => a.played)) {
      console.log('\n── played column sums (combos 0–4):')
      for (let k = 0; k < 5; k++) {
        const total = actions.reduce((s, a) => s + (a.played[k] ?? 0), 0)
        const parts = actions.map(a => `${a.action?.slice(0,6)}=${((a.played[k] ?? 0) * 100).toFixed(1)}%`).join('  ')
        console.log(`  combo[${k}]: sum=${total.toFixed(4)}  [${parts}]`)
      }
    }

    console.log('\n── villain_abs (first 5):', data.villain_abs?.slice(0, 5))
    console.log('── abs       (first 5):', data.abs?.slice(0, 5))
    console.log('── combos    (first 5):', data.combos?.slice(0, 5))
    console.log('── combosOrder:', data.combosOrder)
    console.log('\n── player:', data.player, '  villain_player:', data.villain_player)
    console.log('── spotName:', data.spotName, '  spotId:', data.spotId)
    console.log('── stack:', data.stack, '  stacks:', data.stacks)
    console.log('── pot:', data.pot)
    console.log('── currentQuery:', data.currentQuery)
    console.log('\n── top-level keys:', Object.keys(data).join(', '))
    return
  }

  // ── Determine which scenarios to scrape ───────────────────────────────────
  const scenarioIds = singleId
    ? [singleId]
    : Object.keys(SCENARIO_PATHS)

  console.log(`Scraping ${scenarioIds.length} scenarios — ${stake}/${pfrSize}/${stack}bb`)
  console.log(`Spot id: ${spotId}, root q: "${rootQ}"`)
  if (dryRun) console.log('(dry-run: files will not be written)')
  if (rawMode) console.log('(raw mode: saving raw JSON responses)')

  let ok = 0, skipped = 0, errors = 0

  for (const id of scenarioIds) {
    const spec = SCENARIO_PATHS[id]
    if (!spec) {
      console.warn(`  ⚠  No path spec for "${id}" — skipped`)
      skipped++
      continue
    }

    process.stdout.write(`  ${id} … `)

    try {
      if (rawMode) {
        // ── Raw mode: save raw API responses ──────────────────────────────────
        const rawData = {
          meta: { scenarioId: id, stake, pfrSize, stack, spotId, rootQ, timestamp: new Date().toISOString() }
        }

        if (spec.variants) {
          rawData.variants = {}
          for (const [variantKey, variantPath] of Object.entries(spec.variants)) {
            try {
              const { data, q, path } = await scrapeSpotRaw(spotId, rootQ, variantPath)
              rawData.variants[variantKey] = { q, path, response: data }
            } catch (variantErr) {
              process.stdout.write(`(${variantKey}: ${variantErr.message.slice(0, 40)}) `)
            }
          }
        } else {
          const { data, q, path } = await scrapeSpotRaw(spotId, rootQ, spec.path)
          rawData.q = q
          rawData.path = spec.path
          rawData.response = data
        }

        if (!dryRun) {
          const filePath = scenarioToRawFilePath(id, stake, stack, pfrSize, outDir)
          await writeRawFile(filePath, rawData)
        }
      } else {
        // ── Standard mode: transform and write JS files ───────────────────────
        let entry = {}

        if (spec.variants) {
          // sqz vs 4b: scrape all 3 variants and merge into one entry
          for (const [variantKey, variantPath] of Object.entries(spec.variants)) {
            try {
              const { raise: raiseFreqs, call: callFreqs } = await scrapeSpot(spotId, rootQ, variantPath)
              const variantEntry = {}
              const raiseRanges = {}
              for (const [sizeBb, freqs] of Object.entries(raiseFreqs)) {
                const r = formatRange(freqs)
                if (r) raiseRanges[sizeBb] = r
              }
              const callRanges = {}
              for (const [sizeBb, freqs] of Object.entries(callFreqs)) {
                const r = formatRange(freqs)
                if (r) callRanges[sizeBb] = r
              }
              if (Object.keys(raiseRanges).length) variantEntry.raise = raiseRanges
              if (Object.keys(callRanges).length)  variantEntry.call  = callRanges
              if (Object.keys(variantEntry).length) entry[variantKey] = variantEntry
            } catch (variantErr) {
              // Some variants don't exist at short stacks — skip silently
              process.stdout.write(`(${variantKey}: ${variantErr.message.slice(0, 40)}) `)
            }
          }
        } else {
          // Standard scenario: single path
          const { raise: raiseFreqs, call: callFreqs } = await scrapeSpot(spotId, rootQ, spec.path)
          const raiseRanges = {}
          for (const [sizeBb, freqs] of Object.entries(raiseFreqs)) {
            const r = formatRange(freqs)
            if (r) raiseRanges[sizeBb] = r
          }
          const callRanges = {}
          for (const [sizeBb, freqs] of Object.entries(callFreqs)) {
            const r = formatRange(freqs)
            if (r) callRanges[sizeBb] = r
          }
          if (Object.keys(raiseRanges).length) entry.raise = raiseRanges
          if (Object.keys(callRanges).length)  entry.call  = callRanges
        }

        if (!dryRun) {
          const filePath = scenarioToFilePath(id, stake, stack, outDir)
          await writeRangeFile(filePath, scenarioName(id), { [pfrSize]: entry })
        }
      }

      console.log('✓')
      ok++
    } catch (err) {
      console.log(`✗  ${err.message}`)
      errors++
    }
  }

  console.log(`\nDone: ${ok} ok, ${skipped} skipped, ${errors} errors`)
  clearCache()
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})
