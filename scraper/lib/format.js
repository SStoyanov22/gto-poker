// ── Range Formatter ──────────────────────────────────────────────────────────
//
// Converts a villain_abs array (1326 floats 0-1) into the range string format
// used by the app's range files.
//
// Output format:
//   100% hands:   "AhAd, AhAs, ..."
//   Partial freq: "[53.4]KhQd, KhQs[/53.4], AhAd, ..."
//
// Combos are grouped by their rounded frequency.  Within each frequency group
// combos are listed in the same order they appear in the 1326 array.
// ─────────────────────────────────────────────────────────────────────────────

import { COMBOS } from './combos.js'

// Round a 0-1 probability to a percentage string with up to 4 decimal places,
// dropping trailing zeros.
function pct(freq) {
  const raw = freq * 100
  // Use up to 4 decimal places, trim trailing zeros
  return parseFloat(raw.toFixed(4)).toString()
}

/**
 * Build a range string from a villain_abs (or similar) array.
 * @param {number[]} freqs  - 1326-element array of per-combo frequencies (0–1)
 * @param {number}   threshold - combos below this frequency are excluded (default 0.001)
 * @returns {string}
 */
export function formatRange(freqs, threshold = 0.001) {
  // Group combos by rounded frequency key
  const groups = new Map() // pctKey -> [comboStr, ...]

  for (let i = 0; i < 1326; i++) {
    const f = freqs[i]
    if (f < threshold) continue

    const key = pct(f)
    if (!groups.has(key)) groups.set(key, [])
    groups.get(key).push(COMBOS[i][0] + COMBOS[i][1])
  }

  if (groups.size === 0) return ''

  const parts = []
  // Output 100% groups without brackets, others with brackets
  for (const [key, combos] of groups) {
    const str = combos.join(', ')
    if (parseFloat(key) >= 99.99) {
      parts.push(str)
    } else {
      parts.push(`[${key}]${str}[/${key}]`)
    }
  }

  return parts.join(', ')
}

/**
 * Merge two frequency arrays element-wise (capped at 1).
 * Useful when a scenario has multiple raise sizes.
 */
export function mergeFreqs(a, b) {
  const out = new Array(1326)
  for (let i = 0; i < 1326; i++) {
    out[i] = Math.min(1, (a[i] ?? 0) + (b[i] ?? 0))
  }
  return out
}
