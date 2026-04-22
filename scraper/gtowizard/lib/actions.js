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
    // Squeeze sizes (squeezer|opener|coldCaller -> size)
    squeeze: {
      'CO|UTG|HJ': '11',
      'BTN|UTG|HJ': '11', 'BTN|UTG|CO': '11', 'BTN|HJ|CO': '11',
      'SB|UTG|HJ': '14', 'SB|UTG|CO': '14', 'SB|UTG|BTN': '14',
      'SB|HJ|CO': '14', 'SB|HJ|BTN': '14', 'SB|CO|BTN': '14',
      'BB|UTG|HJ': '15', 'BB|UTG|CO': '15', 'BB|UTG|BTN': '15', 'BB|UTG|SB': '15',
      'BB|HJ|CO': '15', 'BB|HJ|BTN': '15', 'BB|HJ|SB': '15',
      'BB|CO|BTN': '15', 'BB|CO|SB': '15', 'BB|BTN|SB': '15',
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
  // 150bb stack - sizes discovered from GTO Wizard API
  150: {
    openSB: '3.5',
    threeBet: {
      BB: { UTG: '9', HJ: '9', CO: '9.5', BTN: '12', SB: '10' },
      SB: { UTG: '14', HJ: '14', CO: '14', BTN: '16' },
      BTN: { UTG: '9.5', HJ: '9.5', CO: '9.5' },
      CO: { UTG: '9', HJ: '9' },
      HJ: { UTG: '9' },
    },
    squeeze: {
      // Will be discovered during scrape
    },
    fourBet: {}, // Discover from scrape
    fiveBet: {}, // Discover from scrape
  },
  // 125bb stack - sizes discovered from GTO Wizard API
  125: {
    openSB: '3.5',
    threeBet: {
      BB: { UTG: '14.5', HJ: '14', CO: '14', BTN: '14', SB: '10.5' },
      SB: { UTG: '12.5', HJ: '12.5', CO: '12.5', BTN: '12' },
      BTN: { UTG: '8.5', HJ: '8.5', CO: '8.5' },
      CO: { UTG: '8.5', HJ: '8.5' },
      HJ: { UTG: '8' },
    },
    squeeze: {
      'CO|UTG|HJ': '11',
      'BTN|UTG|HJ': '11', 'BTN|UTG|CO': '11', 'BTN|HJ|CO': '11',
      'SB|UTG|HJ': '15', 'SB|UTG|CO': '15', 'SB|UTG|BTN': '15',
      'SB|HJ|CO': '15', 'SB|HJ|BTN': '15', 'SB|CO|BTN': '15',
      'BB|UTG|HJ': '15', 'BB|UTG|CO': '15', 'BB|UTG|BTN': '15', 'BB|UTG|SB': '15',
      'BB|HJ|CO': '15', 'BB|HJ|BTN': '15', 'BB|HJ|SB': '15',
      'BB|CO|BTN': '15', 'BB|CO|SB': '15', 'BB|BTN|SB': '15',
    },
    fourBet: {
      UTG: { HJ: '25', CO: '26.5', BTN: '26.5', SB: '31.5', BB: '36.5' },
      HJ: { CO: '26.5', BTN: '26.5', SB: '31.5', BB: '35' },
      CO: { BTN: '26.5', SB: '31.5', BB: '35' },
      BTN: { SB: '30', BB: '35' },
      SB: { BB: '24' },
    },
    fiveBet: {
      // Non-all-in 5-bet sizes. Where only all-in is available, vs_5b node may not exist
      BB: { SB: '50.5' }, // vs UTG/HJ/CO/BTN = all-in only
      SB: { BTN: '66' },  // vs UTG/HJ/CO = all-in only
      BTN: { UTG: '55.5', HJ: '55.5', CO: '55.5' },
      CO: { UTG: '55.5', HJ: '55.5' },
      HJ: { UTG: '52.5' },
    },
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

/**
 * Get the squeeze size based on squeezer, opener, coldCaller and stack depth
 */
function getSqueezeSize(squeezer, opener, coldCaller) {
  const stackSizes = STACK_SIZES[currentStack] || STACK_SIZES[100]
  const key = `${squeezer}|${opener}|${coldCaller}`
  return stackSizes.squeeze?.[key] || '14'  // Default to 14bb if not found
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
 *
 * After the squeeze, action goes back around the table:
 * - If hero is the opener: opener acts next after squeeze
 * - If hero is the cold caller: opener acts first, then cold caller
 *
 * @param {boolean} rfiCalls - If true and hero is cold caller, RFI calls (not folds)
 */
export function vsSqueezeActions(hero, squeezer, opener, coldCaller, sizes = DEFAULT_SIZES, rfiCalls = false) {
  let base = squeezeActions(squeezer, opener, coldCaller, sizes)
  // Use proper squeeze size (larger than 3-bet due to dead money from cold caller)
  const squeezeSize = getSqueezeSize(squeezer, opener, coldCaller)
  base += `-R${squeezeSize}`

  // After squeeze, positions after squeezer fold before action returns to opener
  // e.g., BTN squeezes → SB folds, BB folds → then UTG (opener) acts
  for (let i = POS[squeezer] + 1; i < 6; i++) {
    base += '-F'
  }

  // After squeeze, action goes to opener first, then cold caller
  if (hero === coldCaller) {
    // Cold caller acts after opener's decision
    base += rfiCalls ? '-C' : '-F'  // Opener calls or folds
  }
  // If hero is the opener, no additional actions needed - it's their turn

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

/**
 * Build action string for overcall spot (open + cold call + hero decides)
 * @param {string} hero - Hero's position (deciding to overcall)
 * @param {string} opener - Original raiser
 * @param {string} coldCaller - Player who cold-called
 */
export function overcallActions(hero, opener, coldCaller, sizes = DEFAULT_SIZES) {
  const actions = []
  for (let i = 0; i < POS[opener]; i++) actions.push('F')
  const openSize = opener === 'SB' ? getOpenSBSize() : sizes.open
  actions.push(`R${openSize}`)
  for (let i = POS[opener] + 1; i < POS[coldCaller]; i++) actions.push('F')
  actions.push('C')
  for (let i = POS[coldCaller] + 1; i < POS[hero]; i++) actions.push('F')
  return actions.join('-')
}

/**
 * Build action string for cold call 3-bet spot (open + 3-bet + hero decides to cold call)
 * @param {string} hero - Hero's position (deciding to cold call 3-bet)
 * @param {string} opener - Original raiser
 * @param {string} threeBettor - 3-bettor
 */
export function coldCall3betActions(hero, opener, threeBettor, sizes = DEFAULT_SIZES) {
  const actions = []
  for (let i = 0; i < POS[opener]; i++) actions.push('F')
  const openSize = opener === 'SB' ? getOpenSBSize() : sizes.open
  actions.push(`R${openSize}`)
  for (let i = POS[opener] + 1; i < POS[threeBettor]; i++) actions.push('F')
  const threeBetSize = getThreeBetSize(threeBettor, opener)
  actions.push(`R${threeBetSize}`)
  for (let i = POS[threeBettor] + 1; i < POS[hero]; i++) actions.push('F')
  return actions.join('-')
}

/**
 * Build action string for vs 3-bet with cold caller (opener facing 3-bet, someone else cold called)
 * Action: Open -> Cold Call -> 3-bet -> folds to opener
 * @param {string} opener - Original raiser facing 3-bet
 * @param {string} coldCaller - Player who cold-called the open
 * @param {string} threeBettor - 3-bettor
 */
export function vs3betWithCallerActions(opener, coldCaller, threeBettor, sizes = DEFAULT_SIZES) {
  const actions = []
  for (let i = 0; i < POS[opener]; i++) actions.push('F')
  const openSize = opener === 'SB' ? getOpenSBSize() : sizes.open
  actions.push(`R${openSize}`)
  for (let i = POS[opener] + 1; i < POS[coldCaller]; i++) actions.push('F')
  actions.push('C')
  for (let i = POS[coldCaller] + 1; i < POS[threeBettor]; i++) actions.push('F')
  const threeBetSize = getThreeBetSize(threeBettor, opener)
  actions.push(`R${threeBetSize}`)
  // Folds back to opener
  for (let i = POS[threeBettor] + 1; i < 6; i++) actions.push('F')
  return actions.join('-')
}

/**
 * Build action string for multiway overcall (open + 2 cold calls + hero decides)
 * @param {string} hero - Hero's position
 * @param {string} opener - Original raiser
 * @param {string} caller1 - First cold caller
 * @param {string} caller2 - Second cold caller
 */
export function multiwayOvercallActions(hero, opener, caller1, caller2, sizes = DEFAULT_SIZES) {
  const actions = []
  for (let i = 0; i < POS[opener]; i++) actions.push('F')
  const openSize = opener === 'SB' ? getOpenSBSize() : sizes.open
  actions.push(`R${openSize}`)
  for (let i = POS[opener] + 1; i < POS[caller1]; i++) actions.push('F')
  actions.push('C')
  for (let i = POS[caller1] + 1; i < POS[caller2]; i++) actions.push('F')
  actions.push('C')
  for (let i = POS[caller2] + 1; i < POS[hero]; i++) actions.push('F')
  return actions.join('-')
}

/**
 * Get the 4-bet size for squeeze pots (larger than standard 3-bet pots due to dead money)
 * Sizes discovered from GTO Wizard API at 100bb:
 * - BB squeeze (15bb) → 4-bet 31.5bb
 * - SB squeeze (14bb) → 4-bet 31.5bb
 * - BTN squeeze (11bb) → 4-bet 27.5bb
 * - CO squeeze (11bb) → 4-bet 27.5bb
 */
function getSqueezeFourBetSize(opener, squeezer) {
  const squeezeFourBet = {
    UTG: { BB: '31.5', SB: '31.5', BTN: '27.5', CO: '27.5' },
    HJ: { BB: '31.5', SB: '31.5', BTN: '27.5', CO: '27.5' },
    CO: { BB: '31.5', SB: '31.5', BTN: '27.5' },
    BTN: { BB: '31.5', SB: '31.5' },
  }
  return squeezeFourBet[opener]?.[squeezer] || '27.5'
}

/**
 * Get the 4-bet size when the cold caller 4-bets (squeezer faces it)
 * Sizes discovered from GTO Wizard API at 100bb:
 *   BB squeeze UTG+HJ → HJ 4-bets: R34
 *   BB squeeze others → CC 4-bets: R31.5
 *   SB squeeze UTG+HJ → HJ 4-bets: R31.5
 *   SB/BTN/CO squeeze others → CC 4-bets: R31.5 (estimated)
 */
function getColdCaller4betSize(squeezer, opener, coldCaller) {
  if (squeezer === 'BB' && opener === 'UTG' && coldCaller === 'HJ') return '34'
  return '31.5'
}

// CC 4-bet sizes that are confirmed to exist in GTO Wizard as squeezer-response nodes.
// Entries NOT listed here → stop at CC's decision node (no CC 4-bet appended).
// Confirmed working: BB squeeze with SB cold-caller (R31.5), BB sqz UTG+HJ (R34),
// all SB squeeze cases (R31.5).
const CC_4BET_NODE_EXISTS = new Set([
  'BB|BTN|SB', 'BB|CO|SB', 'BB|HJ|SB', 'BB|UTG|SB',  // BB sqz, SB cold-caller
  'BB|UTG|HJ',                                          // BB sqz UTG+HJ (R34)
  // All SB squeeze combos are included via the else branch (non-BB squeezer)
])

/**
 * Build action string for squeeze vs CC 4-bet, RFI folds variant.
 *
 * When the CC 4-bet response node is known to exist in GTO Wizard, navigate past
 * the CC 4-bet to reach the squeezer's decision. Otherwise stop at CC's decision.
 */
export function squeezeVsCc4betRfiFoldsActions(squeezer, opener, coldCaller, sizes = DEFAULT_SIZES) {
  let base = squeezeActions(squeezer, opener, coldCaller, sizes)
  const squeezeSize = getSqueezeSize(squeezer, opener, coldCaller)
  base += `-R${squeezeSize}`
  for (let i = POS[squeezer] + 1; i < 6; i++) base += '-F'
  base += '-F'  // Opener folds
  const key = `${squeezer}|${opener}|${coldCaller}`
  if (squeezer !== 'BB' || CC_4BET_NODE_EXISTS.has(key)) {
    base += `-R${getColdCaller4betSize(squeezer, opener, coldCaller)}`
  }
  return base
}

/**
 * Build action string for squeeze vs CC 4-bet, RFI calls variant.
 * Same logic as above.
 */
export function squeezeVsCc4betRfiCallsActions(squeezer, opener, coldCaller, sizes = DEFAULT_SIZES) {
  let base = squeezeActions(squeezer, opener, coldCaller, sizes)
  const squeezeSize = getSqueezeSize(squeezer, opener, coldCaller)
  base += `-R${squeezeSize}`
  for (let i = POS[squeezer] + 1; i < 6; i++) base += '-F'
  base += '-C'  // Opener calls
  const key = `${squeezer}|${opener}|${coldCaller}`
  if (squeezer !== 'BB' || CC_4BET_NODE_EXISTS.has(key)) {
    base += `-R${getColdCaller4betSize(squeezer, opener, coldCaller)}`
  }
  return base
}

/**
 * Build action string for squeeze vs 4-bet (squeezer facing 4-bet from opener)
 * @param {string} squeezer - Player who squeezed
 * @param {string} opener - Original raiser who 4-bets
 * @param {string} coldCaller - Player who cold-called the open
 */
export function squeezeVs4betActions(squeezer, opener, coldCaller, sizes = DEFAULT_SIZES) {
  let base = squeezeActions(squeezer, opener, coldCaller, sizes)
  const squeezeSize = getSqueezeSize(squeezer, opener, coldCaller)
  base += `-R${squeezeSize}`

  // After squeeze, positions after squeezer fold before action goes to opener
  // e.g., BTN squeezes → SB folds, BB folds → UTG 4-bets
  for (let i = POS[squeezer] + 1; i < 6; i++) {
    base += '-F'
  }

  // Opener 4-bets
  const fourBetSize = getSqueezeFourBetSize(opener, squeezer)
  base += `-R${fourBetSize}`

  // Cold caller folds after opener 4-bets
  base += '-F'

  return base
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

  // ── Squeeze spots (hero squeezes after open + cold call) ──
  // Format: {squeezer}_vs_{opener}_{coldCaller}
  const squeezeCombos = [
    // CO squeezes
    ['CO', 'UTG', 'HJ'],
    // BTN squeezes
    ['BTN', 'UTG', 'HJ'], ['BTN', 'UTG', 'CO'], ['BTN', 'HJ', 'CO'],
    // SB squeezes
    ['SB', 'UTG', 'HJ'], ['SB', 'UTG', 'CO'], ['SB', 'UTG', 'BTN'],
    ['SB', 'HJ', 'CO'], ['SB', 'HJ', 'BTN'], ['SB', 'CO', 'BTN'],
    // BB squeezes
    ['BB', 'UTG', 'HJ'], ['BB', 'UTG', 'CO'], ['BB', 'UTG', 'BTN'], ['BB', 'UTG', 'SB'],
    ['BB', 'HJ', 'CO'], ['BB', 'HJ', 'BTN'], ['BB', 'HJ', 'SB'],
    ['BB', 'CO', 'BTN'], ['BB', 'CO', 'SB'], ['BB', 'BTN', 'SB'],
  ]

  for (const [squeezer, opener, coldCaller] of squeezeCombos) {
    spots[`${squeezer.toLowerCase()}_vs_${opener.toLowerCase()}_${coldCaller.toLowerCase()}`] = {
      description: `${squeezer} squeeze vs ${opener}+${coldCaller}`,
      actions: squeezeActions(squeezer, opener, coldCaller, sizes),
      position: squeezer,
    }
  }

  // ── vs Squeeze spots (opener facing squeeze) ──
  // Format: {opener}_vs_sqz_{coldCaller}_{squeezer}
  for (const [squeezer, opener, coldCaller] of squeezeCombos) {
    spots[`${opener.toLowerCase()}_vs_sqz_${coldCaller.toLowerCase()}_${squeezer.toLowerCase()}`] = {
      description: `${opener} vs ${coldCaller}+${squeezer} squeeze`,
      actions: vsSqueezeActions(opener, squeezer, opener, coldCaller, sizes),
      position: opener,
    }
  }

  // ── vs Squeeze spots (cold caller facing squeeze, RFI calls) ──
  // Format: {coldCaller}_vs_sqz_{opener}_{squeezer}
  for (const [squeezer, opener, coldCaller] of squeezeCombos) {
    spots[`${coldCaller.toLowerCase()}_vs_sqz_${opener.toLowerCase()}_${squeezer.toLowerCase()}`] = {
      description: `${coldCaller} (cold caller) vs ${opener}+${squeezer} squeeze (RFI calls)`,
      actions: vsSqueezeActions(coldCaller, squeezer, opener, coldCaller, sizes, true),  // rfiCalls=true
      position: coldCaller,
      coldCaller: true,
    }
  }

  // ── vs Squeeze spots (cold caller facing squeeze, RFI folds) ──
  // Format: {coldCaller}_vs_sqz_{opener}_{squeezer}_rfi_fold
  for (const [squeezer, opener, coldCaller] of squeezeCombos) {
    spots[`${coldCaller.toLowerCase()}_vs_sqz_${opener.toLowerCase()}_${squeezer.toLowerCase()}_rfi_fold`] = {
      description: `${coldCaller} (cold caller) vs ${opener}+${squeezer} squeeze (RFI folds)`,
      actions: vsSqueezeActions(coldCaller, squeezer, opener, coldCaller, sizes, false),  // rfiCalls=false
      position: coldCaller,
      coldCaller: true,
      rfiFolds: true,
    }
  }

  // ── Overcall spots (open + cold call + hero decides to overcall) ──
  // Format: {hero}_oc_{opener}_{coldCaller}
  const overcallCombos = [
    // CO overcalls
    ['CO', 'UTG', 'HJ'],
    // BTN overcalls
    ['BTN', 'UTG', 'HJ'], ['BTN', 'UTG', 'CO'], ['BTN', 'HJ', 'CO'],
    // SB overcalls
    ['SB', 'UTG', 'HJ'], ['SB', 'UTG', 'CO'], ['SB', 'UTG', 'BTN'],
    ['SB', 'HJ', 'CO'], ['SB', 'HJ', 'BTN'], ['SB', 'CO', 'BTN'],
    // BB overcalls
    ['BB', 'UTG', 'HJ'], ['BB', 'UTG', 'CO'], ['BB', 'UTG', 'BTN'], ['BB', 'UTG', 'SB'],
    ['BB', 'HJ', 'CO'], ['BB', 'HJ', 'BTN'], ['BB', 'HJ', 'SB'],
    ['BB', 'CO', 'BTN'], ['BB', 'CO', 'SB'], ['BB', 'BTN', 'SB'],
  ]

  for (const [hero, opener, coldCaller] of overcallCombos) {
    spots[`${hero.toLowerCase()}_oc_${opener.toLowerCase()}_${coldCaller.toLowerCase()}`] = {
      description: `${hero} overcall vs ${opener}+${coldCaller}`,
      actions: overcallActions(hero, opener, coldCaller, sizes),
      position: hero,
      category: 'overcall',
    }
  }

  // ── Cold call 3-bet spots (open + 3-bet + hero cold calls) ──
  // Format: {hero}_cc3b_{opener}_{threeBettor}
  const coldCall3bCombos = [
    // SB cold calls 3-bet
    ['SB', 'UTG', 'BTN'], ['SB', 'UTG', 'CO'], ['SB', 'UTG', 'HJ'],
    ['SB', 'HJ', 'BTN'], ['SB', 'HJ', 'CO'],
    ['SB', 'CO', 'BTN'],
    // BB cold calls 3-bet
    ['BB', 'UTG', 'BTN'], ['BB', 'UTG', 'CO'], ['BB', 'UTG', 'HJ'],
    ['BB', 'UTG', 'SB'],
    ['BB', 'HJ', 'BTN'], ['BB', 'HJ', 'CO'], ['BB', 'HJ', 'SB'],
    ['BB', 'CO', 'BTN'], ['BB', 'CO', 'SB'],
    ['BB', 'BTN', 'SB'],
  ]

  for (const [hero, opener, threeBettor] of coldCall3bCombos) {
    spots[`${hero.toLowerCase()}_cc3b_${opener.toLowerCase()}_${threeBettor.toLowerCase()}`] = {
      description: `${hero} cold call ${threeBettor} 3-bet vs ${opener}`,
      actions: coldCall3betActions(hero, opener, threeBettor, sizes),
      position: hero,
      category: 'cold_call_3b',
    }
  }

  // ── vs 3-bet with cold caller (opener facing 3-bet after someone cold called) ──
  // Format: {opener}_vs_3b_cc_{coldCaller}_{threeBettor}
  // This happens when: opener raises, someone calls, later position 3-bets
  const vs3bWithCallerCombos = [
    // UTG opens, gets cold called, faces 3-bet
    ['UTG', 'HJ', 'CO'], ['UTG', 'HJ', 'BTN'], ['UTG', 'HJ', 'SB'], ['UTG', 'HJ', 'BB'],
    ['UTG', 'CO', 'BTN'], ['UTG', 'CO', 'SB'], ['UTG', 'CO', 'BB'],
    ['UTG', 'BTN', 'SB'], ['UTG', 'BTN', 'BB'],
    ['UTG', 'SB', 'BB'],
    // HJ opens, gets cold called, faces 3-bet
    ['HJ', 'CO', 'BTN'], ['HJ', 'CO', 'SB'], ['HJ', 'CO', 'BB'],
    ['HJ', 'BTN', 'SB'], ['HJ', 'BTN', 'BB'],
    ['HJ', 'SB', 'BB'],
    // CO opens, gets cold called, faces 3-bet
    ['CO', 'BTN', 'SB'], ['CO', 'BTN', 'BB'],
    ['CO', 'SB', 'BB'],
    // BTN opens, gets cold called, faces 3-bet
    ['BTN', 'SB', 'BB'],
  ]

  for (const [opener, coldCaller, threeBettor] of vs3bWithCallerCombos) {
    spots[`${opener.toLowerCase()}_vs_3b_cc_${coldCaller.toLowerCase()}_${threeBettor.toLowerCase()}`] = {
      description: `${opener} vs ${threeBettor} 3-bet (${coldCaller} cold called)`,
      actions: vs3betWithCallerActions(opener, coldCaller, threeBettor, sizes),
      position: opener,
      category: 'vs_3b_with_caller',
    }
  }

  // ── Multiway overcall spots (open + 2 cold calls + hero decides) ──
  // Format: {hero}_mw_{opener}_{caller1}_{caller2}
  const multiwayOvercallCombos = [
    // BTN multiway
    ['BTN', 'UTG', 'HJ', 'CO'],
    // SB multiway
    ['SB', 'UTG', 'HJ', 'CO'], ['SB', 'UTG', 'HJ', 'BTN'], ['SB', 'UTG', 'CO', 'BTN'],
    ['SB', 'HJ', 'CO', 'BTN'],
    // BB multiway
    ['BB', 'UTG', 'HJ', 'CO'], ['BB', 'UTG', 'HJ', 'BTN'], ['BB', 'UTG', 'HJ', 'SB'],
    ['BB', 'UTG', 'CO', 'BTN'], ['BB', 'UTG', 'CO', 'SB'], ['BB', 'UTG', 'BTN', 'SB'],
    ['BB', 'HJ', 'CO', 'BTN'], ['BB', 'HJ', 'CO', 'SB'], ['BB', 'HJ', 'BTN', 'SB'],
    ['BB', 'CO', 'BTN', 'SB'],
  ]

  for (const [hero, opener, caller1, caller2] of multiwayOvercallCombos) {
    spots[`${hero.toLowerCase()}_mw_${opener.toLowerCase()}_${caller1.toLowerCase()}_${caller2.toLowerCase()}`] = {
      description: `${hero} multiway vs ${opener}+${caller1}+${caller2}`,
      actions: multiwayOvercallActions(hero, opener, caller1, caller2, sizes),
      position: hero,
      category: 'multiway',
    }
  }

  // ── Squeeze vs 4-bet ──
  // {s}_sqz_vs_{o}_4b_{cc}_fold  = opener 4-bets, CC folds
  // {s}_sqz_vs_{o}_fold_{cc}_4b  = opener folds, CC 4-bets
  // {s}_sqz_vs_{o}_call_{cc}_4b  = opener calls, CC 4-bets
  for (const [squeezer, opener, coldCaller] of squeezeCombos) {
    const s = squeezer.toLowerCase(), o = opener.toLowerCase(), cc = coldCaller.toLowerCase()
    spots[`${s}_sqz_vs_${o}_4b_${cc}_fold`] = {
      description: `${squeezer} squeeze vs ${opener} 4-bet (${coldCaller} folds)`,
      actions: squeezeVs4betActions(squeezer, opener, coldCaller, sizes),
      position: squeezer,
      category: 'squeeze_vs_4b',
    }
    spots[`${s}_sqz_vs_${o}_fold_${cc}_4b`] = {
      description: `${squeezer} squeeze vs ${coldCaller} CC 4-bet (${opener} folds)`,
      actions: squeezeVsCc4betRfiFoldsActions(squeezer, opener, coldCaller, sizes),
      position: squeezer,
      category: 'squeeze_vs_4b',
    }
    spots[`${s}_sqz_vs_${o}_call_${cc}_4b`] = {
      description: `${squeezer} squeeze vs ${coldCaller} CC 4-bet (${opener} calls)`,
      actions: squeezeVsCc4betRfiCallsActions(squeezer, opener, coldCaller, sizes),
      position: squeezer,
      category: 'squeeze_vs_4b',
    }
  }

  return spots
}

export { POS, POS_NAMES, DEFAULT_SIZES }
