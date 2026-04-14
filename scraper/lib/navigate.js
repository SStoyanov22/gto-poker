// ── Game-Tree Navigator ───────────────────────────────────────────────────────
//
// Navigates the gtobase game tree and extracts per-combo action frequencies.
//
// API response structure (confirmed from live response):
//   actions[i].action    : string like 'Fold', 'Call 2.50', 'Raise to 8.00'
//   actions[i].nextQuery : next q-string to pass to the API after this action
//   actions[i].played    : 1326-element array — per-combo probability of this action
//
// Navigation steps:
//   'f'  – take the Fold action
//   'c'  – take the Call / Limp / Check action
//   'r'  – take the first (smallest) Raise/Bet action
//   'r2' – take the second raise action
//   'r3' – take the third raise action
// ─────────────────────────────────────────────────────────────────────────────

import { getStrategy } from './api.js'

// Simple in-memory cache keyed by `${id}|${q}`
const cache = new Map()

async function query(id, q) {
  const key = `${id}|${q}`
  if (cache.has(key)) return cache.get(key)
  const data = await getStrategy(id, q)
  cache.set(key, data)
  return data
}

/**
 * Parse the BB size from a gtobase action name.
 * 'Raise to 13.00' → '13bb'
 * 'Call 2.50'      → '2.5bb'
 * 'Call 100.00'    → '100bb'
 */
function parseSizeBb(actionName) {
  const m = actionName?.match(/([\d.]+)\s*$/)
  if (!m) return null
  return parseFloat(parseFloat(m[1]).toFixed(4)).toString() + 'bb'
}

/**
 * Find the index of an action matching the step descriptor.
 * Used only for navigation (following paths through the tree).
 *
 * @param {Array}  actions - actions array from API response
 * @param {string} step    - 'f', 'c', 'r', 'r2', 'r3'
 * @returns {number} index of the matched action
 */
export function findActionIndex(actions, step) {
  if (step === 'f') {
    const idx = actions.findIndex(a => a.action?.toLowerCase().startsWith('fold'))
    if (idx === -1) throw new Error(`No fold action in: ${actions.map(a => a.action)}`)
    return idx
  }

  if (step === 'c') {
    const idx = actions.findIndex(a => {
      const s = a.action?.toLowerCase() ?? ''
      return s.startsWith('call') || s.startsWith('limp') || s.startsWith('check') || s.startsWith('complete')
    })
    if (idx === -1) throw new Error(`No call/limp action in: ${actions.map(a => a.action)}`)
    return idx
  }

  // 'r', 'r2', 'r3' — find Nth raise/bet action
  const nth = step === 'r' ? 1 : step === 'r2' ? 2 : 3
  let count = 0
  for (let i = 0; i < actions.length; i++) {
    const s = actions[i].action?.toLowerCase() ?? ''
    if (s.startsWith('raise') || s.startsWith('bet') || s.startsWith('all-in') || s.startsWith('allin')) {
      count++
      if (count === nth) return i
    }
  }
  throw new Error(`No raise(${nth}) in: ${actions.map(a => a.action)}`)
}

/**
 * Derive the next q-string after taking an action.
 */
export function deriveNextQ(currentQ, actions, step) {
  if (step === 'f') return currentQ + '_P.f'
  if (step === 'c') return currentQ + '_P.c'
  const idx   = findActionIndex(actions, step)
  const nextQ = actions[idx]?.nextQuery
  if (!nextQ) throw new Error(`No nextQuery on raise action[${idx}] (step=${step})`)
  return nextQ
}

/**
 * Navigate the game tree along pathSteps from rootQ, returning the final node.
 */
export async function navigateTo(id, rootQ, pathSteps) {
  let currentQ = rootQ
  let data     = await query(id, rootQ)

  for (const step of pathSteps) {
    const nextQ = deriveNextQ(currentQ, data.actions, step)
    currentQ    = nextQ
    data        = await query(id, nextQ)
  }

  return { data, q: currentQ }
}

/**
 * At a decision node, automatically extract per-combo frequencies for every
 * non-Fold action, keyed by the BB size from the action name.
 *
 * Returns { raise: { 'Xbb': number[] }, call: { 'Xbb': number[] } }
 * mirroring gtobase's own action structure directly.
 *
 * @param {object} nodeData - API response at the decision node
 */
export function extractAllActions(nodeData) {
  const raise = {}
  const call  = {}

  for (const action of (nodeData.actions ?? [])) {
    const name   = action.action ?? ''
    const lname  = name.toLowerCase()
    const played = action.played
    if (lname.startsWith('fold') || !played) continue

    const sizeBb = parseSizeBb(name)
    if (!sizeBb) continue

    if (lname.startsWith('raise') || lname.startsWith('bet') || lname.startsWith('all-in') || lname.startsWith('allin')) {
      raise[sizeBb] = played
    } else if (lname.startsWith('call') || lname.startsWith('limp') || lname.startsWith('check') || lname.startsWith('complete')) {
      call[sizeBb] = played
    }
  }

  return { raise, call }
}

/**
 * Navigate to a decision point and extract all non-Fold actions.
 *
 * @param {number}   id     - spot id
 * @param {string}   rootQ  - starting q-string
 * @param {string[]} path   - steps to reach the decision point
 * @returns {Promise<{ raise: object, call: object }>}
 */
export async function scrapeSpot(id, rootQ, path) {
  const { data } = await navigateTo(id, rootQ, path)
  return extractAllActions(data)
}

/**
 * Navigate to a decision point and return the raw API response.
 *
 * @param {number}   id     - spot id
 * @param {string}   rootQ  - starting q-string
 * @param {string[]} path   - steps to reach the decision point
 * @returns {Promise<{ data: object, q: string, path: string[] }>}
 */
export async function scrapeSpotRaw(id, rootQ, path) {
  const { data, q } = await navigateTo(id, rootQ, path)
  return { data, q, path }
}

/** Clear the in-memory cache. */
export function clearCache() {
  cache.clear()
}
