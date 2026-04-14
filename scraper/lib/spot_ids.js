// ── Spot ID Map ───────────────────────────────────────────────────────────────
//
// Maps (stake, pfrSize) to the `id` field used in the gtobase API.
// The id encodes the rake structure and default open sizing.
//
// Known values from API inspection:
//   NL100 2.5bb → 127
//   NL100 2bb   → 125
//   NL100 2.25bb→ 126
//   NL100 3bb   → 128
//   NL50  2.5bb → 123
//   NL200 2.5bb → 131
//   NL500 2.5bb → 119
//
// Values marked null need to be confirmed by inspecting the gtobase UI.
// ─────────────────────────────────────────────────────────────────────────────

export const SPOT_IDS = {
  nl50: {
    '2bb':    121,
    '2.25bb': 122,
    '2.5bb':  123,
    '3bb':    124,
  },
  nl100: {
    '2bb':    125,
    '2.25bb': 126,
    '2.5bb':  127,
    '3bb':    128,
  },
  nl200: {
    '2bb':    129,
    '2.25bb': 130,
    '2.5bb':  131,
    '3bb':    131,
  },
  nl500: {
    '2bb':    117,
    '2.25bb': 118,
    '2.5bb':  119,
    '3bb':    120,
  },
}

/**
 * Get the API spot id for a given stake and pfr size.
 * @param {string} stake   - 'nl50' | 'nl100' | 'nl200' | 'nl500'
 * @param {string} pfrSize - '2bb' | '2.25bb' | '2.5bb' | '3bb'
 * @returns {number|null}
 */
export function getSpotId(stake, pfrSize) {
  return SPOT_IDS[stake]?.[pfrSize] ?? null
}
