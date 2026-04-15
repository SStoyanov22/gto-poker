// ── Range data registry ───────────────────────────────────────────────────────
//
// Loads all processed JSON range files via import.meta.glob and exposes
// a single getRange() lookup function.
//
// Processed JSON files live at:
//   scraper/out/processed/{stake}/{pfrSize}/{stack}/{scenarioId}.json
//
// Data format (standard scenario):
//   {
//     "raise": { "13bb": { "AA": 1.0, "AKs": 0.8, ... } },
//     "call":  { "2.5bb": { "AA": 0.0, "AKs": 0.2, ... } },
//     "ev": {
//       "main":          { "AA": 12.87, ... },
//       "raise_13bb":    { "AA": 12.87, ... },
//       "call_2.5bb":    { "AA": 6.35, ... }
//     }
//   }
//
// Data format (sqz vs 4b — variant scenario):
//   {
//     "rfi_4b":  { "raise": {...}, "call": {...}, "ev": {...} },
//     "cc_fold": { "call": {...}, "ev": {...} },
//     "cc_call": { "call": {...}, "ev": {...} }
//   }
// ─────────────────────────────────────────────────────────────────────────────

const modules = import.meta.glob(
  '/scraper/out/processed/**/*.json',
  { eager: true }
)

// registry key: `${stake}|${pfrSize}|${stack}|${id}`
const registry = {}

for (const [path, mod] of Object.entries(modules)) {
  // path: /scraper/out/processed/{stake}/{pfrSize}/{stack}/{id}.json
  const parts = path.split('/')
  // parts: ['', 'scraper', 'out', 'processed', stake, pfrSize, stack, 'id.json']
  const [stake, pfrSize, stack, file] = parts.slice(4)
  if (!file) continue
  const id = file.replace('.json', '')
  registry[`${stake}|${pfrSize}|${stack}|${id}`] = mod.default ?? mod
}

/**
 * Look up processed range data for a specific combination.
 *
 * @param {string} stake   - e.g. 'nl100'
 * @param {string} pfrSize - e.g. '2.5bb'
 * @param {string} stack   - e.g. '100bb'
 * @param {string} id      - scenario id, e.g. 'rfi_btn'
 * @returns {object|null}  - processed JSON data, or null if not yet scraped
 */
export function getRange(stake, pfrSize, stack, id) {
  return registry[`${stake}|${pfrSize}|${stack}|${id}`] ?? null
}
