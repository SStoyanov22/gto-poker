#!/usr/bin/env node
// ── GTO Wizard MTT 8-max Scraper ────────────────────────────────────────────
//
// Scrapes preflop ranges for MTT 8-max NLHE across 19 stack sizes.
// Spots: RFI, vs-RFI, vs-3B (63 per stack × 19 = 1197 total).
//
// Usage:
//   node scraper/gtowizard-mtt/index.js --list                  # show all spots for one stack
//   node scraper/gtowizard-mtt/index.js --dry-run               # print full manifest, no API calls
//   node scraper/gtowizard-mtt/index.js --discover --token X    # probe history endpoint for open sizes
//   node scraper/gtowizard-mtt/index.js --token X --stack 100   # scrape one stack
//   node scraper/gtowizard-mtt/index.js --token X               # scrape all stacks
//   node scraper/gtowizard-mtt/index.js --token X --stack 100 --inspect rfi_btn  # raw API dump
//
// Options:
//   --token <jwt>            Bearer token (or set GTOWIZARD_TOKEN in scraper/gtowizard-mtt/.env)
//   --stack <n>              Single stack depth in bb (default: scrape all 19)
//   --stacks <a,b,c>         Custom stack list (e.g. "100,40")
//   --dry-run                Print manifest, no API calls
//   --discover               Run history-endpoint probe to discover open sizes per stack
//   --inspect <spotId>       Print raw API response for one spot and exit
//   --skip-existing          Skip spots whose JSON output already exists
//   --max-requests <n>       Stop after N requests (safety net for quota)
//   --filter <pat>           Only spots whose id contains <pat>  (e.g. "rfi", "_vs_3b_")
// ─────────────────────────────────────────────────────────────────────────────

import { setToken, getSpotSolution, getHistory, processSpotSolution } from '../lib/gtowizard.js'
import {
  generateMttSpots,
  setStackDepth,
  setOpenSize,
  setThreeBetSize,
  setFourBetSize,
  getSizeTables,
  hasOpenSize,
  STACK_SIZES,
  GAMETYPE_8M,
  stacksParam,
} from './lib/actions.js'
import { writeFile, readFile, mkdir } from 'fs/promises'
import { existsSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

// ── Rate limiting (1500/hr → ~2.5s between requests) ──────────────────────────
const HOURLY_LIMIT = 1400
const RATE_LIMIT_MS = Math.ceil(3600000 / HOURLY_LIMIT)
let lastRequestTime = 0
let windowStart = Date.now()
let windowCount = 0
let totalRequests = 0
let maxRequests = Infinity

async function rateLimit() {
  const now = Date.now()
  if (now - windowStart > 3600000) { windowStart = now; windowCount = 0 }
  if (windowCount >= HOURLY_LIMIT - 10) {
    const wait = 3600000 - (now - windowStart) + 5000
    console.log(`\n⚠️  Hourly cap reached. Sleeping ${Math.ceil(wait/60000)} min...`)
    await new Promise(r => setTimeout(r, wait))
    windowStart = Date.now(); windowCount = 0
  }
  const elapsed = now - lastRequestTime
  if (elapsed < RATE_LIMIT_MS) {
    await new Promise(r => setTimeout(r, RATE_LIMIT_MS - elapsed))
  }
  lastRequestTime = Date.now()
  windowCount++
  totalRequests++
  if (windowCount % 100 === 0) {
    const minsLeft = Math.floor((3600000 - (Date.now() - windowStart)) / 60000)
    console.log(`  📊 ${windowCount}/${HOURLY_LIMIT} this hour (${minsLeft}m left in window). total=${totalRequests}`)
  }
}

// ── CLI parsing ──────────────────────────────────────────────────────────────
function parseArgs(argv) {
  const a = {}
  for (let i = 0; i < argv.length; i++) {
    if (argv[i].startsWith('--')) {
      const k = argv[i].slice(2)
      const next = argv[i + 1]
      if (next && !next.startsWith('--')) { a[k] = next; i++ }
      else a[k] = true
    }
  }
  return a
}

// ── Env / token ──────────────────────────────────────────────────────────────
async function loadEnv() {
  const envPath = join(__dirname, '.env')
  if (!existsSync(envPath)) return
  const content = await readFile(envPath, 'utf-8')
  for (const line of content.split('\n')) {
    const [k, ...v] = line.split('=')
    if (k && v.length) process.env[k.trim()] = v.join('=').trim()
  }
}

// Hot-reload: re-read .env each tick so the user can swap tokens mid-scrape.
let _currentToken = null
async function refreshTokenFromEnv() {
  await loadEnv()
  const t = process.env.GTOWIZARD_TOKEN
  if (t && t !== _currentToken) {
    _currentToken = t
    setToken(t)
    return true
  }
  return false
}

function decodeJwt(t) {
  try {
    const p = t.split('.')[1]
    const padded = p + '='.repeat((4 - p.length % 4) % 4)
    return JSON.parse(Buffer.from(padded, 'base64url').toString('utf-8'))
  } catch { return null }
}

function tokenMinsLeft() {
  if (!_currentToken) return 0
  const d = decodeJwt(_currentToken)
  if (!d?.exp) return 0
  return (d.exp - Date.now() / 1000) / 60
}

// Wait for the .env to have a non-expired token. Polls every 3s.
async function waitForFreshToken(reason) {
  console.log(`\n⏳ ${reason}. Waiting for fresh token in scraper/gtowizard-mtt/.env ...`)
  console.log('   (paste a fresh GTOWIZARD_TOKEN value, save the file, scraper resumes automatically)')
  let lastShown = -Infinity
  while (true) {
    await refreshTokenFromEnv()
    const m = tokenMinsLeft()
    if (m > 0.5) {
      console.log(`✓ Got token with ${m.toFixed(1)} min remaining. Resuming.\n`)
      return
    }
    const now = Date.now()
    if (now - lastShown > 15000) {
      console.log(`   ... still waiting (token has ${m.toFixed(1)} min left)`)
      lastShown = now
    }
    await new Promise(r => setTimeout(r, 3000))
  }
}

// ── Output helpers ───────────────────────────────────────────────────────────
async function writeJson(filepath, data) {
  await mkdir(dirname(filepath), { recursive: true })
  await writeFile(filepath, JSON.stringify(data, null, 2))
}

function spotSubdir(spot) {
  if (spot.kind === 'rfi') return 'rfi'
  if (spot.kind === 'vs_rfi') return `vs_rfi/${spot.opener.toLowerCase()}`
  if (spot.kind === 'vs_3b') return `vs_3b/${spot.opener.toLowerCase()}`
  if (spot.kind === 'vs_4b') return `vs_4b/${spot.threeBettor.toLowerCase()}`
  return 'other'
}

// ── Discovery: pull canonical open size per stack from /v1/poker/history/ ────
async function discoverOpenSizes(stacks) {
  console.log(`\n=== Discovering open sizes for ${stacks.length} stacks ===\n`)
  const out = {}
  for (const stack of stacks) {
    setStackDepth(stack)
    // Hit the root node — empty preflop_actions. The history response includes
    // future_actions with the canonical raise sizes available at the next node.
    await rateLimit()
    try {
      const h = await callWithTokenRetry(() => getHistory({
        gametype: GAMETYPE_8M,
        depth: `${stack}.125`,
        stacks: stacksParam(stack),
        preflopActions: '',
      }))
      // future_actions is an array of { code, type, betsize, ... } at the next node
      const raises = (h.future_actions ?? []).filter(a => a.type === 'RAISE' && !a.allin)
      const sizes = raises.map(r => r.betsize).sort((a, b) => a - b)
      out[stack] = { allRaises: sizes, primary: sizes[0] ?? null }
      console.log(`  ${stack}bb: raises = ${sizes.join(', ') || '(none)'}  → primary R${sizes[0] ?? '?'}`)
      if (sizes[0]) setOpenSize(stack, sizes[0])
    } catch (err) {
      console.error(`  ${stack}bb: ERROR ${err.message}`)
      out[stack] = { error: err.message }
    }
  }
  return out
}

// ── Manifest generator (no API) ──────────────────────────────────────────────
function buildManifestForStack(stack) {
  setStackDepth(stack)
  return generateMttSpots()
}

function printManifestSummary(stacks) {
  console.log(`\n=== MTT 8-max scrape manifest ===`)
  console.log(`Stacks: ${stacks.join(', ')} (${stacks.length} total)\n`)

  let grand = 0
  for (const stack of stacks) {
    const spots = buildManifestForStack(stack)
    const ids = Object.keys(spots)
    const byKind = ids.reduce((m, id) => {
      m[spots[id].kind] = (m[spots[id].kind] || 0) + 1
      return m
    }, {})
    grand += ids.length
    console.log(`  ${String(stack).padStart(3)}bb: ${ids.length} spots  (rfi=${byKind.rfi}, vs_rfi=${byKind.vs_rfi}, vs_3b=${byKind.vs_3b})`)
  }
  console.log(`\n  total: ${grand} spot-solution requests`)
  const minutes = Math.ceil(grand * RATE_LIMIT_MS / 60000)
  console.log(`  estimated runtime: ~${minutes} min  (at ${RATE_LIMIT_MS}ms/req, ${HOURLY_LIMIT}/hr cap)`)
}

function printManifestVerbose(stacks, limitPerStack = 5) {
  for (const stack of stacks) {
    const spots = buildManifestForStack(stack)
    console.log(`\n--- ${stack}bb (${Object.keys(spots).length} spots) ---`)
    let n = 0
    for (const [id, spot] of Object.entries(spots)) {
      if (n++ >= limitPerStack) {
        console.log(`  ... ${Object.keys(spots).length - limitPerStack} more`)
        break
      }
      console.log(`  ${id.padEnd(28)} ${spot.kind.padEnd(8)}  preflop_actions=${spot.actions || '(empty)'}`)
    }
  }
}

// ── Live scrape ──────────────────────────────────────────────────────────────
async function callWithTokenRetry(fn) {
  // Refresh from .env if token is stale or close to expiry
  await refreshTokenFromEnv()
  if (tokenMinsLeft() < 1) {
    await waitForFreshToken('Token expired or near-expired')
  }

  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      return await fn()
    } catch (err) {
      const msg = String(err.message || '')
      if (msg.includes('API 401') && attempt === 0) {
        await waitForFreshToken('Got 401 from API')
        continue
      }
      throw err
    }
  }
}

async function scrapeSpot(stack, spotId, spot, outDir, opts) {
  const subdir = spotSubdir(spot)
  const outPath = join(outDir, `${stack}bb`, subdir, `${spotId}.json`)

  if (opts.skipExisting && existsSync(outPath)) {
    return { skipped: true }
  }

  await rateLimit()
  try {
    const raw = await callWithTokenRetry(() => getSpotSolution({
      gametype: GAMETYPE_8M,
      depth: `${stack}.125`,
      stacks: stacksParam(stack),
      preflopActions: spot.actions,
    }))
    const processed = processSpotSolution(raw)

    // Capture canonical open size from RFI responses
    if (spot.kind === 'rfi') {
      for (const sol of (raw.action_solutions ?? [])) {
        const a = sol.action
        if (a?.type === 'RAISE' && !a.allin) {
          setOpenSize(stack, spot.position, a.betsize)
          break
        }
      }
    }
    // Pull 3-bet sizes out of vs-RFI responses to feed into vs-3B requests.
    // Prefer non-allin raise; fall back to all-in (e.g., 10bb stacks have only RAI).
    if (spot.kind === 'vs_rfi') {
      const sols = raw.action_solutions ?? []
      const nonAllin = sols.find(s => s.action?.type === 'RAISE' && !s.action.allin)
      const allin = sols.find(s => s.action?.type === 'RAISE' && s.action.allin)
      if (nonAllin) {
        setThreeBetSize(stack, spot.opener, spot.position, nonAllin.action.betsize)
      } else if (allin) {
        setThreeBetSize(stack, spot.opener, spot.position, 'RAI')
      }
    }
    // Pull 4-bet sizes out of vs-3B responses to feed into vs-4B requests.
    if (spot.kind === 'vs_3b') {
      const sols = raw.action_solutions ?? []
      const nonAllin = sols.find(s => s.action?.type === 'RAISE' && !s.action.allin)
      const allin = sols.find(s => s.action?.type === 'RAISE' && s.action.allin)
      if (nonAllin) {
        setFourBetSize(stack, spot.opener, spot.threeBettor, nonAllin.action.betsize)
      } else if (allin) {
        setFourBetSize(stack, spot.opener, spot.threeBettor, 'RAI')
      }
    }

    await writeJson(outPath, {
      meta: {
        gametype: GAMETYPE_8M,
        stack,
        spotId,
        kind: spot.kind,
        position: spot.position,
        opener: spot.opener,
        threeBettor: spot.threeBettor,
        preflopActions: spot.actions,
        description: spot.description,
      },
      processed,
      raw,
    })
    return { success: true }
  } catch (err) {
    return { success: false, error: err.message }
  }
}

async function bootstrapSizesFromExisting(stack, outDir) {
  // Read any existing rfi_*.json + vs-RFI files for this stack, populate size tables
  const rfiDir = join(outDir, `${stack}bb`, 'rfi')
  const positions = ['UTG', 'UTG1', 'LJ', 'HJ', 'CO', 'BTN', 'SB']
  for (const pos of positions) {
    const path = join(rfiDir, `rfi_${pos.toLowerCase()}.json`)
    if (!existsSync(path)) continue
    try {
      const data = JSON.parse(await readFile(path, 'utf-8'))
      for (const sol of (data.raw?.action_solutions ?? [])) {
        const a = sol.action
        if (a?.type === 'RAISE' && !a.allin) {
          setOpenSize(stack, pos, a.betsize)
          break
        }
      }
    } catch {}
  }
  const { readdir } = await import('fs/promises')
  // Scan vs-RFI files for 3-bet sizes (prefer non-allin, fall back to RAI)
  const vsRfiDir = join(outDir, `${stack}bb`, 'vs_rfi')
  if (existsSync(vsRfiDir)) {
    for (const opener of positions) {
      const subDir = join(vsRfiDir, opener.toLowerCase())
      if (!existsSync(subDir)) continue
      try {
        for (const f of await readdir(subDir)) {
          if (!f.endsWith('.json')) continue
          const data = JSON.parse(await readFile(join(subDir, f), 'utf-8'))
          const threeBettor = data.meta?.position
          if (!threeBettor) continue
          const sols = data.raw?.action_solutions ?? []
          const nonAllin = sols.find(s => s.action?.type === 'RAISE' && !s.action.allin)
          const allin = sols.find(s => s.action?.type === 'RAISE' && s.action.allin)
          if (nonAllin) {
            setThreeBetSize(stack, opener, threeBettor, nonAllin.action.betsize)
          } else if (allin) {
            setThreeBetSize(stack, opener, threeBettor, 'RAI')
          }
        }
      } catch {}
    }
  }
  // Scan vs-3B files for 4-bet sizes
  const vs3bDir = join(outDir, `${stack}bb`, 'vs_3b')
  if (existsSync(vs3bDir)) {
    for (const opener of positions) {
      const subDir = join(vs3bDir, opener.toLowerCase())
      if (!existsSync(subDir)) continue
      try {
        for (const f of await readdir(subDir)) {
          if (!f.endsWith('.json')) continue
          const data = JSON.parse(await readFile(join(subDir, f), 'utf-8'))
          const threeBettor = data.meta?.threeBettor
          if (!threeBettor) continue
          const sols = data.raw?.action_solutions ?? []
          const nonAllin = sols.find(s => s.action?.type === 'RAISE' && !s.action.allin)
          const allin = sols.find(s => s.action?.type === 'RAISE' && s.action.allin)
          if (nonAllin) {
            setFourBetSize(stack, opener, threeBettor, nonAllin.action.betsize)
          } else if (allin) {
            setFourBetSize(stack, opener, threeBettor, 'RAI')
          }
        }
      } catch {}
    }
  }
}

async function scrapeStack(stack, outDir, opts) {
  console.log(`\n━━━ ${stack}bb ━━━`)
  setStackDepth(stack)
  await bootstrapSizesFromExisting(stack, outDir)

  // Spot ids are kind-stable; rebuild action strings per request so the
  // latest discovered sizes (from earlier requests in this run) are used.
  const initial = generateMttSpots()
  let ids = Object.keys(initial)
  if (opts.filter) ids = ids.filter(id => id.includes(opts.filter))
  const order = { rfi: 0, vs_rfi: 1, vs_3b: 2, vs_4b: 3 }
  ids.sort((a, b) => (order[initial[a].kind] - order[initial[b].kind]) || a.localeCompare(b))

  let ok = 0, fail = 0, skip = 0
  let consecutive403 = 0
  for (let i = 0; i < ids.length; i++) {
    if (totalRequests >= maxRequests) {
      console.log(`\n⏹  Hit max-requests=${maxRequests}, stopping.`)
      break
    }
    const id = ids[i]
    const spot = generateMttSpots()[id]
    const ttl = tokenMinsLeft()
    const ttlStr = ttl > 0 ? ` (token: ${ttl.toFixed(1)}m)` : ' (token: stale)'
    process.stdout.write(`  [${stack}bb ${i + 1}/${ids.length}] ${id.padEnd(28)}${ttlStr} `)
    const r = await scrapeSpot(stack, id, spot, outDir, opts)
    if (r.skipped) { skip++; console.log('⏭  exists'); consecutive403 = 0 }
    else if (r.success) { ok++; console.log('✓'); consecutive403 = 0 }
    else {
      fail++; console.log(`✗ ${r.error}`)
      if (r.error?.includes('403')) consecutive403++
      else consecutive403 = 0
      if (consecutive403 >= 3) {
        console.log(`  ⏭  ${stack}bb appears unavailable (3 consecutive 403s), skipping rest of stack`)
        break
      }
    }
  }
  console.log(`  → ${stack}bb: ${ok} ok, ${fail} failed, ${skip} skipped`)
  return { ok, fail, skip }
}

// ── Main ─────────────────────────────────────────────────────────────────────
async function main() {
  const args = parseArgs(process.argv.slice(2))
  const stacks = args.stack
    ? [parseInt(args.stack, 10)]
    : args.stacks
      ? args.stacks.split(',').map(s => parseInt(s, 10))
      : STACK_SIZES

  const outDir = args['out-dir'] || join(__dirname, 'out')

  // ── Pure list mode (no API) ──
  if (args.list) {
    setStackDepth(stacks[0])
    const spots = generateMttSpots()
    console.log(`\n${stacks[0]}bb spots (${Object.keys(spots).length}):\n`)
    for (const [id, s] of Object.entries(spots)) {
      console.log(`  ${id.padEnd(28)} ${s.kind.padEnd(8)} ${s.actions}`)
    }
    return
  }

  // ── Dry-run manifest (no API) ──
  if (args['dry-run']) {
    printManifestSummary(stacks)
    if (args.verbose) printManifestVerbose(stacks, 999)
    else printManifestVerbose(stacks, 5)
    return
  }

  // ── Need a token below this point ──
  await loadEnv()
  if (args.token) process.env.GTOWIZARD_TOKEN = args.token
  await refreshTokenFromEnv()
  if (!_currentToken) {
    console.error('Error: --token required (or set GTOWIZARD_TOKEN in scraper/gtowizard-mtt/.env)')
    process.exit(1)
  }
  console.log(`Token TTL: ${tokenMinsLeft().toFixed(1)} min`)

  if (args['max-requests']) maxRequests = parseInt(args['max-requests'], 10)

  // ── Discovery only ──
  if (args.discover) {
    const result = await discoverOpenSizes(stacks)
    const path = join(outDir, 'open-sizes.json')
    await writeJson(path, result)
    console.log(`\nWrote ${path}`)
    return
  }

  // ── Inspect single spot ──
  if (args.inspect) {
    const stack = stacks[0]
    setStackDepth(stack)
    const spots = generateMttSpots()
    const spot = spots[args.inspect]
    if (!spot) {
      console.error(`Unknown spot: ${args.inspect}`)
      console.error(`Available: ${Object.keys(spots).join(', ')}`)
      process.exit(1)
    }
    await rateLimit()
    const raw = await getSpotSolution({
      gametype: GAMETYPE_8M,
      depth: `${stack}.125`,
      stacks: stacksParam(stack),
      preflopActions: spot.actions,
    })
    console.log(JSON.stringify(raw, null, 2))
    return
  }

  // ── Full scrape ──
  console.log(`\n=== MTT 8-max scrape ===`)
  console.log(`Gametype: ${GAMETYPE_8M}`)
  console.log(`Stacks:   ${stacks.join(', ')}`)
  console.log(`Output:   ${outDir}`)

  const opts = {
    skipExisting: !!args['skip-existing'],
    filter: args.filter,
  }

  const totals = { ok: 0, fail: 0, skip: 0 }
  for (const stack of stacks) {
    const r = await scrapeStack(stack, outDir, opts)
    totals.ok += r.ok; totals.fail += r.fail; totals.skip += r.skip
    if (totalRequests >= maxRequests) break
  }

  // Write the discovered size tables for reproducibility
  await writeJson(join(outDir, 'discovered-sizes.json'), getSizeTables())

  console.log(`\n=== Done ===`)
  console.log(`total requests: ${totalRequests}`)
  console.log(`spots: ${totals.ok} ok, ${totals.fail} failed, ${totals.skip} skipped`)
}

main().catch(err => { console.error('Fatal:', err); process.exit(1) })
