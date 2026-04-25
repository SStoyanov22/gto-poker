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

// Lazy-load JSON files to avoid heap overflow during build
const cashModules = import.meta.glob('/scraper/gtowizard/out/**/*.json')
const mttModules  = import.meta.glob('/scraper/gtowizard-mtt/out/**/*.json')

// Build a map of key -> loader function
// Cash key: <stake>|<stackbb>|<id>           e.g. 'nl100|100bb|rfi_btn'
// MTT key:  mtt|<stackbb>|<id>               e.g. 'mtt|40bb|bb_vs_btn'
const loaders = {}

// Cash: /scraper/gtowizard/out/<stake>/<stackbb>/<file>.json
for (const [path, loader] of Object.entries(cashModules)) {
  const parts = path.split('/')
  const stake = parts[4]
  const stackbb = parts[5]
  const file = parts[6]
  if (!file) continue
  const id = file.replace('.json', '')
  loaders[`${stake}|${stackbb}|${id}`] = loader
}

// MTT: /scraper/gtowizard-mtt/out/<stackbb>/{rfi|vs_rfi/<opener>|vs_3b/<opener>}/<file>.json
for (const [path, loader] of Object.entries(mttModules)) {
  const parts = path.split('/')
  // ['', 'scraper', 'gtowizard-mtt', 'out', '<stackbb>', '<kind>', ...]
  const stackbb = parts[4]
  if (!stackbb || !stackbb.endsWith('bb')) continue  // skip discovered-sizes.json etc
  const file = parts[parts.length - 1]
  if (!file?.endsWith('.json')) continue
  const id = file.replace('.json', '')
  loaders[`mtt|${stackbb}|${id}`] = loader
}

// Cache loaded data
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

  // Return cached data if available
  if (cache[key]) {
    return cache[key]
  }

  const loader = loaders[key]
  if (!loader) {
    console.log(`📊 Range: ${key} → NOT FOUND`)
    return null
  }

  // Load and cache
  const mod = await loader()
  const data = mod.default ?? mod
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
