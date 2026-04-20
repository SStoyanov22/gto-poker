#!/usr/bin/env node
// Test the fixed processSpotSolution function

import { readFileSync } from 'fs'
import { processSpotSolution } from './lib/gtowizard.js'

const data = JSON.parse(readFileSync('./scraper/gtowizard/out/nl100/100bb/rfi_btn.json', 'utf-8'))

console.log('=== Testing Fixed processSpotSolution ===\n')

// Process using the new function
const processed = processSpotSolution(data.raw)

console.log('Raise frequencies:')
for (const [size, hands] of Object.entries(processed.raise || {})) {
  console.log(`\n  ${size}:`)
  // Show a few key hands
  const keyHands = ['AA', 'KK', 'QQ', 'JJ', 'TT', '99', '88', '77', '66', '55', '44', '33', '22',
                    'AKs', 'AKo', 'AQs', 'AQo', 'AJs', 'KQs', '72o', '83o', '94o']
  for (const h of keyHands) {
    if (hands[h] !== undefined) {
      console.log(`    ${h.padEnd(4)}: ${hands[h].toFixed(4)}`)
    }
  }
}

console.log('\n\n=== Verifying Key Hands ===')
const raise25 = processed.raise?.['2.5bb'] || {}

// Check pairs
console.log('\nPairs (should all be ~100% except 22, 33 which are mixed):')
const pairs = ['AA', 'KK', 'QQ', 'JJ', 'TT', '99', '88', '77', '66', '55', '44', '33', '22']
for (const p of pairs) {
  const val = raise25[p]
  const status = val === undefined ? '❌ MISSING' :
                 (p === '22' || p === '33') ? (val > 0.4 && val < 0.8 ? '✓ correct' : '❌ wrong') :
                 val > 0.95 ? '✓ correct' : '❌ wrong'
  console.log(`  ${p.padEnd(3)}: ${val?.toFixed(4) ?? 'undefined'.padEnd(6)} ${status}`)
}

// Check premium suited
console.log('\nPremium suited (should be ~100%):')
const premiumSuited = ['AKs', 'AQs', 'AJs', 'ATs', 'KQs', 'KJs', 'QJs', 'JTs']
for (const h of premiumSuited) {
  const val = raise25[h]
  const status = val === undefined ? '❌ MISSING' : val > 0.95 ? '✓ correct' : '❌ wrong'
  console.log(`  ${h.padEnd(4)}: ${val?.toFixed(4) ?? 'undefined'.padEnd(6)} ${status}`)
}

// Check trash hands (should be 0% or very low)
console.log('\nTrash hands (should be ~0%):')
const trash = ['72o', '83o', '94o', '32o', '42o']
for (const h of trash) {
  const val = raise25[h]
  const status = val === undefined ? '✓ not present (0%)' : val < 0.05 ? '✓ correct' : '❌ wrong'
  console.log(`  ${h.padEnd(4)}: ${val?.toFixed(4) ?? 'undefined'.padEnd(6)} ${status}`)
}
