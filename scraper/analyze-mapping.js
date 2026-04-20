#!/usr/bin/env node
// Diagnostic script to analyze GTOWizard hand mapping

import { readFileSync } from 'fs'

const data = JSON.parse(readFileSync('./scraper/gtowizard/out/nl100/100bb/rfi_btn.json', 'utf-8'))

// Find the R2.5 raise action
const raiseAction = data.raw.action_solutions.find(s => s.action.code === 'R2.5')
const strategy = raiseAction.strategy

console.log('=== BTN RFI R2.5 RAISE Strategy Analysis ===\n')

// Current mapping: RANKS 2-low
const RANKS_2LOW = ['2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A']

// Alternative: RANKS A-high
const RANKS_AHIGH = ['A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6', '5', '4', '3', '2']

function buildHandTypes(ranks, invertSuitedness = false, columnMajor = false) {
  const handTypes = []
  for (let i = 0; i < 13; i++) {
    for (let j = 0; j < 13; j++) {
      const row = columnMajor ? j : i
      const col = columnMajor ? i : j
      if (row === col) {
        handTypes.push(ranks[row] + ranks[row]) // pair
      } else if ((row < col) !== invertSuitedness) {
        // suited: higher card first
        const high = ranks[Math.max(row, col)]
        const low = ranks[Math.min(row, col)]
        handTypes.push(high + low + 's')
      } else {
        // offsuit: higher card first
        const high = ranks[Math.max(row, col)]
        const low = ranks[Math.min(row, col)]
        handTypes.push(high + low + 'o')
      }
    }
  }
  return handTypes
}

// Test different mappings
const mappings = [
  { name: '2-low, row<col=suited, row-major', hands: buildHandTypes(RANKS_2LOW, false, false) },
  { name: '2-low, row<col=offsuit, row-major', hands: buildHandTypes(RANKS_2LOW, true, false) },
  { name: 'A-high, row<col=suited, row-major', hands: buildHandTypes(RANKS_AHIGH, false, false) },
  { name: 'A-high, row<col=offsuit, row-major', hands: buildHandTypes(RANKS_AHIGH, true, false) },
  { name: '2-low, row<col=suited, col-major', hands: buildHandTypes(RANKS_2LOW, false, true) },
  { name: '2-low, row<col=offsuit, col-major', hands: buildHandTypes(RANKS_2LOW, true, true) },
  { name: 'A-high, row<col=suited, col-major', hands: buildHandTypes(RANKS_AHIGH, false, true) },
  { name: 'A-high, row<col=offsuit, col-major', hands: buildHandTypes(RANKS_AHIGH, true, true) },
]

// Expected hands for BTN RFI (all 100% raise)
const expected100 = ['AA', 'KK', 'QQ', 'JJ', 'TT', '99', '88', '77', 'AKs', 'AKo', 'AQs', 'AQo', 'AJs', 'KQs', 'KQo']
// Expected mixed frequency (0.3-0.8)
const expectedMixed = ['22', '33', 'A5s', 'A4s']
// Expected 0% (trash)
const expected0 = ['72o', '83o', '94o', '52o', '32o', '42o']

console.log('Strategy array first 30 values:')
for (let i = 0; i < 30; i++) {
  console.log(`  idx ${i.toString().padStart(3)}: ${strategy[i]}`)
}

console.log('\n--- Testing each mapping ---\n')

for (const mapping of mappings) {
  console.log(`\n=== ${mapping.name} ===`)

  let score = 0

  // Check expected 100% hands
  console.log('\nExpected 100% hands:')
  for (const hand of expected100) {
    const idx = mapping.hands.indexOf(hand)
    const val = strategy[idx] ?? 0
    const ok = val > 0.9
    if (ok) score++
    console.log(`  ${hand.padEnd(4)} idx=${idx.toString().padStart(3)} val=${val.toFixed(4)} ${ok ? '✓' : '✗'}`)
  }

  // Check expected mixed hands
  console.log('\nExpected mixed (0.3-0.8) hands:')
  for (const hand of expectedMixed) {
    const idx = mapping.hands.indexOf(hand)
    const val = strategy[idx] ?? 0
    const ok = val > 0.3 && val < 0.9
    if (ok) score++
    console.log(`  ${hand.padEnd(4)} idx=${idx.toString().padStart(3)} val=${val.toFixed(4)} ${ok ? '✓' : '✗'}`)
  }

  // Check expected 0% hands
  console.log('\nExpected 0% hands:')
  for (const hand of expected0) {
    const idx = mapping.hands.indexOf(hand)
    const val = strategy[idx] ?? 0
    const ok = val < 0.1
    if (ok) score++
    console.log(`  ${hand.padEnd(4)} idx=${idx.toString().padStart(3)} val=${val.toFixed(4)} ${ok ? '✓' : '✗'}`)
  }

  console.log(`\nScore: ${score}/${expected100.length + expectedMixed.length + expected0.length}`)
}

// Also print which hands map to indices with value 1
console.log('\n\n=== Hands with value = 1 (first mapping: 2-low, row<col=suited) ===')
const hands1 = mappings[0].hands
const indicesWith1 = strategy.map((v, i) => v === 1 ? i : -1).filter(i => i >= 0)
console.log(`Indices with value 1: ${indicesWith1.length} hands`)
console.log(indicesWith1.map(i => hands1[i]).join(', '))

// Verify data integrity: fold + raise should sum to ~1
console.log('\n\n=== Data Integrity Check ===')
const foldAction = data.raw.action_solutions.find(s => s.action.type === 'FOLD')
const foldStrategy = foldAction?.strategy || []
const allinAction = data.raw.action_solutions.find(s => s.action.allin)
const allinStrategy = allinAction?.strategy || []

console.log('Checking fold + raise + allin sums for pair indices:')
const pairIndices = [0, 14, 28, 42, 56, 70, 84, 98, 112, 126, 140, 154, 168]
const pairNames2Low = ['22', '33', '44', '55', '66', '77', '88', '99', 'TT', 'JJ', 'QQ', 'KK', 'AA']
for (let i = 0; i < pairIndices.length; i++) {
  const idx = pairIndices[i]
  const fold = foldStrategy[idx] ?? 0
  const raise = strategy[idx] ?? 0
  const allin = allinStrategy[idx] ?? 0
  const sum = fold + raise + allin
  console.log(`  ${pairNames2Low[i].padEnd(3)} idx=${idx.toString().padStart(3)}: fold=${fold.toFixed(4)} raise=${raise.toFixed(4)} allin=${allin.toFixed(4)} sum=${sum.toFixed(4)}`)
}

// Print the full 13x13 grid of raise frequencies with 2-low mapping
console.log('\n\n=== Full 13x13 Grid (Raise Frequencies, 2-low row-major) ===')
console.log('     A    K    Q    J    T    9    8    7    6    5    4    3    2')
const RANKS = ['2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A'].reverse()
for (let r = 0; r < 13; r++) {
  let row = RANKS[r].padStart(2) + ' '
  for (let c = 0; c < 13; c++) {
    // Convert from display (A-high) to storage (2-low) indices
    const storageR = 12 - r
    const storageC = 12 - c
    const idx = storageR * 13 + storageC
    const val = strategy[idx] ?? 0
    row += val.toFixed(2).padStart(5)
  }
  console.log(row)
}

// Also show the grid for indices (not values) to help debug
console.log('\n=== Index Grid (storage indices, 2-low row-major) ===')
console.log('     A    K    Q    J    T    9    8    7    6    5    4    3    2')
for (let r = 0; r < 13; r++) {
  let row = RANKS[r].padStart(2) + ' '
  for (let c = 0; c < 13; c++) {
    const storageR = 12 - r
    const storageC = 12 - c
    const idx = storageR * 13 + storageC
    row += idx.toString().padStart(5)
  }
  console.log(row)
}

// Try to figure out the correct mapping by looking at which indices have expected values
console.log('\n\n=== Reverse Engineering the Mapping ===')
console.log('Looking for indices that match expected behavior for BTN RFI:')

// We know:
// - AA should be ~100% raise (value 1.0)
// - KK, QQ, JJ should be ~100% raise
// - 22, 33 should be mixed (0.5-0.7)
// - Trash hands like 72o, 32o should be 0%

// Find all indices with values in different ranges
const pureRaise = strategy.map((v, i) => v > 0.99 ? i : -1).filter(i => i >= 0)
const mixedRaise = strategy.map((v, i) => (v > 0.4 && v < 0.8) ? i : -1).filter(i => i >= 0)
const pureFold = strategy.map((v, i) => v < 0.01 ? i : -1).filter(i => i >= 0)

console.log(`\nIndices with value ~1.0 (100% raise): ${pureRaise.length} indices`)
console.log(`  First 20: ${pureRaise.slice(0, 20).join(', ')}`)
console.log(`  Last 5: ${pureRaise.slice(-5).join(', ')}`)

console.log(`\nIndices with value 0.4-0.8 (mixed): ${mixedRaise.length} indices`)
console.log(`  All: ${mixedRaise.join(', ')}`)

console.log(`\nIndices with value ~0 (fold): ${pureFold.length} indices`)
console.log(`  First 20: ${pureFold.slice(0, 20).join(', ')}`)

// Check if pairs could be in different positions
console.log('\n=== Checking Diagonal Patterns ===')
console.log('Standard diagonal (i*14): ', pairIndices.map(i => strategy[i]?.toFixed(2)).join(', '))
console.log('Offset diagonal (i*14+1): ', pairIndices.map((_, i) => strategy[i*14+1]?.toFixed(2)).join(', '))
console.log('Reverse diagonal (168-i*14): ', pairIndices.map((_, i) => strategy[168-i*14]?.toFixed(2)).join(', '))

// Check if data might be stored linearly by hand type
console.log('\n=== Checking Linear Storage Patterns ===')
console.log('First 13 values (might be pairs?):')
for (let i = 0; i < 13; i++) {
  console.log(`  idx ${i.toString().padStart(3)}: ${strategy[i]?.toFixed(4)}`)
}
console.log('Values at indices 13-25 (first non-pair section?):')
for (let i = 13; i < 26; i++) {
  console.log(`  idx ${i.toString().padStart(3)}: ${strategy[i]?.toFixed(4)}`)
}

// Check rows that have the strange pattern
console.log('\n=== Checking Row Patterns ===')
// The K-row shows 0,0,0,0,1,1,1,1,1,1,1,1,0 - check indices 143-155
console.log('K-row (indices 143-155):')
for (let i = 143; i <= 155; i++) {
  const col = 155 - i // A=0, K=1, ..., 2=12
  const colName = RANKS_AHIGH[col]
  console.log(`  idx ${i}: ${strategy[i]?.toFixed(2)} (K${colName})`)
}

// Try XOR or other bit patterns on indices
console.log('\n=== Testing Bit/XOR Patterns ===')
// What if we need to XOR or flip certain bits?
// Check if even/odd indices show a pattern
const evenIndices = strategy.filter((_, i) => i % 2 === 0)
const oddIndices = strategy.filter((_, i) => i % 2 === 1)
const evenSum = evenIndices.reduce((a,b) => a+b, 0)
const oddSum = oddIndices.reduce((a,b) => a+b, 0)
console.log(`Even indices sum: ${evenSum.toFixed(2)}, Odd indices sum: ${oddSum.toFixed(2)}`)

// Check if there's a simple permutation that fixes the checkerboard
// Try interleaving two halves
console.log('\n=== Testing Interleave Pattern ===')
const firstHalf = strategy.slice(0, 85)
const secondHalf = strategy.slice(84)
console.log(`First half length: ${firstHalf.length}, Second half length: ${secondHalf.length}`)

// Print the diagonal with potential fixes
console.log('\n=== Testing Potential Index Fixes ===')
const altDiagonal1 = [] // Try i*13+i
const altDiagonal2 = [] // Try (12-i)*14
for (let i = 0; i < 13; i++) {
  altDiagonal1.push(strategy[i * 13 + i]?.toFixed(2))
  altDiagonal2.push(strategy[(12-i) * 14]?.toFixed(2))
}
console.log('Diagonal via i*13+i:', altDiagonal1.join(', '))
console.log('Diagonal via (12-i)*14:', altDiagonal2.join(', '))

// Try column-reversed mapping
console.log('\n=== Testing Column-Reversed Grid ===')
console.log('If columns within each row are reversed:')
console.log('     A    K    Q    J    T    9    8    7    6    5    4    3    2')
for (let r = 0; r < 13; r++) {
  let row = RANKS[r].padStart(2) + ' '
  for (let c = 0; c < 13; c++) {
    // Reverse column order within each row
    const storageR = 12 - r
    const storageC = c // NOT reversed: 0=A, 12=2
    const idx = storageR * 13 + storageC
    const val = strategy[idx] ?? 0
    row += val.toFixed(2).padStart(5)
  }
  console.log(row)
}

// Build hand names for column-reversed mapping
console.log('\n=== Column-Reversed Mapping Test ===')
function buildColumnReversedHandTypes() {
  const handTypes = []
  const RANKS = ['2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A']
  for (let row = 0; row < 13; row++) {
    for (let col = 0; col < 13; col++) {
      const displayCol = 12 - col // Reverse column
      if (row === displayCol) {
        handTypes.push(RANKS[row] + RANKS[row])
      } else if (row < displayCol) {
        const high = RANKS[Math.max(row, displayCol)]
        const low = RANKS[Math.min(row, displayCol)]
        handTypes.push(high + low + 's')
      } else {
        const high = RANKS[Math.max(row, displayCol)]
        const low = RANKS[Math.min(row, displayCol)]
        handTypes.push(high + low + 'o')
      }
    }
  }
  return handTypes
}
const reversedHands = buildColumnReversedHandTypes()
const expected = ['AA', 'KK', 'QQ', 'JJ', 'TT', '99', '88', '77', 'AKs', 'AKo', '72o']
console.log('Checking expected hands with column-reversed:')
for (const hand of expected) {
  const idx = reversedHands.indexOf(hand)
  const val = idx >= 0 ? strategy[idx]?.toFixed(4) : 'NOT FOUND'
  console.log(`  ${hand.padEnd(4)}: idx=${idx}, value=${val}`)
}

// Direct verification: print raw array values at specific indices
console.log('\n=== Direct Verification of Raw Array Values ===')
console.log('Strategy array length:', strategy.length)
console.log('Diagonal indices (should be pairs):')
for (let i = 0; i < 13; i++) {
  const idx = i * 14
  console.log(`  i=${i.toString().padStart(2)} (rank ${RANKS_2LOW[i]}): idx=${idx.toString().padStart(3)}, value=${strategy[idx]?.toFixed(4) ?? 'undefined'}`)
}

// Check if data might be using a different representation
// Sum all values - should roughly equal the number of hands opened
const totalFreq = strategy.reduce((a, b) => a + b, 0)
console.log(`\nTotal frequency sum: ${totalFreq.toFixed(2)} (expect ~80-90 for BTN RFI = ~50% of 169 hands)`)

// Check specific problematic indices more carefully
console.log('\n=== Investigating Problematic Indices ===')
const problemIndices = [28, 42, 56, 112, 154]
for (const idx of problemIndices) {
  const row = Math.floor(idx / 13)
  const col = idx % 13
  const rankRow = RANKS_2LOW[row]
  const rankCol = RANKS_2LOW[col]
  let handName
  if (row === col) handName = rankRow + rankRow
  else if (row < col) handName = RANKS_2LOW[col] + RANKS_2LOW[row] + 's'
  else handName = RANKS_2LOW[row] + RANKS_2LOW[col] + 'o'

  console.log(`  idx ${idx}: row=${row}(${rankRow}) col=${col}(${rankCol}) -> ${handName} = ${strategy[idx]?.toFixed(4)}`)

  // Also check surrounding indices
  const neighbors = [idx-1, idx+1, idx-13, idx+13]
  for (const n of neighbors) {
    if (n >= 0 && n < 169) {
      const nRow = Math.floor(n / 13)
      const nCol = n % 13
      console.log(`    neighbor idx ${n}: row=${nRow} col=${nCol} = ${strategy[n]?.toFixed(4)}`)
    }
  }
}
