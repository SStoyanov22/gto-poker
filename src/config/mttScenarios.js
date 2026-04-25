// ── MTT 8-max scenarios ───────────────────────────────────────────────────
//
// 8 positions: UTG, UTG1, LJ, HJ, CO, BTN, SB, BB
// 63 scenarios per stack: 7 RFI + 28 vs-RFI + 28 vs-3B
// Data lives at scraper/gtowizard-mtt/out/<stack>bb/{rfi|vs_rfi/<opener>|vs_3b/<opener>}/<id>.json
// ─────────────────────────────────────────────────────────────────────────────

const POSITIONS = ['UTG', 'UTG1', 'LJ', 'HJ', 'CO', 'BTN', 'SB', 'BB']
const POS_LABEL = { UTG: 'UTG', UTG1: 'UTG+1', LJ: 'LJ', HJ: 'HJ', CO: 'CO', BTN: 'BTN', SB: 'SB', BB: 'BB' }

const scenarios = []

// RFI: every position except BB can open
for (const pos of POSITIONS) {
  if (pos === 'BB') continue
  const callLabel = pos === 'SB' ? 'Limp' : undefined
  scenarios.push({
    id: `rfi_${pos.toLowerCase()}`,
    label: POS_LABEL[pos],
    group: 'RFI',
    section: 'RFI',
    ...(callLabel ? { callLabel } : {}),
  })
}

// vs RFI: every later position defends every earlier opener
for (let oi = 0; oi < POSITIONS.length; oi++) {
  const opener = POSITIONS[oi]
  if (opener === 'BB') continue
  for (let di = oi + 1; di < POSITIONS.length; di++) {
    const defender = POSITIONS[di]
    scenarios.push({
      id: `${defender.toLowerCase()}_vs_${opener.toLowerCase()}`,
      label: `vs ${POS_LABEL[opener]}`,
      group: defender,
      section: 'vs RFI',
    })
  }
}

// vs 3B: every opener faces 3-bet from every later position
for (let oi = 0; oi < POSITIONS.length; oi++) {
  const opener = POSITIONS[oi]
  if (opener === 'BB') continue
  for (let ti = oi + 1; ti < POSITIONS.length; ti++) {
    const threeBettor = POSITIONS[ti]
    scenarios.push({
      id: `${opener.toLowerCase()}_vs_3b_${threeBettor.toLowerCase()}`,
      label: `vs ${POS_LABEL[threeBettor]} 3b`,
      group: opener,
      section: 'vs 3b',
    })
  }
}

export default scenarios
