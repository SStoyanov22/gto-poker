// ── Range data registry (GTOWizard) ───────────────────────────────────────────
//
// Loads GTOWizard JSON range files via import.meta.glob and exposes
// a single getRange() lookup function.
//
// GTOWizard files live at:
//   scraper/gtowizard/out/{stake}/{stack}bb/{scenarioId}.json
//
// GTOWizard JSON format:
//   {
//     "meta": { "gametype": "...", "depth": 100, ... },
//     "processed": {
//       "raise": { "2.5bb": { "AA": 1.0, "AKs": 0.8, ... }, "100bb": {...} },
//       "call":  { "2.5bb": { ... } },
//       "ev": { ... }
//     },
//     "raw": { ... }
//   }
// ─────────────────────────────────────────────────────────────────────────────

// Each JSON file is registered as a static asset URL (not a module).
// `?url` makes Vite emit the file as-is to dist/assets/ and inject the
// hashed URL string here — no per-file JS chunk, no transform overhead.
// `eager: true` resolves the URLs at build time so we have a synchronous
// path → URL map; the actual fetch is still on-demand at request time.
const cashUrls = import.meta.glob('/scraper/gtowizard/out/**/*.json',
  { eager: true, query: '?url', import: 'default' })
const mttUrls  = import.meta.glob('/scraper/gtowizard-mtt/out/**/*.json',
  { eager: true, query: '?url', import: 'default' })

// Build a map of key -> URL
// Cash key: <stake>|<stackbb>|<id>   e.g. 'nl100|100bb|rfi_btn'
// MTT key:  mtt|<stackbb>|<id>        e.g. 'mtt|40bb|bb_vs_btn'
const urls = {}

for (const [path, url] of Object.entries(cashUrls)) {
  const parts = path.split('/')
  const stake = parts[4]
  const stackbb = parts[5]
  const file = parts[6]
  if (!file) continue
  const id = file.replace('.json', '')
  urls[`${stake}|${stackbb}|${id}`] = url
}

for (const [path, url] of Object.entries(mttUrls)) {
  const parts = path.split('/')
  const stackbb = parts[4]
  if (!stackbb || !stackbb.endsWith('bb')) continue
  const file = parts[parts.length - 1]
  if (!file?.endsWith('.json')) continue
  const id = file.replace('.json', '')
  urls[`mtt|${stackbb}|${id}`] = url
}

// Cache loaded JSON
const cache = {}

// Debug: uncomment to see loaded files
// console.log('Total files loaded:', Object.keys(registry).length)

/**
 * Look up processed range data for a specific combination.
 *
 * @param {string} stake   - e.g. 'nl100'
 * @param {string} pfrSize - e.g. '2.5bb' (used to extract from JSON)
 * @param {string} stack   - e.g. '100bb'
 * @param {string} id      - scenario id, e.g. 'rfi_btn'
 * @returns {Promise<object|null>}  - processed JSON data, or null if not yet scraped
 */
export async function getRange(stake, pfrSize, stack, id) {
  const key = `${stake}|${stack}|${id}`

  if (cache[key]) {
    return cache[key]
  }

  const url = urls[key]
  if (!url) {
    console.log(`📊 Range: ${key} → NOT FOUND`)
    return null
  }

  const data = await fetch(url).then(r => r.json())
  console.log(`📊 Range: ${key} → loaded (${data.processed?.inRange?.length || 0} hands in range)`)

  // GTOWizard format: data.processed contains the range data
  const processed = data.processed
  if (!processed) return null

  // Display frequencies (conditional) - for grid cell coloring
  // Shows "what to do when I have this hand" e.g., 76s = 100% call
  const raise = processed.raise ?? {}
  const call = processed.call ?? {}
  const fold = processed.fold ?? {}

  // Combo frequencies (absolute) - for statistics and grid display
  // New files store absolute freqs directly in raise/call/fold.
  // Old files store conditional in raise/call/fold and absolute in combos.
  const combos = processed.combos ?? {
    raise: processed.raise ?? {},
    call:  processed.call  ?? {},
    fold:  processed.fold  ?? {},
  }

  // Use inRange from processed data if available (more accurate - includes hands that fold 100%)
  // Otherwise fall back to collecting from raise/call actions
  let inRange = processed.inRange
  if (!inRange) {
    const inRangeSet = new Set()
    for (const hands of Object.values(raise)) {
      for (const hand of Object.keys(hands)) {
        inRangeSet.add(hand)
      }
    }
    for (const hands of Object.values(call)) {
      for (const hand of Object.keys(hands)) {
        inRangeSet.add(hand)
      }
    }
    inRange = [...inRangeSet]
  }

  const result = {
    raise,       // Display frequencies (conditional) for grid
    call,        // Display frequencies (conditional) for grid
    fold,        // Display frequencies (conditional) for grid
    combos,      // Combo frequencies (absolute) for statistics
    ev: processed.ev ?? {},
    inRange      // Hands in the opening range
  }

  cache[key] = result
  return result
}
