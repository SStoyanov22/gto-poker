#!/usr/bin/env node
// ── GTO Wizard Preflop Scraper ──────────────────────────────────────────────
//
// Scrapes preflop solutions from GTO Wizard API
//
// Usage:
//   node scraper/gtowizard/index.js --token <JWT> [options]
//
// Options:
//   --token <jwt>         Bearer token (required)
//   --stake <stake>       nl50 | nl100 | nl200 | nl500  (default: nl100)
//   --pfr-size <size>     2bb | 2.5bb | 3bb             (default: 2.5bb)
//   --stack <depth>       Stack depth in bb             (default: 100)
//   --scenario <id>       Scrape a single scenario id
//   --filter <pattern>    Only scrape scenarios matching pattern (e.g., "sqz" for squeeze spots)
//   --squeeze-only        Only scrape squeeze/cold-call scenarios (60 total)
//   --list                List all available scenarios
//   --inspect             Print API response for a spot and exit
//   --dry-run             Fetch without writing files
//   --skip-existing       Skip scenarios that already have output files
//   --out-dir <dir>       Output directory              (default: scraper/gtowizard/out)
//
// Examples:
//   # List all scenarios
//   node scraper/gtowizard/index.js --list
//
//   # Scrape a single scenario
//   node scraper/gtowizard/index.js --token eyJ... --scenario rfi_btn
//
//   # Scrape all preflop scenarios
//   node scraper/gtowizard/index.js --token eyJ...
//
// ─────────────────────────────────────────────────────────────────────────────

import { setToken, getSpotSolution, getHistory, processSpotSolution, getGametype, GAMETYPES } from '../lib/gtowizard.js'
import { generatePreflopSpots, DEFAULT_SIZES, setStackDepth } from './lib/actions.js'
import { writeFile, mkdir, readFile } from 'fs/promises'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import { existsSync } from 'fs'

// ── Rate limiting ────────────────────────────────────────────────────────────
const RATE_LIMIT_MS = 500  // 500ms between requests (2 req/sec)
let lastRequestTime = 0

async function rateLimit() {
  const now = Date.now()
  const elapsed = now - lastRequestTime
  if (elapsed < RATE_LIMIT_MS) {
    const delay = RATE_LIMIT_MS - elapsed
    await new Promise(resolve => setTimeout(resolve, delay))
  }
  lastRequestTime = Date.now()
}

const __dirname = dirname(fileURLToPath(import.meta.url))

// ── Load .env file ──────────────────────────────────────────────────────────
async function loadEnv() {
  const envPath = join(__dirname, '.env')
  if (existsSync(envPath)) {
    const content = await readFile(envPath, 'utf-8')
    for (const line of content.split('\n')) {
      const [key, ...valueParts] = line.split('=')
      if (key && valueParts.length) {
        process.env[key.trim()] = valueParts.join('=').trim()
      }
    }
  }
}

// ── CLI argument parsing ────────────────────────────────────────────────────
function parseArgs(argv) {
  const args = {}
  for (let i = 0; i < argv.length; i++) {
    if (argv[i].startsWith('--')) {
      const key = argv[i].slice(2)
      const nextVal = argv[i + 1]
      if (nextVal && !nextVal.startsWith('--')) {
        args[key] = nextVal
        i++
      } else {
        args[key] = true
      }
    }
  }
  return args
}

// ── Gametype mapping ────────────────────────────────────────────────────────
// Format: Cash6mGeneral_6mNL{stake}R{size*10}
// e.g., 2.5bb → R25, 2bb → R20, 2.25bb → R225, 3bb → R30
const GAMETYPE_MAP = {
  nl25:  { '2bb': 'Cash6mGeneral_6mNL25R20', '2.25bb': 'Cash6mGeneral_6mNL25R225', '2.5bb': 'Cash6mGeneral_6mNL25R25', '3bb': 'Cash6mGeneral_6mNL25R30' },
  nl50:  { '2bb': 'Cash6mGeneral_6mNL50R20', '2.25bb': 'Cash6mGeneral_6mNL50R225', '2.5bb': 'Cash6mGeneral_6mNL50R25', '3bb': 'Cash6mGeneral_6mNL50R30' },
  nl100: { '2bb': 'Cash6mGeneral_6mNL100R20', '2.25bb': 'Cash6mGeneral_6mNL100R225', '2.5bb': 'Cash6mGeneral_6mNL100R25', '3bb': 'Cash6mGeneral_6mNL100R30' },
  nl200: { '2bb': 'Cash6mGeneral_6mNL200R20', '2.25bb': 'Cash6mGeneral_6mNL200R225', '2.5bb': 'Cash6mGeneral_6mNL200R25', '3bb': 'Cash6mGeneral_6mNL200R30' },
  nl500: { '2bb': 'Cash6mGeneral_6mNL500R20', '2.25bb': 'Cash6mGeneral_6mNL500R225', '2.5bb': 'Cash6mGeneral_6mNL500R25', '3bb': 'Cash6mGeneral_6mNL500R30' },
  nl1k:  { '2bb': 'Cash6mGeneral_6mNL1000R20', '2.25bb': 'Cash6mGeneral_6mNL1000R225', '2.5bb': 'Cash6mGeneral_6mNL1000R25', '3bb': 'Cash6mGeneral_6mNL1000R30' },
}

function getGametypeString(stake, pfrSize) {
  return GAMETYPE_MAP[stake]?.[pfrSize] ?? null
}

// ── Output helpers ──────────────────────────────────────────────────────────
async function ensureDir(dir) {
  await mkdir(dir, { recursive: true })
}

async function writeJsonFile(filepath, data) {
  await ensureDir(dirname(filepath))
  await writeFile(filepath, JSON.stringify(data, null, 2))
  console.log(`  ✓ Wrote ${filepath}`)
}

// ── Main scraper ────────────────────────────────────────────────────────────
async function scrapeScenario(gametype, depth, spot, outDir, dryRun) {
  console.log(`\n▸ ${spot.description}`)
  console.log(`  Actions: ${spot.actions}`)

  try {
    await rateLimit()  // Respect rate limits
    const raw = await getSpotSolution({
      gametype,
      depth,
      preflopActions: spot.actions,
    })

    if (dryRun) {
      console.log(`  [dry-run] Would write output`)
      return { success: true }
    }

    // Process and save
    const processed = processSpotSolution(raw)

    // Also save raw for debugging/postflop continuation
    const outputPath = join(outDir, `${spot.id}.json`)
    await writeJsonFile(outputPath, {
      meta: {
        gametype,
        depth,
        preflopActions: spot.actions,
        position: spot.position,
        description: spot.description,
      },
      processed,
      raw,
    })

    return { success: true, data: processed }

  } catch (err) {
    console.error(`  ✗ Error: ${err.message}`)
    return { success: false, error: err.message }
  }
}

async function main() {
  const args = parseArgs(process.argv.slice(2))

  // ── Generate spots ──
  const pfrSize = args['pfr-size'] || '2.5bb'
  const openSize = pfrSize.replace('bb', '')
  const sizes = { ...DEFAULT_SIZES, open: openSize }

  // Set stack depth before generating spots (for position-aware bet sizes)
  const depth = parseInt(args.stack || '100', 10)
  setStackDepth(depth)

  const spots = generatePreflopSpots(sizes)

  // ── List mode ──
  if (args.list) {
    console.log('\nAvailable scenarios:\n')
    const spotIds = Object.keys(spots).sort()
    for (const id of spotIds) {
      console.log(`  ${id.padEnd(30)} ${spots[id].description}`)
    }
    console.log(`\nTotal: ${spotIds.length} scenarios`)
    return
  }

  // ── Load .env and validate token ──
  await loadEnv()
  const token = args.token || process.env.GTOWIZARD_TOKEN
  if (!token) {
    console.error('Error: --token is required (or set GTOWIZARD_TOKEN in .env)')
    console.error('Get your token from GTO Wizard DevTools (Network tab, copy Authorization header)')
    process.exit(1)
  }

  setToken(token)

  // ── Config ──
  const stake = args.stake || 'nl100'
  const outDir = args['out-dir'] || join(__dirname, 'out', stake, `${depth}bb`)
  const dryRun = !!args['dry-run']

  const gametype = getGametypeString(stake, pfrSize)
  if (!gametype) {
    console.error(`Error: Unknown stake/pfr-size combo: ${stake}/${pfrSize}`)
    console.error('Known combinations:', Object.keys(GAMETYPE_MAP).map(s =>
      `${s}: ${Object.keys(GAMETYPE_MAP[s]).join(', ')}`
    ).join('\n  '))
    process.exit(1)
  }

  console.log(`\n╔══════════════════════════════════════════════════════════════╗`)
  console.log(`║  GTO Wizard Preflop Scraper                                  ║`)
  console.log(`╠══════════════════════════════════════════════════════════════╣`)
  console.log(`║  Stake:     ${stake.padEnd(48)}║`)
  console.log(`║  PFR Size:  ${pfrSize.padEnd(48)}║`)
  console.log(`║  Stack:     ${(depth + 'bb').padEnd(48)}║`)
  console.log(`║  Gametype:  ${gametype.padEnd(48)}║`)
  console.log(`║  Output:    ${outDir.slice(-48).padEnd(48)}║`)
  console.log(`╚══════════════════════════════════════════════════════════════╝`)

  // ── Inspect mode ──
  if (args.inspect) {
    const scenarioId = args.scenario || 'rfi_btn'
    const spot = spots[scenarioId]
    if (!spot) {
      console.error(`Unknown scenario: ${scenarioId}`)
      process.exit(1)
    }
    spot.id = scenarioId

    console.log(`\nInspecting: ${scenarioId}`)
    console.log(`Actions: ${spot.actions}`)

    await rateLimit()
    const raw = await getSpotSolution({
      gametype,
      depth,
      preflopActions: spot.actions,
    })
    console.log('\n── Raw API Response ──')
    console.log(JSON.stringify(raw, null, 2))
    return
  }

  // ── Single scenario mode ──
  if (args.scenario) {
    const spot = spots[args.scenario]
    if (!spot) {
      console.error(`Unknown scenario: ${args.scenario}`)
      console.error('Use --list to see available scenarios')
      process.exit(1)
    }
    spot.id = args.scenario
    await scrapeScenario(gametype, depth, spot, outDir, dryRun)
    return
  }

  // ── Full scrape mode (with optional filter) ──
  let spotIds = Object.keys(spots).sort()

  if (args['squeeze-only']) {
    // Squeeze decision spots: 3 positions like bb_vs_utg_hj (not containing 3b/4b/5b/sqz)
    const squeezeDecision = spotIds.filter(id =>
      /^[a-z]+_vs_[a-z]+_[a-z]+$/.test(id) &&
      !id.includes('sqz') && !id.includes('3b') && !id.includes('4b') && !id.includes('5b')
    )
    // vs Squeeze spots: contains _vs_sqz_
    const vsSqueeze = spotIds.filter(id => id.includes('_vs_sqz_'))
    spotIds = [...squeezeDecision, ...vsSqueeze].sort()
    console.log(`\n--squeeze-only: ${spotIds.length} scenarios (${squeezeDecision.length} squeeze + ${vsSqueeze.length} vs squeeze)`)
  } else if (args.filter) {
    const pattern = args.filter.toLowerCase()
    spotIds = spotIds.filter(id => id.includes(pattern))
    console.log(`\nFilter: "${args.filter}" → ${spotIds.length} scenarios`)
  }

  console.log(`\nScraping ${spotIds.length} scenarios...`)

  let success = 0
  let failed = 0

  const skipExisting = !!args['skip-existing']
  let skipped = 0

  for (let i = 0; i < spotIds.length; i++) {
    const id = spotIds[i]
    const spot = { ...spots[id], id }

    // Skip if file already exists
    if (skipExisting) {
      const outputPath = join(outDir, `${id}.json`)
      if (existsSync(outputPath)) {
        console.log(`[${i + 1}/${spotIds.length}] ⏭ ${id} (already exists)`)
        skipped++
        continue
      }
    }

    console.log(`[${i + 1}/${spotIds.length}]`)
    const result = await scrapeScenario(gametype, depth, spot, outDir, dryRun)
    if (result.success) success++
    else failed++
  }

  console.log(`\n════════════════════════════════════════════════════════════════`)
  console.log(`Done! Success: ${success}, Failed: ${failed}, Skipped: ${skipped}`)
}

main().catch(err => {
  console.error('Fatal error:', err)
  process.exit(1)
})
