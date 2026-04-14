// ── Scenario Path Generator ───────────────────────────────────────────────────
//
// Maps each scenario id to a path through the gtobase game tree.
//
// Preflop action order (6-max): UTG(0) → HJ(1) → CO(2) → BTN(3) → SB(4) → BB(5)
//
// Path format: array of 'f'/'c'/'r' steps from the root (stack-depth q-string)
// to the decision point.  The scraper navigates to that point and then
// automatically captures all non-Fold actions exactly as gtobase provides them.
// ─────────────────────────────────────────────────────────────────────────────

const POS = { UTG: 0, HJ: 1, CO: 2, BTN: 3, SB: 4, BB: 5 }

// ── Path helpers ──────────────────────────────────────────────────────────────

/** All positions before `opener` fold, then we're at opener's decision. */
function rfiPath(opener) {
  return Array(POS[opener]).fill('f')
}

function vs3bPath(opener, threeBettor) {
  const oi = POS[opener]
  const ti = POS[threeBettor]
  const path = []
  for (let i = 0; i < oi; i++) path.push('f')
  path.push('r')
  for (let i = oi + 1; i < ti; i++) path.push('f')
  path.push('r')
  for (let i = ti + 1; i < 6; i++) path.push('f')
  return path
}

function vs4bPath(threeBettor, opener) {
  return [...vs3bPath(opener, threeBettor), 'r']
}

function vs5bPath(opener, threeBettor) {
  return [...vs4bPath(threeBettor, opener), 'r']
}

function sqzPath(squeezer, opener, coldCaller) {
  const oi = POS[opener]
  const ci = POS[coldCaller]
  const si = POS[squeezer]
  const path = []
  for (let i = 0; i < oi; i++) path.push('f')
  path.push('r')
  for (let i = oi + 1; i < ci; i++) path.push('f')
  path.push('c')
  for (let i = ci + 1; i < si; i++) path.push('f')
  return path
}

function vsSquzPath(opener, squeezer, coldCaller) {
  const si = POS[squeezer]
  const path = sqzPath(squeezer, opener, coldCaller)
  path.push('r')
  for (let i = si + 1; i < 6; i++) path.push('f')
  return path
}

function vsSqzColdCallerPath(opener, squeezer, coldCaller, openerAction) {
  return [...vsSquzPath(opener, squeezer, coldCaller), openerAction]
}

function sqzVs4bPath(squeezer, opener, coldCaller, type) {
  const si = POS[squeezer]
  const path = sqzPath(squeezer, opener, coldCaller)
  path.push('r')
  for (let i = si + 1; i < 6; i++) path.push('f')

  if (type === 'rfi4b') {
    path.push('r')   // opener 4-bets
    path.push('f')   // cold caller folds
  } else if (type === 'ccFold') {
    path.push('f')   // opener folds
    path.push('r')   // cold caller 4-bets
  } else if (type === 'ccCall') {
    path.push('c')   // opener calls
    path.push('r')   // cold caller 4-bets
  }
  return path
}

// ── Scenario Map ──────────────────────────────────────────────────────────────
//
// Each entry: { path }
//   path – steps from root to the decision point
//
// At the decision point the scraper automatically captures every non-Fold
// action (all raises + the call/limp) exactly as gtobase provides them.
// ─────────────────────────────────────────────────────────────────────────────

const SCENARIO_PATHS = {}

function add(id, pathOrSpec) {
  SCENARIO_PATHS[id] = Array.isArray(pathOrSpec) ? { path: pathOrSpec } : pathOrSpec
}

// ── RFI ──────────────────────────────────────────────────────────────────────
add('rfi_utg', rfiPath('UTG'))
add('rfi_hj',  rfiPath('HJ'))
add('rfi_co',  rfiPath('CO'))
add('rfi_btn', rfiPath('BTN'))
add('rfi_sb',  rfiPath('SB'))

// ── vs RFI ────────────────────────────────────────────────────────────────────
for (const [openerPos, callerPos] of [
  ['UTG', 'BB'], ['UTG', 'SB'], ['UTG', 'BTN'], ['UTG', 'CO'], ['UTG', 'HJ'],
  ['HJ',  'BB'], ['HJ',  'SB'], ['HJ',  'BTN'], ['HJ',  'CO'],
  ['CO',  'BB'], ['CO',  'SB'], ['CO',  'BTN'],
  ['BTN', 'BB'], ['BTN', 'SB'],
  ['SB',  'BB'],
]) {
  const oi = POS[openerPos]
  const ci = POS[callerPos]
  const path = []
  for (let i = 0; i < oi; i++) path.push('f')
  path.push('r')
  for (let i = oi + 1; i < ci; i++) path.push('f')
  add(`${callerPos.toLowerCase()}_vs_${openerPos.toLowerCase()}`, path)
}
add('sb_vs_bb', ['f', 'f', 'f', 'f', 'r'])

// ── vs 3-bet ──────────────────────────────────────────────────────────────────
const VS3B = [
  ['utg', 'UTG', 'hj',  'HJ'],  ['utg', 'UTG', 'co',  'CO'],
  ['utg', 'UTG', 'btn', 'BTN'], ['utg', 'UTG', 'sb',  'SB'],
  ['utg', 'UTG', 'bb',  'BB'],
  ['hj',  'HJ',  'co',  'CO'],  ['hj',  'HJ',  'btn', 'BTN'],
  ['hj',  'HJ',  'sb',  'SB'],  ['hj',  'HJ',  'bb',  'BB'],
  ['co',  'CO',  'btn', 'BTN'], ['co',  'CO',  'sb',  'SB'],
  ['co',  'CO',  'bb',  'BB'],
  ['btn', 'BTN', 'sb',  'SB'],  ['btn', 'BTN', 'bb',  'BB'],
  ['sb',  'SB',  'bb',  'BB'],
  // bb_vs_3b_sb omitted: when all 5 positions fold to BB, gtobase has no
  // action node (BB wins the blinds automatically).
]
for (const [op, OP, tb, TB] of VS3B) {
  add(`${op}_vs_3b_${tb}`, vs3bPath(OP, TB))
}

// ── vs 4-bet ──────────────────────────────────────────────────────────────────
const VS4B = [
  ['bb',  'BB',  'utg', 'UTG'], ['bb',  'BB',  'hj',  'HJ'],
  ['bb',  'BB',  'co',  'CO'],  ['bb',  'BB',  'btn', 'BTN'],
  ['bb',  'BB',  'sb',  'SB'],
  ['sb',  'SB',  'utg', 'UTG'], ['sb',  'SB',  'hj',  'HJ'],
  ['sb',  'SB',  'co',  'CO'],  ['sb',  'SB',  'btn', 'BTN'],
  ['btn', 'BTN', 'utg', 'UTG'], ['btn', 'BTN', 'hj',  'HJ'],
  ['btn', 'BTN', 'co',  'CO'],
  ['co',  'CO',  'utg', 'UTG'], ['co',  'CO',  'hj',  'HJ'],
  ['hj',  'HJ',  'utg', 'UTG'],
]
for (const [tb, TB, op, OP] of VS4B) {
  add(`${tb}_vs_4b_${op}`, vs4bPath(TB, OP))
}
add('sb_vs_4b_bb', ['f','f','f','r','r','r','f'])
for (const [tb, TB, op, OP] of VS4B) {
  add(`${tb}_vs_4b_allin_${op}`, vs4bPath(TB, OP))
}

// ── vs 5-bet ──────────────────────────────────────────────────────────────────
const VS5B = [
  ['utg', 'UTG', 'bb',  'BB'],  ['utg', 'UTG', 'sb',  'SB'],
  ['utg', 'UTG', 'btn', 'BTN'], ['utg', 'UTG', 'co',  'CO'],
  ['utg', 'UTG', 'hj',  'HJ'],
  ['hj',  'HJ',  'bb',  'BB'],  ['hj',  'HJ',  'sb',  'SB'],
  ['hj',  'HJ',  'btn', 'BTN'], ['hj',  'HJ',  'co',  'CO'],
  ['co',  'CO',  'bb',  'BB'],  ['co',  'CO',  'sb',  'SB'],
  ['co',  'CO',  'btn', 'BTN'],
  ['btn', 'BTN', 'bb',  'BB'],  ['btn', 'BTN', 'sb',  'SB'],
  ['sb',  'SB',  'bb',  'BB'],
]
for (const [op, OP, tb, TB] of VS5B) {
  add(`${op}_vs_5b_${tb}`, vs5bPath(OP, TB))
}
add('bb_vs_5b_sb', ['f','f','f','r','r','r','f','r'])

// ── sqz (squeezer) ────────────────────────────────────────────────────────────
const SQZ_SPECS = [
  ['co',  'CO',  'utg', 'UTG', 'hj',  'HJ'],
  ['btn', 'BTN', 'utg', 'UTG', 'hj',  'HJ'],
  ['btn', 'BTN', 'utg', 'UTG', 'co',  'CO'],
  ['btn', 'BTN', 'hj',  'HJ',  'co',  'CO'],
  ['sb',  'SB',  'utg', 'UTG', 'hj',  'HJ'],
  ['sb',  'SB',  'utg', 'UTG', 'co',  'CO'],
  ['sb',  'SB',  'utg', 'UTG', 'btn', 'BTN'],
  ['sb',  'SB',  'hj',  'HJ',  'co',  'CO'],
  ['sb',  'SB',  'hj',  'HJ',  'btn', 'BTN'],
  ['sb',  'SB',  'co',  'CO',  'btn', 'BTN'],
  ['bb',  'BB',  'utg', 'UTG', 'hj',  'HJ'],
  ['bb',  'BB',  'utg', 'UTG', 'co',  'CO'],
  ['bb',  'BB',  'utg', 'UTG', 'btn', 'BTN'],
  ['bb',  'BB',  'utg', 'UTG', 'sb',  'SB'],
  ['bb',  'BB',  'hj',  'HJ',  'co',  'CO'],
  ['bb',  'BB',  'hj',  'HJ',  'btn', 'BTN'],
  ['bb',  'BB',  'hj',  'HJ',  'sb',  'SB'],
  ['bb',  'BB',  'co',  'CO',  'btn', 'BTN'],
  ['bb',  'BB',  'co',  'CO',  'sb',  'SB'],
  ['bb',  'BB',  'btn', 'BTN', 'sb',  'SB'],
]
for (const [sq, SQ, op, OP, cc, CC] of SQZ_SPECS) {
  add(`${sq}_vs_${op}_${cc}`, sqzPath(SQ, OP, CC))
}

// ── vs sqz — original raiser ──────────────────────────────────────────────────
const VSSQZ_SPECS = [
  ['utg', 'UTG', 'hj',  'HJ',  'co',  'CO'],
  ['utg', 'UTG', 'hj',  'HJ',  'btn', 'BTN'],
  ['utg', 'UTG', 'hj',  'HJ',  'sb',  'SB'],
  ['utg', 'UTG', 'hj',  'HJ',  'bb',  'BB'],
  ['utg', 'UTG', 'co',  'CO',  'btn', 'BTN'],
  ['utg', 'UTG', 'co',  'CO',  'sb',  'SB'],
  ['utg', 'UTG', 'co',  'CO',  'bb',  'BB'],
  ['utg', 'UTG', 'btn', 'BTN', 'sb',  'SB'],
  ['utg', 'UTG', 'btn', 'BTN', 'bb',  'BB'],
  ['utg', 'UTG', 'sb',  'SB',  'bb',  'BB'],
  ['hj',  'HJ',  'co',  'CO',  'btn', 'BTN'],
  ['hj',  'HJ',  'co',  'CO',  'sb',  'SB'],
  ['hj',  'HJ',  'co',  'CO',  'bb',  'BB'],
  ['hj',  'HJ',  'btn', 'BTN', 'sb',  'SB'],
  ['hj',  'HJ',  'btn', 'BTN', 'bb',  'BB'],
  ['hj',  'HJ',  'sb',  'SB',  'bb',  'BB'],
  ['co',  'CO',  'btn', 'BTN', 'sb',  'SB'],
  ['co',  'CO',  'btn', 'BTN', 'bb',  'BB'],
  ['co',  'CO',  'sb',  'SB',  'bb',  'BB'],
  ['btn', 'BTN', 'sb',  'SB',  'bb',  'BB'],
]
for (const [op, OP, cc, CC, sq, SQ] of VSSQZ_SPECS) {
  add(`${op}_vs_sqz_${cc}_${sq}`, vsSquzPath(OP, SQ, CC))
}

// ── vs sqz — cold caller ──────────────────────────────────────────────────────
const VSSQZ_CC_SPECS = [
  ['hj',  'HJ',  'utg', 'UTG', 'co',  'CO'],
  ['hj',  'HJ',  'utg', 'UTG', 'btn', 'BTN'],
  ['hj',  'HJ',  'utg', 'UTG', 'sb',  'SB'],
  ['hj',  'HJ',  'utg', 'UTG', 'bb',  'BB'],
  ['co',  'CO',  'utg', 'UTG', 'btn', 'BTN'],
  ['co',  'CO',  'utg', 'UTG', 'sb',  'SB'],
  ['co',  'CO',  'utg', 'UTG', 'bb',  'BB'],
  ['co',  'CO',  'hj',  'HJ',  'btn', 'BTN'],
  ['co',  'CO',  'hj',  'HJ',  'sb',  'SB'],
  ['co',  'CO',  'hj',  'HJ',  'bb',  'BB'],
  ['btn', 'BTN', 'utg', 'UTG', 'sb',  'SB'],
  ['btn', 'BTN', 'utg', 'UTG', 'bb',  'BB'],
  ['btn', 'BTN', 'hj',  'HJ',  'sb',  'SB'],
  ['btn', 'BTN', 'hj',  'HJ',  'bb',  'BB'],
  ['btn', 'BTN', 'co',  'CO',  'sb',  'SB'],
  ['btn', 'BTN', 'co',  'CO',  'bb',  'BB'],
  ['sb',  'SB',  'utg', 'UTG', 'bb',  'BB'],
  ['sb',  'SB',  'hj',  'HJ',  'bb',  'BB'],
  ['sb',  'SB',  'co',  'CO',  'bb',  'BB'],
  ['sb',  'SB',  'btn', 'BTN', 'bb',  'BB'],
]
for (const [cc, CC, op, OP, sq, SQ] of VSSQZ_CC_SPECS) {
  add(`${cc}_vs_sqz_${op}_${sq}`,          vsSqzColdCallerPath(OP, SQ, CC, 'c'))
  add(`${cc}_vs_sqz_${op}_${sq}_rfi_fold`, vsSqzColdCallerPath(OP, SQ, CC, 'f'))
}

// ── sqz vs 4b ─────────────────────────────────────────────────────────────────
const SQZ_VS4B_SPECS = [
  ['co',  'CO',  'utg', 'UTG', 'hj',  'HJ'],
  ['btn', 'BTN', 'utg', 'UTG', 'hj',  'HJ'],
  ['btn', 'BTN', 'utg', 'UTG', 'co',  'CO'],
  ['btn', 'BTN', 'hj',  'HJ',  'co',  'CO'],
  ['sb',  'SB',  'utg', 'UTG', 'hj',  'HJ'],
  ['sb',  'SB',  'utg', 'UTG', 'co',  'CO'],
  ['sb',  'SB',  'utg', 'UTG', 'btn', 'BTN'],
  ['sb',  'SB',  'hj',  'HJ',  'co',  'CO'],
  ['sb',  'SB',  'hj',  'HJ',  'btn', 'BTN'],
  ['sb',  'SB',  'co',  'CO',  'btn', 'BTN'],
  ['bb',  'BB',  'utg', 'UTG', 'hj',  'HJ'],
  ['bb',  'BB',  'utg', 'UTG', 'co',  'CO'],
  ['bb',  'BB',  'utg', 'UTG', 'btn', 'BTN'],
  ['bb',  'BB',  'utg', 'UTG', 'sb',  'SB'],
  ['bb',  'BB',  'hj',  'HJ',  'co',  'CO'],
  ['bb',  'BB',  'hj',  'HJ',  'btn', 'BTN'],
  ['bb',  'BB',  'hj',  'HJ',  'sb',  'SB'],
  ['bb',  'BB',  'co',  'CO',  'btn', 'BTN'],
  ['bb',  'BB',  'co',  'CO',  'sb',  'SB'],
  ['bb',  'BB',  'btn', 'BTN', 'sb',  'SB'],
]
for (const [sq, SQ, op, OP, cc, CC] of SQZ_VS4B_SPECS) {
  add(`${sq}_sqz_${op}_${cc}`, {
    variants: {
      rfi_4b:  sqzVs4bPath(SQ, OP, CC, 'rfi4b'),
      cc_fold: sqzVs4bPath(SQ, OP, CC, 'ccFold'),
      cc_call: sqzVs4bPath(SQ, OP, CC, 'ccCall'),
    }
  })
}

// ── vs limp ───────────────────────────────────────────────────────────────────
// gtobase only models the SB limp — all other positions have no limp action.
add('bb_vs_limp_sb', ['f', 'f', 'f', 'f', 'c'])

export default SCENARIO_PATHS
