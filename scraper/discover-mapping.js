#!/usr/bin/env node
// Empirically discover GTOWizard's hand-to-index mapping
// by analyzing known spots where specific hands should have specific behaviors

import { readFileSync } from 'fs'

// Load multiple files to triangulate hand mappings
const files = {
  btn_rfi: JSON.parse(readFileSync('./scraper/gtowizard/out/nl100/100bb/rfi_btn.json', 'utf-8')),
  utg_rfi: JSON.parse(readFileSync('./scraper/gtowizard/out/nl100/100bb/rfi_utg.json', 'utf-8')),
  utg_vs_5b: JSON.parse(readFileSync('./scraper/gtowizard/out/nl100/100bb/utg_vs_5b_bb.json', 'utf-8')),
}

// Extract strategies
function getStrategy(data, actionType) {
  const sol = data.raw.action_solutions.find(s => s.action.type === actionType)
  return sol?.strategy || []
}

const btnRaiseStrategy = getStrategy(files.btn_rfi, 'RAISE')
const utgRaiseStrategy = getStrategy(files.utg_rfi, 'RAISE')
const utg5bFoldStrategy = getStrategy(files.utg_vs_5b, 'FOLD')
const utg5bCallStrategy = getStrategy(files.utg_vs_5b, 'CALL')

console.log('=== Discovering Hand-to-Index Mapping ===\n')

// For each index, calculate a "premium score" based on behaviors
// Higher score = more likely to be a premium hand
const scores = []
for (let i = 0; i < 169; i++) {
  const btnRaise = btnRaiseStrategy[i] || 0
  const utgRaise = utgRaiseStrategy[i] || 0
  const utg5bContinue = 1 - (utg5bFoldStrategy[i] || 0)  // continue = not fold

  // Premium hands should:
  // - Raise from BTN (but so do many hands)
  // - Raise from UTG (only premiums)
  // - Continue vs 5b (only AA, maybe KK)

  // Weight UTG and vs5b more heavily since they're more discriminating
  const score = btnRaise + utgRaise * 2 + utg5bContinue * 5

  scores.push({
    idx: i,
    btnRaise,
    utgRaise,
    utg5bContinue,
    score
  })
}

// Sort by score descending
scores.sort((a, b) => b.score - a.score)

console.log('Top 20 indices by premium score (most likely to be AA, KK, etc):')
for (let i = 0; i < 20; i++) {
  const s = scores[i]
  console.log(`  idx ${s.idx.toString().padStart(3)}: BTN=${s.btnRaise.toFixed(2)} UTG=${s.utgRaise.toFixed(2)} vs5b=${s.utg5bContinue.toFixed(2)} score=${s.score.toFixed(2)}`)
}

// Find specific behavior patterns
console.log('\n\nLooking for specific hand patterns:')

// AA: should be ~100% on all spots
console.log('\nPotential AA indices (high everywhere):')
for (let i = 0; i < 169; i++) {
  if (btnRaiseStrategy[i] > 0.95 && utgRaiseStrategy[i] > 0.9 && utg5bCallStrategy[i] > 0.4) {
    const utg5bFold = utg5bFoldStrategy[i] || 0
    console.log(`  idx ${i}: BTN=${btnRaiseStrategy[i].toFixed(2)} UTG=${utgRaiseStrategy[i].toFixed(2)} vs5b_call=${utg5bCallStrategy[i].toFixed(2)} vs5b_fold=${utg5bFold.toFixed(2)}`)
  }
}

// 22: should be mixed on BTN (~0.5), low on UTG, fold vs 5b
console.log('\nPotential 22 indices (mixed BTN, low UTG, fold vs5b):')
for (let i = 0; i < 169; i++) {
  if (btnRaiseStrategy[i] > 0.4 && btnRaiseStrategy[i] < 0.7 &&
      utgRaiseStrategy[i] < 0.3 &&
      utg5bFoldStrategy[i] > 0.8) {
    console.log(`  idx ${i}: BTN=${btnRaiseStrategy[i].toFixed(2)} UTG=${utgRaiseStrategy[i].toFixed(2)} vs5b_fold=${utg5bFoldStrategy[i].toFixed(2)}`)
  }
}

// Look at pairs specifically - they should all have idx % 14 === 0 if our diagonal theory is correct
console.log('\n\nChecking our diagonal theory (idx % 14 === 0 should be pairs):')
for (let i = 0; i < 13; i++) {
  const idx = i * 14
  const btnVal = btnRaiseStrategy[idx] || 0
  const utgVal = utgRaiseStrategy[idx] || 0
  const vs5bContinue = 1 - (utg5bFoldStrategy[idx] || 0)
  console.log(`  idx ${idx.toString().padStart(3)}: BTN=${btnVal.toFixed(2)} UTG=${utgVal.toFixed(2)} vs5b_cont=${vs5bContinue.toFixed(2)}`)
}

// Check the 2-low row-major mapping against expected hands
console.log('\n\n=== Verifying Current Mapping ===')
const RANKS = ['2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A']
function getHandName(idx) {
  const row = Math.floor(idx / 13)
  const col = idx % 13
  if (row === col) return RANKS[row] + RANKS[row]
  if (row < col) return RANKS[col] + RANKS[row] + 's'
  return RANKS[row] + RANKS[col] + 'o'
}

console.log('Problematic hands with 1.0 raise freq in UTG RFI (should be premium only):')
for (let i = 0; i < 169; i++) {
  if (utgRaiseStrategy[i] === 1) {
    console.log(`  idx ${i.toString().padStart(3)} -> ${getHandName(i).padEnd(4)}: UTG=1.00`)
  }
}

// Test if columns are simply reversed (A=0 instead of A=12)
console.log('\n\n=== Testing Column-Reversed Mapping ===')
function getHandNameColReversed(idx) {
  const row = Math.floor(idx / 13)
  const col = 12 - (idx % 13)  // Reverse column
  if (row === col) return RANKS[row] + RANKS[row]
  if (row < col) return RANKS[col] + RANKS[row] + 's'
  return RANKS[row] + RANKS[col] + 'o'
}

console.log('Hands with UTG=1.0 using column-reversed mapping:')
for (let i = 0; i < 169; i++) {
  if (utgRaiseStrategy[i] === 1) {
    console.log(`  idx ${i.toString().padStart(3)} -> ${getHandNameColReversed(i).padEnd(4)}`)
  }
}

// Check what the premium indices map to with different orderings
console.log('\n\n=== Premium Indices with Different Mappings ===')
const premiumIndices = [48, 63, 84, 126, 168, 105, 80, 83, 35, 149]
console.log('idx | current | col-rev | row-rev | both-rev')
for (const idx of premiumIndices) {
  const row = Math.floor(idx / 13)
  const col = idx % 13

  // Current mapping
  const current = getHandName(idx)

  // Column reversed
  const colRev = getHandNameColReversed(idx)

  // Row reversed (swap row indexing)
  const rowRevRow = 12 - row
  const rowRevCol = col
  let rowRev
  if (rowRevRow === rowRevCol) rowRev = RANKS[rowRevRow] + RANKS[rowRevRow]
  else if (rowRevRow < rowRevCol) rowRev = RANKS[rowRevCol] + RANKS[rowRevRow] + 's'
  else rowRev = RANKS[rowRevRow] + RANKS[rowRevCol] + 'o'

  // Both reversed
  const bothRow = 12 - row
  const bothCol = 12 - col
  let both
  if (bothRow === bothCol) both = RANKS[bothRow] + RANKS[bothRow]
  else if (bothRow < bothCol) both = RANKS[bothCol] + RANKS[bothRow] + 's'
  else both = RANKS[bothRow] + RANKS[bothCol] + 'o'

  console.log(`${idx.toString().padStart(3)} | ${current.padEnd(7)} | ${colRev.padEnd(7)} | ${rowRev.padEnd(8)} | ${both}`)
}

// Check anti-diagonal pattern: pairs at row + col = 12
console.log('\n\n=== Testing Anti-Diagonal for Pairs (row + col = 12) ===')
console.log('These indices should be pairs if columns are reversed:')
for (let row = 0; row < 13; row++) {
  const col = 12 - row
  const idx = row * 13 + col
  const rank = RANKS[row]
  const expectedPair = rank + rank
  const btnVal = btnRaiseStrategy[idx] || 0
  const utgVal = utgRaiseStrategy[idx] || 0
  const vs5bCont = 1 - (utg5bFoldStrategy[idx] || 0)
  console.log(`  row=${row.toString().padStart(2)} col=${col.toString().padStart(2)} idx=${idx.toString().padStart(3)} -> ${expectedPair}: BTN=${btnVal.toFixed(2)} UTG=${utgVal.toFixed(2)} vs5b=${vs5bCont.toFixed(2)}`)
}

// Compare with standard diagonal
console.log('\n=== Standard Diagonal (row = col) ===')
for (let i = 0; i < 13; i++) {
  const idx = i * 14
  const rank = RANKS[i]
  const expectedPair = rank + rank
  const btnVal = btnRaiseStrategy[idx] || 0
  const utgVal = utgRaiseStrategy[idx] || 0
  const vs5bCont = 1 - (utg5bFoldStrategy[idx] || 0)
  console.log(`  row=${i.toString().padStart(2)} col=${i.toString().padStart(2)} idx=${idx.toString().padStart(3)} -> ${expectedPair}: BTN=${btnVal.toFixed(2)} UTG=${utgVal.toFixed(2)} vs5b=${vs5bCont.toFixed(2)}`)
}

// Try finding the correct pair positions empirically
console.log('\n=== Empirical Pair Detection ===')
console.log('Finding indices that match pair behavior for each rank:')
const expectedPairBehavior = {
  '22': { btnMin: 0.4, btnMax: 0.7, utgMax: 0.1 },  // mixed BTN, fold UTG
  '33': { btnMin: 0.5, btnMax: 0.8, utgMax: 0.3 },  // mixed BTN, low UTG
  '44': { btnMin: 0.9, btnMax: 1.0, utgMin: 0.0, utgMax: 0.3 },  // high BTN, low UTG
  '55': { btnMin: 0.9, btnMax: 1.0, utgMin: 0.0, utgMax: 0.5 },
  '66': { btnMin: 0.9, btnMax: 1.0, utgMin: 0.3, utgMax: 0.8 },
  '77': { btnMin: 0.9, btnMax: 1.0, utgMin: 0.6, utgMax: 1.0 },
  '88': { btnMin: 0.9, btnMax: 1.0, utgMin: 0.8, utgMax: 1.0, vs5bMin: 0.5 },
  '99': { btnMin: 0.9, btnMax: 1.0, utgMin: 0.9, utgMax: 1.0, vs5bMin: 0.3 },
  'TT': { btnMin: 0.9, btnMax: 1.0, utgMin: 0.9, utgMax: 1.0, vs5bMin: 0.5 },
  'JJ': { btnMin: 0.9, btnMax: 1.0, utgMin: 0.9, utgMax: 1.0, vs5bMin: 0.8 },
  'QQ': { btnMin: 0.9, btnMax: 1.0, utgMin: 0.9, utgMax: 1.0, vs5bMin: 0.9 },
  'KK': { btnMin: 0.9, btnMax: 1.0, utgMin: 0.9, utgMax: 1.0, vs5bMin: 0.95 },
  'AA': { btnMin: 0.9, btnMax: 1.0, utgMin: 0.9, utgMax: 1.0, vs5bMin: 0.99 },
}

for (const [pair, expected] of Object.entries(expectedPairBehavior)) {
  const matches = []
  for (let idx = 0; idx < 169; idx++) {
    const btn = btnRaiseStrategy[idx] || 0
    const utg = utgRaiseStrategy[idx] || 0
    const vs5b = 1 - (utg5bFoldStrategy[idx] || 0)

    let match = true
    if (expected.btnMin !== undefined && btn < expected.btnMin) match = false
    if (expected.btnMax !== undefined && btn > expected.btnMax) match = false
    if (expected.utgMin !== undefined && utg < expected.utgMin) match = false
    if (expected.utgMax !== undefined && utg > expected.utgMax) match = false
    if (expected.vs5bMin !== undefined && vs5b < expected.vs5bMin) match = false

    if (match) matches.push(idx)
  }
  if (matches.length > 0 && matches.length < 10) {
    console.log(`  ${pair}: potential indices = ${matches.join(', ')}`)
  } else if (matches.length >= 10) {
    console.log(`  ${pair}: too many matches (${matches.length})`)
  } else {
    console.log(`  ${pair}: NO MATCHES`)
  }
}
