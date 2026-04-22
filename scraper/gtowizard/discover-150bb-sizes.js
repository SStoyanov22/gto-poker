#!/usr/bin/env node
import { setToken, getSpotSolution } from '../lib/gtowizard.js';
import { readFileSync, existsSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const envPath = join(__dirname, '.env');
if (existsSync(envPath)) {
  const content = readFileSync(envPath, 'utf-8');
  for (const line of content.split('\n')) {
    const [key, ...valueParts] = line.split('=');
    if (key && valueParts.length) {
      process.env[key.trim()] = valueParts.join('=').trim();
    }
  }
}

const token = process.env.GTOWIZARD_TOKEN;
if (!token) {
  console.error('No token');
  process.exit(1);
}
setToken(token);

const depth = parseInt(process.argv[2] || '150', 10);
console.log(`\nDiscovering bet sizes for ${depth}bb stack:\n`);

// 3-bet scenarios
const threeBetScenarios = [
  { desc: 'BB vs UTG', path: 'R2.5' },
  { desc: 'BB vs HJ', path: 'F-R2.5' },
  { desc: 'BB vs CO', path: 'F-F-R2.5' },
  { desc: 'BB vs BTN', path: 'F-F-F-R2.5' },
  { desc: 'BB vs SB', path: 'F-F-F-F-R3.5' },
  { desc: 'SB vs UTG', path: 'R2.5-F-F-F' },
  { desc: 'SB vs BTN', path: 'F-F-F-R2.5-F' },
  { desc: 'BTN vs UTG', path: 'R2.5-F-F' },
  { desc: 'BTN vs HJ', path: 'F-R2.5-F' },
  { desc: 'BTN vs CO', path: 'F-F-R2.5' },
  { desc: 'CO vs UTG', path: 'R2.5-F' },
  { desc: 'CO vs HJ', path: 'F-R2.5' },
  { desc: 'HJ vs UTG', path: 'R2.5' },
];

console.log('=== 3-BET SIZES ===\n');
for (const s of threeBetScenarios) {
  await new Promise(r => setTimeout(r, 300));
  try {
    const raw = await getSpotSolution({
      gametype: 'Cash6mGeneral_6mNL100R25',
      depth,
      preflopActions: s.path,
    });
    const raises = (raw.action_solutions || []).filter(a => a.action.type === 'RAISE' && !a.action.allin);
    console.log(`${s.desc.padEnd(15)}: ${raises.map(r => r.action.betsize + 'bb').join(', ') || 'N/A'}`);
  } catch (e) {
    console.log(`${s.desc.padEnd(15)}: Error - ${e.message.slice(0, 50)}`);
  }
}

// 4-bet scenarios (need to navigate to vs_3b spot first)
console.log('\n=== 4-BET SIZES ===\n');
const fourBetScenarios = [
  { desc: 'UTG vs BB 3b', path: 'R2.5-F-F-F-F-R' },  // Need 3b size
  { desc: 'UTG vs SB 3b', path: 'R2.5-F-F-F-R' },
  { desc: 'BTN vs BB 3b', path: 'F-F-F-R2.5-F-R' },
];

// First discover 3b sizes, then construct 4b paths
const bbVsUtg3b = await getSpotSolution({
  gametype: 'Cash6mGeneral_6mNL100R25',
  depth,
  preflopActions: 'R2.5',
});
const bb3bSize = (bbVsUtg3b.action_solutions || []).find(a => a.action.type === 'RAISE' && !a.action.allin)?.action.betsize;
console.log(`BB 3-bet vs UTG: ${bb3bSize}bb`);

if (bb3bSize) {
  await new Promise(r => setTimeout(r, 300));
  const utg4b = await getSpotSolution({
    gametype: 'Cash6mGeneral_6mNL100R25',
    depth,
    preflopActions: `R2.5-F-F-F-F-R${bb3bSize}`,
  });
  const raises = (utg4b.action_solutions || []).filter(a => a.action.type === 'RAISE' && !a.action.allin);
  console.log(`UTG 4-bet vs BB: ${raises.map(r => r.action.betsize + 'bb').join(', ') || 'N/A'}`);
}

// Squeeze sizes
console.log('\n=== SQUEEZE SIZES ===\n');
const squeezeScenarios = [
  { desc: 'BB sqz vs UTG+HJ', path: 'R2.5-C' },
  { desc: 'SB sqz vs UTG+BTN', path: 'R2.5-F-F-C' },
  { desc: 'BTN sqz vs UTG+HJ', path: 'R2.5-C-F' },
];

for (const s of squeezeScenarios) {
  await new Promise(r => setTimeout(r, 300));
  try {
    const raw = await getSpotSolution({
      gametype: 'Cash6mGeneral_6mNL100R25',
      depth,
      preflopActions: s.path,
    });
    const raises = (raw.action_solutions || []).filter(a => a.action.type === 'RAISE' && !a.action.allin);
    console.log(`${s.desc.padEnd(20)}: ${raises.map(r => r.action.betsize + 'bb').join(', ') || 'N/A'}`);
  } catch (e) {
    console.log(`${s.desc.padEnd(20)}: Error - ${e.message.slice(0, 50)}`);
  }
}

console.log('\nDone!');
