// ── GTOWizard API Client ──────────────────────────────────────────────────────
//
// Two endpoints:
//   /v1/poker/history/       – game tree navigation (available action codes)
//   /v4/solutions/spot-solution/ – strategy data (169-element arrays per action)
//
// Auth: Authorization: Bearer <token>
//
// Usage:
//   import { setToken, getSpotSolution, processSpotSolution } from './gtowizard.js'
//   setToken('eyJ...')
//   const raw = await getSpotSolution({ gametype: 'Cash6mTest_6mNL100R25', depth: 100, preflopActions: 'F-F-F-R2.5' })
//   const processed = processSpotSolution(raw)
// ─────────────────────────────────────────────────────────────────────────────

const BASE_URL = 'https://api.gtowizard.com'

// ── Hand-type index mapping ───────────────────────────────────────────────────
// The 169-element strategy array maps to hand types in a 13×13 matrix,
// stored in row-major order. Ranks are indexed 2(0)→A(12).
//   row < col  → offsuit (e.g. [0][12] → A2o, higher rank is col)
//   row > col  → suited  (e.g. [12][0] → A2s, higher rank is row)
//   row == col → pair    (e.g. [0][0] → 22, [12][12] → AA)
const RANKS = ['2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A']

const HAND_TYPES = [] // length 169, index → hand notation
for (let row = 0; row < 13; row++) {
  for (let col = 0; col < 13; col++) {
    if (row === col)      HAND_TYPES.push(RANKS[row] + RANKS[row])
    else if (row < col)   HAND_TYPES.push(RANKS[col] + RANKS[row] + 's')  // suited (row < col in 2→A)
    else                  HAND_TYPES.push(RANKS[row] + RANKS[col] + 'o')  // offsuit (row > col in 2→A)
  }
}

// ── Auth ──────────────────────────────────────────────────────────────────────
let _token = null
export function setToken(token) { _token = token }

// ── Rate limiting ─────────────────────────────────────────────────────────────
// GTOWizard enforces per-second rate limits. 220ms between requests (~4.5 req/s).
let _lastRequest = 0
async function rateLimit() {
  const now = Date.now()
  const wait = 220 - (now - _lastRequest)
  if (wait > 0) await new Promise(r => setTimeout(r, wait))
  _lastRequest = Date.now()
}

// ── HTTP ──────────────────────────────────────────────────────────────────────
async function get(path, params) {
  await rateLimit()
  const url = new URL(BASE_URL + path)
  for (const [k, v] of Object.entries(params)) {
    url.searchParams.set(k, String(v))
  }

  const res = await fetch(url.toString(), {
    headers: { Authorization: `Bearer ${_token}` },
  })

  if (res.status === 429) {
    const body = await res.text()
    throw new Error(`API 429: ${body}`)
  }
  if (!res.ok) {
    const body = await res.text()
    throw new Error(`API ${res.status}: ${body}`)
  }
  const text = await res.text()
  if (!text) {
    throw new Error(`API returned empty response for ${url}`)
  }
  return JSON.parse(text)
}

// ── Endpoints ─────────────────────────────────────────────────────────────────

/**
 * Fetch the game tree history up to the current node.
 * Useful for discovering available action codes at a spot.
 *
 * @param {object} opts
 * @param {string} opts.gametype        e.g. 'Cash6mTest_6mNL100R25'
 * @param {number} opts.depth           stack depth in bb, e.g. 100
 * @param {string} [opts.preflopActions] e.g. 'F-F-F-R2.5'
 * @param {string} [opts.flopActions]
 * @param {string} [opts.turnActions]
 * @param {string} [opts.riverActions]
 * @returns {Promise<object>}  { history_actions, future_actions }
 */
export async function getHistory({ gametype, depth, preflopActions = '', flopActions = '', turnActions = '', riverActions = '' }) {
  return get('/v1/poker/history/', {
    gametype,
    depth,
    stacks: '',
    preflop_actions: preflopActions,
    flop_actions:    flopActions,
    turn_actions:    turnActions,
    river_actions:   riverActions,
  })
}

/**
 * Fetch strategy data for a specific spot.
 * Returns per-action strategy arrays (169 values each).
 *
 * @param {object} opts
 * @param {string} opts.gametype
 * @param {number} opts.depth
 * @param {string} [opts.preflopActions]
 * @param {string} [opts.flopActions]
 * @param {string} [opts.turnActions]
 * @param {string} [opts.riverActions]
 * @param {string} [opts.board]          e.g. 'AhKd2c' for postflop
 * @returns {Promise<object>}  { action_solutions, players_info, game, ... }
 */
export async function getSpotSolution({ gametype, depth, preflopActions = '', flopActions = '', turnActions = '', riverActions = '', board = '' }) {
  return get('/v4/solutions/spot-solution/', {
    gametype,
    depth,
    stacks: '',
    preflop_actions: preflopActions,
    flop_actions:    flopActions,
    turn_actions:    turnActions,
    river_actions:   riverActions,
    board,
  })
}

// ── Processing ────────────────────────────────────────────────────────────────

/**
 * Convert a 169-element strategy/ev array to a { handType: value } map.
 * Entries below threshold are omitted.
 */
export function arrayToHandMap(arr, threshold = 0.0001) {
  const out = {}
  for (let i = 0; i < 169; i++) {
    const v = arr[i]
    if (v != null && Math.abs(v) > threshold) {
      out[HAND_TYPES[i]] = parseFloat(v.toFixed(4))
    }
  }
  return out
}

/**
 * Process a raw spot-solution API response into the app's compact format:
 *   {
 *     raise: { '24bb': { AA: 1.0, ... }, '100bb': { ... } },
 *     call:  { '12bb': { AA: 0.5, ... } },
 *     ev:    { main: {...}, raise_24bb: {...}, call_12bb: {...} }
 *   }
 *
 * Uses simple_hand_counters from API response which provides properly labeled
 * hand data with action frequencies. Falls back to 169-element arrays if
 * simple_hand_counters is not available.
 *
 * All-in actions use their actual betsize (e.g. '100bb' at 100bb depth).
 */
export function processSpotSolution(data) {
  const raise = {}
  const call  = {}
  const fold  = {}
  const ev    = {}
  const inRange = []

  // Find action codes and their sizes from action_solutions
  const actionSizes = {}
  let foldCode = null
  for (const sol of (data.action_solutions ?? [])) {
    const action = sol.action
    if (action.type === 'FOLD') {
      foldCode = action.code
      continue
    }
    const rawSize = parseFloat(action.betsize)
    const sizeBb = rawSize.toString() + 'bb'
    actionSizes[action.code] = { type: action.type, sizeBb }
  }

  // Try to use simple_hand_counters (properly labeled data)
  // Look for the hero player (is_hero: true) who has the strategy data
  const heroPlayer = (data.players_info ?? []).find(pi => pi.player?.is_hero === true)
  const handCounters = heroPlayer?.simple_hand_counters

  if (handCounters && Object.keys(handCounters).length > 0) {
    // Use properly labeled hand data
    for (const [handName, handData] of Object.entries(handCounters)) {
      // Skip non-hand entries like "best_hands", "good_hands", etc.
      if (!handData.actions_total_frequencies) continue

      // total_frequency is how often this hand is in the range (e.g., 0.0375 for 33 in UTG range)
      // actions_total_frequencies gives freq WITHIN the range (e.g., 1.0 = 100% call when in range)
      // Actual freq = total_frequency × action_freq
      const rangeFreq = handData.total_frequency ?? 0
      if (rangeFreq < 0.0001) continue  // Hand not in range

      // Track all hands in range
      inRange.push(handName)

      for (const [actionCode, actionFreq] of Object.entries(handData.actions_total_frequencies)) {
        if (actionFreq < 0.0001) continue

        // Handle fold action
        if (actionCode === foldCode || actionCode === 'F') {
          const freq = rangeFreq * actionFreq
          fold[handName] = parseFloat(freq.toFixed(4))
          continue
        }

        const actionInfo = actionSizes[actionCode]
        if (!actionInfo) continue

        const { type, sizeBb } = actionInfo
        // Actual frequency = how often hand is in range × how often we take this action
        const freq = rangeFreq * actionFreq

        if (type === 'CALL') {
          if (!call[sizeBb]) call[sizeBb] = {}
          call[sizeBb][handName] = parseFloat(freq.toFixed(4))
        } else if (type === 'RAISE') {
          if (!raise[sizeBb]) raise[sizeBb] = {}
          raise[sizeBb][handName] = parseFloat(freq.toFixed(4))
        }
      }

      // Extract EV if available (only for hands in range)
      if (handData.hand_ev != null && Math.abs(handData.hand_ev) > 0.0001) {
        if (!ev.main) ev.main = {}
        ev.main[handName] = parseFloat(handData.hand_ev.toFixed(4))
      }
    }
  } else {
    // Fallback to 169-element arrays (may have incorrect mapping)
    console.warn('simple_hand_counters not available, falling back to 169-element arrays')
    for (const sol of (data.action_solutions ?? [])) {
      const action = sol.action
      if (action.type === 'FOLD') continue

      const rawSize = parseFloat(action.betsize)
      const sizeBb = rawSize.toString() + 'bb'

      const freqMap = arrayToHandMap(sol.strategy)
      if (Object.keys(freqMap).length === 0) continue

      if (action.type === 'CALL') {
        call[sizeBb] = freqMap
        if (sol.evs) {
          const evMap = arrayToHandMap(sol.evs)
          if (Object.keys(evMap).length) ev[`call_${sizeBb}`] = evMap
        }
      } else if (action.type === 'RAISE') {
        raise[sizeBb] = freqMap
        if (sol.evs) {
          const evMap = arrayToHandMap(sol.evs)
          if (Object.keys(evMap).length) ev[`raise_${sizeBb}`] = evMap
        }
      }
    }

    // Overall GTO EV from players_info
    if (heroPlayer?.evs) {
      const mainEv = arrayToHandMap(heroPlayer.evs)
      if (Object.keys(mainEv).length) ev.main = mainEv
    }
  }

  const out = {}
  if (Object.keys(raise).length) out.raise = raise
  if (Object.keys(call).length)  out.call  = call
  if (Object.keys(fold).length)  out.fold  = fold
  if (Object.keys(ev).length)    out.ev    = ev
  if (inRange.length)            out.inRange = inRange
  return out
}

// ── Gametype helpers ──────────────────────────────────────────────────────────

/**
 * Known gametype strings for nl100 cash 6-max.
 * The R-suffix appears to label the solution family (open size × 10).
 * Verify against the history endpoint if unsure.
 */
export const GAMETYPES = {
  nl100: {
    '2bb':   'Cash6mTest_6mNL100R20',
    '2.25bb':'Cash6mTest_6mNL100R225', // unverified
    '2.5bb': 'Cash6mTest_6mNL100R25',
    '3bb':   'Cash6mTest_6mNL100R30',  // unverified
  }
}

export function getGametype(stake, pfrSize) {
  return GAMETYPES[stake]?.[pfrSize] ?? null
}
