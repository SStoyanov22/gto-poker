// ── GTO Wizard Action Path Builder ──────────────────────────────────────────
//
// Converts spot definitions to GTO Wizard preflop_actions format.
//
// Format: Actions separated by dashes
//   F     = Fold
//   C     = Call
//   X     = Check
//   R2.5  = Raise to 2.5bb
//   R11   = Raise to 11bb (3-bet)
//   R28   = Raise to 28bb (4-bet)
//   R100  = All-in (at 100bb depth)
//
// Position order (6-max): UTG(0) → HJ(1) → CO(2) → BTN(3) → SB(4) → BB(5)
// ─────────────────────────────────────────────────────────────────────────────

const POS = { UTG: 0, HJ: 1, CO: 2, BTN: 3, SB: 4, BB: 5 }
const POS_NAMES = ['UTG', 'HJ', 'CO', 'BTN', 'SB', 'BB']

// ── Default bet sizes (can be overridden) ────────────────────────────────────
const DEFAULT_SIZES = {
  open: '2.5',      // RFI size (UTG/HJ/CO/BTN)
  openSB: '3.5',    // SB RFI size
  stack: 100,       // Default stack depth
}

// ── Stack-dependent bet sizes ────────────────────────────────────────────────
// Sizes are stored per stack depth, discovered from GTO Wizard API

const STACK_SIZES = {
  // 100bb stack (default)
  100: {
    openSB: '3.5',
    threeBet: {
      BB: { UTG: '13', HJ: '13', CO: '13', BTN: '13', SB: '10.5' },
      SB: { UTG: '12', HJ: '12', CO: '11.5', BTN: '11.5' },
      BTN: { UTG: '9', HJ: '9', CO: '9' },
      CO: { UTG: '8.5', HJ: '8.5' },
      HJ: { UTG: '8' },
    },
    fourBet: {
      UTG: { HJ: '20', CO: '21.5', BTN: '22.5', SB: '25', BB: '27.5' },
      HJ: { CO: '21.5', BTN: '22.5', SB: '25', BB: '27.5' },
      CO: { BTN: '22.5', SB: '24', BB: '27.5' },
      BTN: { SB: '24', BB: '27.5' },
      SB: { BB: '22' },
    },
    fiveBet: {
      BB: { UTG: '55', HJ: '55', CO: '55', BTN: '55', SB: '44' },
      SB: { UTG: '50', HJ: '50', CO: '48', BTN: '48' },
      BTN: { UTG: '45', HJ: '45', CO: '45' },
      CO: { UTG: '43', HJ: '43' },
      HJ: { UTG: '40' },
    },
  },
  // 50bb stack
  50: {
    openSB: '3.5',
    threeBet: {
      BB: { UTG: '9', HJ: '9', CO: '9', BTN: '9', SB: '10' },
      SB: { UTG: '8', HJ: '8', CO: '8', BTN: '8' },
      BTN: { UTG: '6.5', HJ: '6.5', CO: '6.5' },
      CO: { UTG: '6.5', HJ: '6.5' },
      HJ: { UTG: '6.5' },
    },
    fourBet: {
      UTG: { HJ: '14.5', CO: '14.5', BTN: '14.5', SB: '18', BB: '20.5' },
      HJ: { CO: '14.5', BTN: '14.5', SB: '18', BB: '20.5' },
      CO: { BTN: '14.5', SB: '18', BB: '20.5' },
      BTN: { SB: '18', BB: '20.5' },
      SB: { BB: '20' },
    },
    fiveBet: {}, // Discover after vs_4b scrape
  },
  // 40bb stack
  40: {
    openSB: '3',
    threeBet: {
      BB: { UTG: '8.5', HJ: '8.5', CO: '8.5', BTN: '8.5', SB: '7.5' },
      SB: { UTG: '7', HJ: '7', CO: '7', BTN: '7' },
      BTN: { UTG: '6', HJ: '6', CO: '6' },
      CO: { UTG: '6', HJ: '6' },
      HJ: { UTG: '6' },
    },
    fourBet: {
      UTG: { HJ: '12', CO: '12', BTN: '12', SB: '14', BB: '17' },
      HJ: { CO: '12', BTN: '12', SB: '14', BB: '17' },
      CO: { BTN: '12', SB: '14', BB: '17' },
      BTN: { SB: '14', BB: '17' },
      SB: { BB: '13.5' },
    },
    fiveBet: {}, // All-in at 40bb
  },
  // 70bb stack
  70: {
    openSB: '3.5',
    threeBet: {
      BB: { UTG: '11', HJ: '11', CO: '11', BTN: '10.5', SB: '9.5' },
      SB: { UTG: '9.5', HJ: '10', CO: '9.5', BTN: '9' },
      BTN: { UTG: '7.5', HJ: '7.5', CO: '7.5' },
      CO: { UTG: '7.5', HJ: '7.5' },
      HJ: { UTG: '7.5' },
    },
    fourBet: {
      UTG: { HJ: '17', CO: '17', BTN: '17', SB: '22', BB: '25.5' },
      HJ: { CO: '17', BTN: '17', SB: '23', BB: '25.5' },
      CO: { BTN: '17', SB: '22', BB: '25.5' },
      BTN: { SB: '20.5', BB: '24' },
      SB: { BB: '20' },
    },
    fiveBet: {}, // Discover from scrape
  },
  // 150bb stack
  150: {
    openSB: '3.5',
    threeBet: {
      BB: { UTG: '16', HJ: '16', CO: '16', BTN: '16', SB: '13' },
      SB: { UTG: '15', HJ: '15', CO: '15', BTN: '16' },
      BTN: { UTG: '11', HJ: '11', CO: '13.5' },
      CO: { UTG: '11', HJ: '11' },
      HJ: { UTG: '9' },
    },
    fourBet: {}, // Discover from scrape
    fiveBet: {}, // Discover from scrape
  },
}

// Current stack depth (set by scraper)
let currentStack = 100

/**
 * Set the current stack depth for size lookups
 */
export function setStackDepth(stack) {
  currentStack = stack
}

/**
 * Get the 3-bet size based on 3-bettor, opener position, and stack depth
 */
function getThreeBetSize(threeBettor, opener) {
  const stackSizes = STACK_SIZES[currentStack] || STACK_SIZES[100]
  return stackSizes.threeBet?.[threeBettor]?.[opener] || '11'
}

/**
 * Get the 4-bet size based on opener, 3-bettor position, and stack depth
 */
function getFourBetSize(opener, threeBettor) {
  const stackSizes = STACK_SIZES[currentStack] || STACK_SIZES[100]
  return stackSizes.fourBet?.[opener]?.[threeBettor] || '28'
}

/**
 * Get the 5-bet size based on 3-bettor position and stack depth
 */
function getFiveBetSize(threeBettor, opener) {
  const stackSizes = STACK_SIZES[currentStack] || STACK_SIZES[100]
  return stackSizes.fiveBet?.[threeBettor]?.[opener] || String(currentStack)
}

/**
 * Get the SB open size based on stack depth
 */
function getOpenSBSize() {
  const stackSizes = STACK_SIZES[currentStack] || STACK_SIZES[100]
  return stackSizes.openSB || '3.5'
}

// ── Path builders ────────────────────────────────────────────────────────────

/**
 * Build action string for RFI spot (folds to opener)
 * @param {string} opener - Position name (UTG, HJ, CO, BTN, SB)
 * @param {object} sizes - Bet sizes
 */
export function rfiActions(opener, sizes = DEFAULT_SIZES) {
  const actions = []
  for (let i = 0; i < POS[opener]; i++) {
    actions.push('F')
  }
  // We stop here - the opener's decision is what we're querying
  return actions.join('-')
}

/**
 * Build action string for facing an open (e.g., BB vs UTG open)
 * @param {string} hero - Hero's position
 * @param {string} opener - Opener's position
 */
export function vsOpenActions(hero, opener, sizes = DEFAULT_SIZES) {
  const actions = []
  for (let i = 0; i < POS[opener]; i++) actions.push('F')
  // SB open size is stack-dependent
  const openSize = opener === 'SB' ? getOpenSBSize() : sizes.open
  actions.push(`R${openSize}`)
  for (let i = POS[opener] + 1; i < POS[hero]; i++) actions.push('F')
  return actions.join('-')
}

/**
 * Build action string for 3-bet spot (opener facing 3-bet)
 * @param {string} opener - Original raiser
 * @param {string} threeBettor - 3-bettor position
 */
export function vs3betActions(opener, threeBettor, sizes = DEFAULT_SIZES) {
  const actions = []
  for (let i = 0; i < POS[opener]; i++) actions.push('F')
  // SB open size is stack-dependent
  const openSize = opener === 'SB' ? getOpenSBSize() : sizes.open
  actions.push(`R${openSize}`)
  for (let i = POS[opener] + 1; i < POS[threeBettor]; i++) actions.push('F')
  // Use position-aware 3-bet size
  const threeBetSize = getThreeBetSize(threeBettor, opener)
  actions.push(`R${threeBetSize}`)
  for (let i = POS[threeBettor] + 1; i < 6; i++) actions.push('F')
  return actions.join('-')
}

/**
 * Build action string for 4-bet spot (3-bettor facing 4-bet)
 */
export function vs4betActions(opener, threeBettor, sizes = DEFAULT_SIZES) {
  // Use position-aware 4-bet size
  const fourBetSize = getFourBetSize(opener, threeBettor)
  return vs3betActions(opener, threeBettor, sizes) + `-R${fourBetSize}`
}

/**
 * Build action string for 5-bet spot (opener facing 5-bet)
 */
export function vs5betActions(opener, threeBettor, sizes = DEFAULT_SIZES) {
  // Use position-aware 5-bet size
  const fiveBetSize = getFiveBetSize(threeBettor, opener)
  return vs4betActions(opener, threeBettor, sizes) + `-R${fiveBetSize}`
}

/**
 * Build action string for squeeze spot (someone squeezes after open + call)
 * @param {string} squeezer - Position making the squeeze
 * @param {string} opener - Original raiser
 * @param {string} coldCaller - Player who cold-called the open
 */
export function squeezeActions(squeezer, opener, coldCaller, sizes = DEFAULT_SIZES) {
  const actions = []
  for (let i = 0; i < POS[opener]; i++) actions.push('F')
  actions.push(`R${sizes.open}`)
  for (let i = POS[opener] + 1; i < POS[coldCaller]; i++) actions.push('F')
  actions.push('C')
  for (let i = POS[coldCaller] + 1; i < POS[squeezer]; i++) actions.push('F')
  return actions.join('-')
}

/**
 * Build action string for vs squeeze spot (opener or cold-caller facing squeeze)
 */
export function vsSqueezeActions(hero, squeezer, opener, coldCaller, sizes = DEFAULT_SIZES) {
  let base = squeezeActions(squeezer, opener, coldCaller, sizes)
  // Use position-aware squeeze size (similar to 3-bet, but may be larger due to dead money)
  const squeezeSize = getThreeBetSize(squeezer, opener) // Use 3-bet size as baseline
  base += `-R${squeezeSize}`
  for (let i = POS[squeezer] + 1; i < POS[hero]; i++) base += '-F'
  return base
}

/**
 * Build action string for SRP (single raised pot) - calls preflop
 */
export function srpActions(caller, opener, sizes = DEFAULT_SIZES) {
  let actions = vsOpenActions(caller, opener, sizes)
  actions += '-C'
  return actions
}

// ── Spot definitions ────────────────────────────────────────────────────────

/**
 * Generate all preflop spot definitions
 * Returns an object mapping spot IDs to their action strings
 */
export function generatePreflopSpots(sizes = DEFAULT_SIZES) {
  const spots = {}

  // ── RFI spots ──
  for (const pos of ['UTG', 'HJ', 'CO', 'BTN', 'SB']) {
    spots[`rfi_${pos.toLowerCase()}`] = {
      description: `${pos} RFI`,
      actions: rfiActions(pos, sizes),
      position: pos,
    }
  }

  // ── vs Open spots (BB vs all positions, SB vs BTN, etc.) ──
  const vsOpenPairs = [
    ['BB', 'UTG'], ['BB', 'HJ'], ['BB', 'CO'], ['BB', 'BTN'], ['BB', 'SB'],
    ['SB', 'UTG'], ['SB', 'HJ'], ['SB', 'CO'], ['SB', 'BTN'],
    ['BTN', 'UTG'], ['BTN', 'HJ'], ['BTN', 'CO'],
    ['CO', 'UTG'], ['CO', 'HJ'],
    ['HJ', 'UTG'],
  ]
  for (const [hero, opener] of vsOpenPairs) {
    spots[`${hero.toLowerCase()}_vs_${opener.toLowerCase()}`] = {
      description: `${hero} vs ${opener} open`,
      actions: vsOpenActions(hero, opener, sizes),
      position: hero,
    }
  }

  // ── vs 3-bet spots ──
  const vs3betPairs = [
    // UTG opens, faces 3-bet
    ['UTG', 'HJ'], ['UTG', 'CO'], ['UTG', 'BTN'], ['UTG', 'SB'], ['UTG', 'BB'],
    // HJ opens, faces 3-bet
    ['HJ', 'CO'], ['HJ', 'BTN'], ['HJ', 'SB'], ['HJ', 'BB'],
    // CO opens, faces 3-bet
    ['CO', 'BTN'], ['CO', 'SB'], ['CO', 'BB'],
    // BTN opens, faces 3-bet
    ['BTN', 'SB'], ['BTN', 'BB'],
    // SB opens, faces 3-bet from BB
    ['SB', 'BB'],
  ]
  for (const [opener, threeBettor] of vs3betPairs) {
    spots[`${opener.toLowerCase()}_vs_3b_${threeBettor.toLowerCase()}`] = {
      description: `${opener} vs ${threeBettor} 3-bet`,
      actions: vs3betActions(opener, threeBettor, sizes),
      position: opener,
    }
  }

  // ── vs 4-bet spots (3-bettor faces 4-bet) ──
  for (const [opener, threeBettor] of vs3betPairs) {
    spots[`${threeBettor.toLowerCase()}_vs_4b_${opener.toLowerCase()}`] = {
      description: `${threeBettor} vs ${opener} 4-bet`,
      actions: vs4betActions(opener, threeBettor, sizes),
      position: threeBettor,
    }
  }

  // ── vs 5-bet spots (opener faces 5-bet) ──
  for (const [opener, threeBettor] of vs3betPairs) {
    spots[`${opener.toLowerCase()}_vs_5b_${threeBettor.toLowerCase()}`] = {
      description: `${opener} vs ${threeBettor} 5-bet`,
      actions: vs5betActions(opener, threeBettor, sizes),
      position: opener,
    }
  }

  return spots
}

export { POS, POS_NAMES, DEFAULT_SIZES }
