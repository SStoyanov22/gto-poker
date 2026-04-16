#!/usr/bin/env node
// Discover bet sizes for a specific stack depth

import { readFileSync, readdirSync, existsSync } from 'fs';
import { join } from 'path';

const stack = process.argv[2] || '50';
const dir = `scraper/gtowizard/out/nl100/${stack}bb`;

if (!existsSync(dir)) {
  console.log(`Directory ${dir} not found. Run scraper first to get vs_open spots.`);
  process.exit(1);
}

const files = readdirSync(dir).filter(f => f.endsWith('.json'));

console.log(`\nExtracting bet sizes for ${stack}bb stack:\n`);

// Categorize files
const vsOpenFiles = files.filter(f => !f.includes('_3b_') && !f.includes('_4b_') && !f.includes('_5b_') && !f.includes('rfi_'));
const vs3bFiles = files.filter(f => f.includes('_vs_3b_'));
const vs4bFiles = files.filter(f => f.includes('_vs_4b_'));

console.log('=== 3-BET SIZES (from vs_open spots) ===\n');

for (const file of vsOpenFiles) {
  const data = JSON.parse(readFileSync(join(dir, file), 'utf8'));
  const raises = data.raw?.action_solutions?.filter(s => s.action?.type === 'RAISE' && !s.action?.allin);

  if (raises && raises.length > 0) {
    const scenario = file.replace('.json', '');
    const raiseInfo = raises.map(r => `R${r.action.betsize}`).join(', ');
    console.log(`${scenario.padEnd(20)} -> 3-bet: ${raiseInfo}`);
  }
}

if (vs3bFiles.length > 0) {
  console.log('\n=== 4-BET SIZES (from vs_3b spots) ===\n');

  for (const file of vs3bFiles) {
    const data = JSON.parse(readFileSync(join(dir, file), 'utf8'));
    const raises = data.raw?.action_solutions?.filter(s => s.action?.type === 'RAISE' && !s.action?.allin);

    if (raises && raises.length > 0) {
      const scenario = file.replace('.json', '');
      const raiseInfo = raises.map(r => `R${r.action.betsize}`).join(', ');
      console.log(`${scenario.padEnd(20)} -> 4-bet: ${raiseInfo}`);
    }
  }
}

if (vs4bFiles.length > 0) {
  console.log('\n=== 5-BET SIZES (from vs_4b spots) ===\n');

  for (const file of vs4bFiles) {
    const data = JSON.parse(readFileSync(join(dir, file), 'utf8'));
    const raises = data.raw?.action_solutions?.filter(s => s.action?.type === 'RAISE');

    if (raises && raises.length > 0) {
      const scenario = file.replace('.json', '');
      const raiseInfo = raises.map(r => `R${r.action.betsize}${r.action.allin ? ' (ALL-IN)' : ''}`).join(', ');
      console.log(`${scenario.padEnd(20)} -> 5-bet: ${raiseInfo}`);
    }
  }
}
