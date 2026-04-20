#!/usr/bin/env node
// ── Reprocess all GTOWizard JSON files ──────────────────────────────────────
// This script reads each JSON file and recalculates the processed data
// using the corrected frequency calculation:
//   actual_freq = total_frequency × actions_total_frequencies
//
// The bug was that we were using actions_total_frequencies directly,
// which represents frequency WITHIN the range, not actual frequency.

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// ── Corrected processSpotSolution ───────────────────────────────────────────
//
// We store TWO types of frequencies:
// 1. Display frequencies (conditional) - "what % of the time do I take this action when I have this hand"
//    Used for grid cell coloring. e.g., 76s shows 100% call because when it's in range, it always calls.
// 2. Combo frequencies (absolute) - for statistics: total_frequency × action_freq
//    Used for counting combos. e.g., 76s contributes 0.386 combos to call count.
//
function processSpotSolution(data) {
  // Display frequencies (conditional - what to do when you have this hand)
  const raise = {}
  const call  = {}
  const fold  = {}

  // Combo frequencies (absolute - for counting combos)
  const combos = {
    raise: {},
    call: {},
    fold: {}
  }

  const ev = {}
  const inRange = []

  // Find action codes and their sizes from action_solutions
  const actionSizes = {}
  let foldCode = null
  for (const sol of (data.action_solutions ?? [])) {
    const action = sol.action
    if (action.type === 'FOLD') {
      foldCode = action.code
      continue
    }
    const rawSize = parseFloat(action.betsize)
    const sizeBb = rawSize.toString() + 'bb'
    actionSizes[action.code] = { type: action.type, sizeBb }
  }

  // Find the hero player (is_hero: true) who has the strategy data
  const heroPlayer = (data.players_info ?? []).find(pi => pi.player?.is_hero === true)
  const handCounters = heroPlayer?.simple_hand_counters

  if (handCounters && Object.keys(handCounters).length > 0) {
    // Use properly labeled hand data
    for (const [handName, handData] of Object.entries(handCounters)) {
      // Skip non-hand entries like "best_hands", "good_hands", etc.
      if (!handData.actions_total_frequencies) continue

      // total_frequency is how often this hand is in the range (e.g., 0.0965 for 76s)
      // actions_total_frequencies gives freq WITHIN the range (e.g., 1.0 = 100% call)
      const rangeFreq = handData.total_frequency ?? 0
      if (rangeFreq < 0.0001) continue  // Hand not in range

      // Track all hands in range
      inRange.push(handName)

      for (const [actionCode, actionFreq] of Object.entries(handData.actions_total_frequencies)) {
        if (actionFreq < 0.0001) continue

        // Handle fold action
        if (actionCode === foldCode || actionCode === 'F') {
          // Display: conditional frequency (what to do when you have this hand)
          fold[handName] = parseFloat(actionFreq.toFixed(4))
          // Combos: absolute frequency (for statistics)
          combos.fold[handName] = parseFloat((rangeFreq * actionFreq).toFixed(4))
          continue
        }

        const actionInfo = actionSizes[actionCode]
        if (!actionInfo) continue

        const { type, sizeBb } = actionInfo

        if (type === 'CALL') {
          if (!call[sizeBb]) call[sizeBb] = {}
          call[sizeBb][handName] = parseFloat(actionFreq.toFixed(4))  // Display: conditional
          if (!combos.call[sizeBb]) combos.call[sizeBb] = {}
          combos.call[sizeBb][handName] = parseFloat((rangeFreq * actionFreq).toFixed(4))  // Stats: absolute
        } else if (type === 'RAISE') {
          if (!raise[sizeBb]) raise[sizeBb] = {}
          raise[sizeBb][handName] = parseFloat(actionFreq.toFixed(4))  // Display: conditional
          if (!combos.raise[sizeBb]) combos.raise[sizeBb] = {}
          combos.raise[sizeBb][handName] = parseFloat((rangeFreq * actionFreq).toFixed(4))  // Stats: absolute
        }
      }

      // Extract EV if available (only for hands in range)
      if (handData.hand_ev != null && Math.abs(handData.hand_ev) > 0.0001) {
        if (!ev.main) ev.main = {}
        ev.main[handName] = parseFloat(handData.hand_ev.toFixed(4))
      }
    }
  } else {
    console.warn('  WARNING: simple_hand_counters not available, skipping')
    return null
  }

  const out = {}
  if (Object.keys(raise).length) out.raise = raise
  if (Object.keys(call).length)  out.call  = call
  if (Object.keys(fold).length)  out.fold  = fold
  if (Object.keys(ev).length)    out.ev    = ev
  if (inRange.length)            out.inRange = inRange
  out.combos = combos  // For statistics
  return out
}

// ── Find all JSON files ─────────────────────────────────────────────────────
function findJsonFiles(dir) {
  const files = []
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      files.push(...findJsonFiles(fullPath))
    } else if (entry.name.endsWith('.json')) {
      files.push(fullPath)
    }
  }
  return files
}

// ── Main ────────────────────────────────────────────────────────────────────
const outDir = path.join(__dirname, 'out')
const files = findJsonFiles(outDir)

console.log(`Found ${files.length} JSON files to reprocess`)

let processed = 0
let skipped = 0
let errors = 0

for (const filePath of files) {
  const relPath = path.relative(outDir, filePath)
  try {
    const content = fs.readFileSync(filePath, 'utf8')
    const data = JSON.parse(content)

    if (!data.raw) {
      console.log(`  SKIP ${relPath}: no raw data`)
      skipped++
      continue
    }

    const newProcessed = processSpotSolution(data.raw)
    if (!newProcessed) {
      console.log(`  SKIP ${relPath}: could not process`)
      skipped++
      continue
    }

    // Update the processed data
    data.processed = newProcessed

    // Write back
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2))
    console.log(`  OK   ${relPath}`)
    processed++
  } catch (err) {
    console.log(`  ERR  ${relPath}: ${err.message}`)
    errors++
  }
}

console.log(`\nDone: ${processed} processed, ${skipped} skipped, ${errors} errors`)
