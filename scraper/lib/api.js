// ── gtobase API wrapper ───────────────────────────────────────────────────────
//
// POST https://api.gtobase.com/v2/get_strategy
// Body: { id: <number>, q: "<stack>_P.f_P.r..." }
//
// Response structure (relevant fields):
//   active_node  : string key into trace
//   trace        : { [nodeKey]: { next_query: string[] } }
//   actions      : array of action objects
//   abs          : number[1326]   — reach probabilities at this node
//   villain_abs  : number[1326]   — per-combo freq of the action that led here
// ─────────────────────────────────────────────────────────────────────────────

const ENDPOINT = 'https://api.gtobase.com/v2/get_strategy'

// Minimum ms between requests (200 ms ≈ 5 req/s)
const RATE_MS = 220

let _lastTs = 0
let _token = null

export function setToken(token) {
  _token = token
}

async function sleep(ms) {
  return new Promise(r => setTimeout(r, ms))
}

/**
 * Call the gtobase strategy API.
 * @param {number} id   - spot id (encodes rake level + pfr size)
 * @param {string} q    - query string encoding game tree path
 * @returns {Promise<object>} raw API response
 */
export async function getStrategy(id, q) {
  if (!_token) throw new Error('Token not set — call setToken(token) first')

  const now = Date.now()
  const wait = RATE_MS - (now - _lastTs)
  if (wait > 0) await sleep(wait)
  _lastTs = Date.now()

  const resp = await fetch(ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${_token}`,
    },
    body: JSON.stringify({ id, q }),
  })

  if (!resp.ok) {
    const body = await resp.text().catch(() => '')
    throw new Error(`API ${resp.status}: ${body}`)
  }

  return resp.json()
}
