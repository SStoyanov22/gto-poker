export const RANKS = ['A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6', '5', '4', '3', '2']

const RANK_ORDER = { A: 0, K: 1, Q: 2, J: 3, T: 4, 9: 5, 8: 6, 7: 7, 6: 8, 5: 9, 4: 10, 3: 11, 2: 12 }
const COMBO_RE = /^[2-9TJQKA][hdsc][2-9TJQKA][hdsc]$/i

/** Convert a suit-specific combo (e.g. "9h8h") to canonical hand notation ("98s"). */
function comboToHand(combo) {
  const r1 = combo[0].toUpperCase()
  const s1 = combo[1].toLowerCase()
  const r2 = combo[2].toUpperCase()
  const s2 = combo[3].toLowerCase()
  if (!(r1 in RANK_ORDER) || !(r2 in RANK_ORDER)) return null
  if (r1 === r2) return r1 + r2  // pair
  const [high, hSuit, low, lSuit] = RANK_ORDER[r1] < RANK_ORDER[r2]
    ? [r1, s1, r2, s2]
    : [r2, s2, r1, s1]
  return high + low + (hSuit === lSuit ? 's' : 'o')
}

/**
 * Parse GTO solver format:
 *   [pct%]Ah9h, Ad9d, ...[/pct%]   → those combos at pct/100 frequency
 *   AdAh, AsAh, ...                 → bare combos at 100%
 *
 * Aggregates individual combos into canonical hand notation by averaging
 * across all combos of that hand type (pairs: 6, suited: 4, offsuit: 12).
 */
function parseGTOFormat(str) {
  const comboFreqs = {}

  // Extract bracketed blocks: [X]combo, combo, ...[/X]
  const blockRe = /\[(\d+(?:\.\d+)?)\]([\s\S]*?)\[\/\1\]/g
  let match
  while ((match = blockRe.exec(str)) !== null) {
    const freq = Math.min(1, parseFloat(match[1]) / 100)
    for (const combo of match[2].split(',').map(c => c.trim())) {
      if (COMBO_RE.test(combo)) comboFreqs[combo.toUpperCase()] = freq
    }
  }

  // Remaining bare combos outside blocks → 100%
  const stripped = str.replace(/\[\d+(?:\.\d+)?\][\s\S]*?\[\/\d+(?:\.\d+)?\]/g, '')
  for (const combo of stripped.split(',').map(c => c.trim())) {
    if (COMBO_RE.test(combo)) comboFreqs[combo.toUpperCase()] = 1.0
  }

  // Aggregate: sum frequencies per hand, divide by total combos for that hand
  const sums = {}
  for (const [combo, freq] of Object.entries(comboFreqs)) {
    const hand = comboToHand(combo)
    if (hand) sums[hand] = (sums[hand] ?? 0) + freq
  }

  const result = {}
  for (const [hand, sum] of Object.entries(sums)) {
    const total = hand.length === 2 ? 6 : hand.endsWith('s') ? 4 : 12
    const freq = sum / total
    if (freq > 0.001) result[hand] = Math.min(1, freq)
  }
  return result
}

/**
 * Parse a range string into a map of hand notation -> frequency (0–1).
 *
 * Supports two formats, auto-detected:
 *
 * 1. GTO solver format (individual combos with suits):
 *      [pct]Ah9h, Ad9d[/pct], AhKd, AhKs, ...
 *
 * 2. Hand notation format:
 *      "AA,KK,AKs"             -> { AA: 1.0, KK: 1.0, AKs: 1.0 }
 *      "AA:1,KK:0.75,AKs:0.5"  -> frequencies 0–1
 *      "54s-98s"               -> expanded connector range
 */
export function parseRangeString(str) {
  if (!str || typeof str !== 'string') return {}

  // Auto-detect GTO format by presence of bracket blocks or suit-specific combos
  if (str.includes('[') || COMBO_RE.test(str.trim().split(/[\s,]/)[0])) {
    return parseGTOFormat(str)
  }

  const result = {}
  const tokens = str.split(',').map(t => t.trim()).filter(Boolean)

  for (const token of tokens) {
    // Range syntax like "54s-98s" or "ATo-AKo"
    const rangeMatch = token.match(/^([2-9TJQKA]{2}[so]?)-([2-9TJQKA]{2}[so]?)(:[\d.]+)?$/)
    if (rangeMatch) {
      const expanded = expandHandRange(rangeMatch[1], rangeMatch[2])
      const freq = rangeMatch[3] ? parseFloat(rangeMatch[3].slice(1)) : 1.0
      for (const hand of expanded) result[hand] = Math.min(1, Math.max(0, freq))
      continue
    }

    // Standard hand[:freq]
    const match = token.match(/^([2-9TJQKA]{2}[so]?)(:[\d.]+)?$/)
    if (match) {
      const freq = match[2] ? parseFloat(match[2].slice(1)) : 1.0
      result[match[1]] = Math.min(1, Math.max(0, freq))
    }
  }

  return result
}

/**
 * Expand a connector range like "54s" to "98s", returning all hands in between.
 * Works for suited, offsuit, and pairs.
 */
function expandHandRange(from, to) {
  const suited = from.endsWith('s') || to.endsWith('s')
  const offsuit = from.endsWith('o') || to.endsWith('o')

  const stripSuffix = h => h.replace(/[so]$/, '')
  const fromBase = stripSuffix(from)
  const toBase = stripSuffix(to)

  // Pair range: e.g. "22-TT"
  if (fromBase[0] === fromBase[1] && toBase[0] === toBase[1]) {
    const r1 = RANKS.indexOf(fromBase[0])
    const r2 = RANKS.indexOf(toBase[0])
    const lo = Math.min(r1, r2)
    const hi = Math.max(r1, r2)
    const hands = []
    for (let i = lo; i <= hi; i++) {
      hands.push(RANKS[i] + RANKS[i])
    }
    return hands
  }

  // Non-pair range: first rank stays the same, second rank steps
  const topRank = fromBase[0]
  const r1 = RANKS.indexOf(fromBase[1])
  const r2 = RANKS.indexOf(toBase[1])
  const lo = Math.min(r1, r2)
  const hi = Math.max(r1, r2)
  const hands = []
  for (let i = lo; i <= hi; i++) {
    const hand = topRank + RANKS[i]
    if (suited) hands.push(hand + 's')
    else if (offsuit) hands.push(hand + 'o')
    else hands.push(hand)
  }
  return hands
}

/**
 * Given row and column indices (0 = Ace, 12 = 2), return the canonical hand notation.
 * - Diagonal (row === col): pair, e.g. "AA"
 * - Above diagonal (col > row): suited, e.g. "AKs" (higher rank first)
 * - Below diagonal (row > col): offsuit, e.g. "AKo" (higher rank first)
 */
export function getHandNotation(row, col) {
  if (row === col) {
    return RANKS[row] + RANKS[col]
  } else if (col > row) {
    // Above diagonal -> suited: row rank is higher
    return RANKS[row] + RANKS[col] + 's'
  } else {
    // Below diagonal -> offsuit: col rank is higher
    return RANKS[col] + RANKS[row] + 'o'
  }
}

/**
 * Given a hand notation and parsed raise/call maps, return action frequencies.
 * raiseFreq + callFreq <= 1.0; foldFreq = 1 - raiseFreq - callFreq
 */
export function getCellData(handNotation, parsedRaise, parsedCall, parsedRaise2 = {}) {
  const raiseFreq  = parsedRaise[handNotation]  ?? 0
  const raise2Freq = parsedRaise2[handNotation] ?? 0
  const callFreq   = parsedCall[handNotation]   ?? 0
  const combined   = Math.min(1, raiseFreq + raise2Freq + callFreq)
  const foldFreq   = Math.max(0, 1 - combined)

  return { raiseFreq, raise2Freq, callFreq, foldFreq }
}

/**
 * Count the total number of combos in a parsed range map.
 * Pairs: 6 combos each. Suited: 4 combos. Offsuit: 12 combos.
 * Frequencies are factored in.
 */
export function countCombos(parsedRange) {
  let total = 0
  for (const [hand, freq] of Object.entries(parsedRange)) {
    const combos = handCombos(hand)
    total += combos * freq
  }
  return total
}

export function handCombos(hand) {
  if (hand.length === 2) return 6         // pair
  if (hand.endsWith('s')) return 4        // suited
  if (hand.endsWith('o')) return 12       // offsuit
  return 0
}

// Total possible preflop combos (1326)
export const TOTAL_COMBOS = 1326
