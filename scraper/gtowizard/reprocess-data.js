#!/usr/bin/env node
// ── Reprocess GTO Wizard Data ──────────────────────────────────────────────────
//
// Reprocesses existing scraped JSON files using the corrected hand indexing.
// The raw API data is preserved; only the "processed" section is regenerated.
//
// Usage:
//   node scraper/gtowizard/reprocess-data.js
//
// ─────────────────────────────────────────────────────────────────────────────────

import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

// ── Corrected Hand-type index mapping ────────────────────────────────────────────
// GTO Wizard uses 2→A rank ordering with:
//   row < col  → offsuit (higher rank at col)
//   row > col  → suited  (higher rank at row)
//   row == col → pair
const RANKS = ['2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A'];

const HAND_TYPES = [];
for (let row = 0; row < 13; row++) {
  for (let col = 0; col < 13; col++) {
    if (row === col) {
      HAND_TYPES.push(RANKS[row] + RANKS[row]);
    } else if (row < col) {
      // Offsuit: higher rank is at col
      HAND_TYPES.push(RANKS[col] + RANKS[row] + 'o');
    } else {
      // Suited: higher rank is at row
      HAND_TYPES.push(RANKS[row] + RANKS[col] + 's');
    }
  }
}

// ── Processing functions ─────────────────────────────────────────────────────────

function arrayToHandMap(arr, threshold = 0.0001) {
  const out = {};
  for (let i = 0; i < 169; i++) {
    const v = arr[i];
    if (v != null && Math.abs(v) > threshold) {
      out[HAND_TYPES[i]] = parseFloat(v.toFixed(4));
    }
  }
  return out;
}

function processSpotSolution(data) {
  const raise = {};
  const call = {};
  const ev = {};

  for (const sol of (data.action_solutions ?? [])) {
    const action = sol.action;
    if (action.type === 'FOLD') continue;

    const rawSize = parseFloat(action.betsize);
    const sizeBb = rawSize.toString() + 'bb';

    const freqMap = arrayToHandMap(sol.strategy);
    if (Object.keys(freqMap).length === 0) continue;

    if (action.type === 'CALL') {
      call[sizeBb] = freqMap;
      if (sol.evs) {
        const evMap = arrayToHandMap(sol.evs);
        if (Object.keys(evMap).length) ev[`call_${sizeBb}`] = evMap;
      }
    } else if (action.type === 'RAISE') {
      raise[sizeBb] = freqMap;
      if (sol.evs) {
        const evMap = arrayToHandMap(sol.evs);
        if (Object.keys(evMap).length) ev[`raise_${sizeBb}`] = evMap;
      }
    }
  }

  // Overall GTO EV from players_info
  const activePi = (data.players_info ?? []).find(pi => pi.player?.is_active === false && pi.evs);
  if (activePi?.evs) {
    const mainEv = arrayToHandMap(activePi.evs);
    if (Object.keys(mainEv).length) ev.main = mainEv;
  }

  const out = {};
  if (Object.keys(raise).length) out.raise = raise;
  if (Object.keys(call).length) out.call = call;
  if (Object.keys(ev).length) out.ev = ev;
  return out;
}

// ── File discovery ───────────────────────────────────────────────────────────────

function findJsonFiles(dir, files = []) {
  const entries = readdirSync(dir);
  for (const entry of entries) {
    const fullPath = join(dir, entry);
    const stat = statSync(fullPath);
    if (stat.isDirectory()) {
      findJsonFiles(fullPath, files);
    } else if (entry.endsWith('.json')) {
      files.push(fullPath);
    }
  }
  return files;
}

// ── Main ─────────────────────────────────────────────────────────────────────────

function main() {
  const outDir = join(__dirname, 'out');

  console.log('╔══════════════════════════════════════════════════════════════╗');
  console.log('║  GTO Wizard Data Reprocessor                                 ║');
  console.log('║  Using corrected 2→A hand indexing                           ║');
  console.log('╚══════════════════════════════════════════════════════════════╝');
  console.log('');
  console.log('Scanning:', outDir);

  const files = findJsonFiles(outDir);
  console.log(`Found ${files.length} JSON files to reprocess\n`);

  let success = 0;
  let failed = 0;

  for (const filepath of files) {
    const relPath = filepath.replace(outDir, '').replace(/^[\\\/]/, '');

    try {
      const content = readFileSync(filepath, 'utf8');
      const data = JSON.parse(content);

      if (!data.raw || !data.raw.action_solutions) {
        console.log(`  ⊘ ${relPath} - no raw data, skipping`);
        continue;
      }

      // Reprocess using corrected mapping
      const newProcessed = processSpotSolution(data.raw);

      // Update the file
      data.processed = newProcessed;

      writeFileSync(filepath, JSON.stringify(data, null, 2));
      console.log(`  ✓ ${relPath}`);
      success++;

    } catch (err) {
      console.log(`  ✗ ${relPath} - ${err.message}`);
      failed++;
    }
  }

  console.log('');
  console.log('════════════════════════════════════════════════════════════════');
  console.log(`Done! Reprocessed: ${success}, Failed: ${failed}`);

  // Verify a sample
  if (success > 0) {
    console.log('');
    console.log('── Sample verification (BTN RFI pairs) ──');
    try {
      const samplePath = join(outDir, 'nl100', '100bb', 'rfi_btn.json');
      const sample = JSON.parse(readFileSync(samplePath, 'utf8'));
      const raise = sample.processed?.raise?.['2.5bb'] || {};

      const pairs = ['AA', 'KK', 'QQ', 'JJ', 'TT', '99', '88', '77', '66', '55', '44', '33', '22'];
      for (const pair of pairs) {
        const freq = raise[pair];
        const display = freq !== undefined ? (freq * 100).toFixed(1) + '%' : 'FOLD';
        console.log(`  ${pair}: ${display}`);
      }
    } catch (e) {
      console.log('  (Could not load sample file)');
    }
  }
}

main();
