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

const modules = import.meta.glob(
  '/scraper/gtowizard/out/**/*.json',
  { eager: true }
)

// registry key: `${stake}|${stack}|${id}`
const registry = {}

for (const [path, mod] of Object.entries(modules)) {
  // path: /scraper/gtowizard/out/{stake}/{stack}bb/{id}.json
  const parts = path.split('/')
  // parts: ['', 'scraper', 'gtowizard', 'out', stake, stackbb, 'id.json']
  const stake = parts[4]
  const stackbb = parts[5]  // e.g. '100bb'
  const file = parts[6]
  if (!file) continue
  const stack = stackbb  // keep as '100bb'
  const id = file.replace('.json', '')
  registry[`${stake}|${stack}|${id}`] = mod.default ?? mod
}

// Debug: uncomment to see loaded files
// console.log('Total files loaded:', Object.keys(registry).length)

/**
 * Look up processed range data for a specific combination.
 *
 * @param {string} stake   - e.g. 'nl100'
 * @param {string} pfrSize - e.g. '2.5bb' (used to extract from JSON)
 * @param {string} stack   - e.g. '100bb'
 * @param {string} id      - scenario id, e.g. 'rfi_btn'
 * @returns {object|null}  - processed JSON data, or null if not yet scraped
 */
export function getRange(stake, pfrSize, stack, id) {
  const key = `${stake}|${stack}|${id}`
  const data = registry[key]
  if (!data) {
    console.log(`📊 Range: ${key} → NOT FOUND`)
    return null
  }
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

  return {
    raise,       // Display frequencies (conditional) for grid
    call,        // Display frequencies (conditional) for grid
    fold,        // Display frequencies (conditional) for grid
    combos,      // Combo frequencies (absolute) for statistics
    ev: processed.ev ?? {},
    inRange      // Hands in the opening range
  }
}
