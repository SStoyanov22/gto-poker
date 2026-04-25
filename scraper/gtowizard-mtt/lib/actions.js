// ── GTO Wizard MTT 8-max Action Builder ─────────────────────────────────────
//
// 8 positions: UTG, UTG1, LJ, HJ, CO, BTN, SB, BB
// Gametype: MTTGeneral_8m
// Stacks param: 8 equal stacks like "100.125-100.125-100.125-100.125-100.125-100.125-100.125-100.125"
//
// Open/raise sizes are stack-dependent and discovered at runtime via the
// /v1/poker/history/ endpoint. Defaults below are taken from the user's
// example URLs (100bb → R2.5, 40bb → R2.1) and act as fallback only.
// ─────────────────────────────────────────────────────────────────────────────

export const POS = { UTG: 0, UTG1: 1, LJ: 2, HJ: 3, CO: 4, BTN: 5, SB: 6, BB: 7 }
export const POS_NAMES = ['UTG', 'UTG1', 'LJ', 'HJ', 'CO', 'BTN', 'SB', 'BB']

// Open sizes vary by (stack, opener position). Discovered from RFI responses
// during scrape — the rfi_<pos>.json file at each stack contains the canonical
// open size in action_solutions[].action.betsize for the non-allin RAISE.
//
// Pre-filled with what we discovered at 100bb. Other stacks populate at runtime.
//   [stack][position] → 'R2.1'
const DEFAULT_OPEN_SIZES = {
  100: { UTG: '2.1', UTG1: '2.1', LJ: '2.1', HJ: '2.1', CO: '2.2', BTN: '2.5', SB: '3.5' },
}

// 3-bet sizes per stack populated from vs-RFI responses at runtime.
// Until populated, fall back to a percentage of stack (~10% deep, more shallow).
const FALLBACK_3BET_FRAC = { ip: 0.085, oop: 0.10 }

// Fallback 4-bet fraction: typically ~22% of stack at 100bb (e.g., R22 over R8).
const FALLBACK_4BET_FRAC = 0.22

const sizeTables = {
  open: structuredClone(DEFAULT_OPEN_SIZES),  // [stack][opener] → '2.1'
  threeBet: {},                                // [stack][opener][threeBettor] → '13.12' or 'RAI'
  fourBet: {},                                 // [stack][opener][threeBettor] → '28' or 'RAI'
}

let currentStack = 100

export function setStackDepth(stack) { currentStack = stack }
export function setOpenSize(stack, opener, size) {
  if (!sizeTables.open[stack]) sizeTables.open[stack] = {}
  sizeTables.open[stack][opener] = String(size)
}
export function setThreeBetSize(stack, opener, threeBettor, size) {
  if (!sizeTables.threeBet[stack]) sizeTables.threeBet[stack] = {}
  if (!sizeTables.threeBet[stack][opener]) sizeTables.threeBet[stack][opener] = {}
  sizeTables.threeBet[stack][opener][threeBettor] = String(size)
}
export function setFourBetSize(stack, opener, threeBettor, size) {
  if (!sizeTables.fourBet[stack]) sizeTables.fourBet[stack] = {}
  if (!sizeTables.fourBet[stack][opener]) sizeTables.fourBet[stack][opener] = {}
  sizeTables.fourBet[stack][opener][threeBettor] = String(size)
}
export function getSizeTables() { return sizeTables }
export function hasOpenSize(stack, opener) {
  return Boolean(sizeTables.open[stack]?.[opener])
}

function openSize(opener) {
  const t = sizeTables.open[currentStack]?.[opener]
  if (t) return t
  const baseline = DEFAULT_OPEN_SIZES[100][opener] || '2.1'
  return baseline
}

function threeBetSize(opener, threeBettor) {
  const t = sizeTables.threeBet[currentStack]?.[opener]?.[threeBettor]
  if (t) return t
  const oop = threeBettor === 'SB' || threeBettor === 'BB'
  const frac = oop ? FALLBACK_3BET_FRAC.oop : FALLBACK_3BET_FRAC.ip
  return (currentStack * frac).toFixed(2).replace(/\.?0+$/, '')
}

function fourBetSize(opener, threeBettor) {
  const t = sizeTables.fourBet[currentStack]?.[opener]?.[threeBettor]
  if (t) return t
  return (currentStack * FALLBACK_4BET_FRAC).toFixed(2).replace(/\.?0+$/, '')
}

// ── Path builders ────────────────────────────────────────────────────────────

/** Folds before the opener's seat — opener decides next. */
export function rfiActions(opener) {
  const out = []
  for (let i = 0; i < POS[opener]; i++) out.push('F')
  return out.join('-')
}

/** Hero faces an open from `opener`. Folds in between. Hero decides next. */
export function vsOpenActions(hero, opener) {
  const out = []
  for (let i = 0; i < POS[opener]; i++) out.push('F')
  out.push(`R${openSize(opener)}`)
  for (let i = POS[opener] + 1; i < POS[hero]; i++) out.push('F')
  return out.join('-')
}

/** Opener faces a 3-bet from `threeBettor`. Folds back to opener. Opener decides next. */
export function vs3betActions(opener, threeBettor) {
  const out = []
  for (let i = 0; i < POS[opener]; i++) out.push('F')
  out.push(`R${openSize(opener)}`)
  for (let i = POS[opener] + 1; i < POS[threeBettor]; i++) out.push('F')
  const tb = threeBetSize(opener, threeBettor)
  out.push(tb === 'RAI' ? 'RAI' : `R${tb}`)
  for (let i = POS[threeBettor] + 1; i < POS_NAMES.length; i++) out.push('F')
  return out.join('-')
}

/** 3-bettor faces a 4-bet from opener. Hero (3-bettor) decides next. */
export function vs4betActions(opener, threeBettor) {
  const base = vs3betActions(opener, threeBettor)
  const fb = fourBetSize(opener, threeBettor)
  return base + '-' + (fb === 'RAI' ? 'RAI' : `R${fb}`)
}

// ── Spot generation ──────────────────────────────────────────────────────────

/**
 * Generate every (RFI, vs-RFI, vs-3B, vs-4B) spot for 8-max MTT.
 * Returns { spotId: { description, actions, position, kind } }
 *
 * Counts:
 *   RFI:    7  (UTG, UTG1, LJ, HJ, CO, BTN, SB — BB never RFI)
 *   vs RFI: 28 (triangle: 7+6+5+4+3+2+1)
 *   vs 3B:  28 (same triangle)
 *   vs 4B:  28 (same triangle — 3-bettor faces 4-bet from opener)
 *   total:  91 spots per stack
 */
export function generateMttSpots() {
  const spots = {}
  const openers = ['UTG', 'UTG1', 'LJ', 'HJ', 'CO', 'BTN', 'SB']

  // RFI
  for (const opener of openers) {
    spots[`rfi_${opener.toLowerCase()}`] = {
      description: `${opener} RFI`,
      actions: rfiActions(opener),
      position: opener,
      kind: 'rfi',
    }
  }

  // vs RFI: every later position can defend
  for (const opener of openers) {
    for (let i = POS[opener] + 1; i < POS_NAMES.length; i++) {
      const hero = POS_NAMES[i]
      spots[`${hero.toLowerCase()}_vs_${opener.toLowerCase()}`] = {
        description: `${hero} vs ${opener} open`,
        actions: vsOpenActions(hero, opener),
        position: hero,
        kind: 'vs_rfi',
        opener,
      }
    }
  }

  // vs 3B: opener faces 3-bet from any later position
  for (const opener of openers) {
    for (let i = POS[opener] + 1; i < POS_NAMES.length; i++) {
      const threeBettor = POS_NAMES[i]
      spots[`${opener.toLowerCase()}_vs_3b_${threeBettor.toLowerCase()}`] = {
        description: `${opener} vs ${threeBettor} 3-bet`,
        actions: vs3betActions(opener, threeBettor),
        position: opener,
        kind: 'vs_3b',
        opener,
        threeBettor,
      }
    }
  }

  // vs 4B: 3-bettor faces 4-bet from opener.
  // Skip pairs where the discovered 3-bet is RAI — opener can't 4-bet an all-in,
  // so this spot doesn't exist in the solver tree.
  for (const opener of openers) {
    for (let i = POS[opener] + 1; i < POS_NAMES.length; i++) {
      const threeBettor = POS_NAMES[i]
      if (sizeTables.threeBet[currentStack]?.[opener]?.[threeBettor] === 'RAI') continue
      spots[`${threeBettor.toLowerCase()}_vs_4b_${opener.toLowerCase()}`] = {
        description: `${threeBettor} vs ${opener} 4-bet`,
        actions: vs4betActions(opener, threeBettor),
        position: threeBettor,
        kind: 'vs_4b',
        opener,
        threeBettor,
      }
    }
  }

  return spots
}

// ── MTT-specific helpers ─────────────────────────────────────────────────────

export const GAMETYPE_8M = 'MTTGeneral_8m'

/**
 * Build the `stacks` query parameter — 8 equal stacks separated by dashes.
 * GTOWizard's MTT solutions use a `.125` suffix that probably reflects ante structure.
 */
export function stacksParam(depthBb) {
  const s = `${depthBb}.125`
  return Array(8).fill(s).join('-')
}

/**
 * Stack sizes the user wants scraped, in scrape-priority order (deepest first).
 * 18bb and 90bb omitted: account doesn't have GTOWizard solutions at those depths (403).
 */
export const STACK_SIZES = [
  200, 160, 130, 100, 80, 70, 60, 55, 50, 45, 40, 38, 35, 32, 30, 28, 26, 25, 22, 20,
  19, 17, 16, 15, 14, 13, 12, 11, 10,
]
