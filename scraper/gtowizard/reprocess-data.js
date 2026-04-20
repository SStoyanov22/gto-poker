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
import { processSpotSolution } from '../lib/gtowizard.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

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
