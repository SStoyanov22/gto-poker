#!/usr/bin/env node
// Organize raw scraped data into categories with a manifest

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const srcDir = 'scraper/out/raw/nl100/2.5bb/100bb';
const destBase = 'scraper/out/organized/nl100/2.5bb/100bb';

// Category rules
function categorize(id) {
  if (/^rfi_/.test(id)) return { category: '1_rfi', desc: 'Raise First In' };
  if (/^(bb|sb|btn|co|hj)_vs_(utg|hj|co|btn|sb)$/.test(id)) return { category: '2_vs_rfi', desc: 'Defending vs Open' };
  if (/_vs_3b_/.test(id)) return { category: '3_vs_3bet', desc: '4-bet spots' };
  if (/_vs_4b_allin_/.test(id)) return { category: '4_vs_4bet_allin', desc: 'vs All-in 4bet' };
  if (/_vs_4b_/.test(id)) return { category: '4_vs_4bet', desc: '5-bet spots' };
  if (/_vs_5b_/.test(id)) return { category: '5_vs_5bet', desc: 'vs 5bet' };
  if (/^(co|btn|sb|bb)_vs_(utg|hj|co|btn)_(hj|co|btn|sb)$/.test(id)) return { category: '6_squeeze', desc: 'Squeeze spots' };
  if (/_vs_sqz_/.test(id)) return { category: '7_vs_squeeze', desc: 'vs Squeeze' };
  if (/_sqz_/.test(id) && !/_vs_sqz_/.test(id)) return { category: '8_sqz_vs_4bet', desc: 'Squeezer vs 4bet' };
  if (/vs_limp/.test(id)) return { category: '9_vs_limp', desc: 'vs Limp' };
  return { category: '99_other', desc: 'Other' };
}

// Read all JSON files
const files = fs.readdirSync(srcDir).filter(f => f.endsWith('.json'));
const manifest = {
  generated: new Date().toISOString(),
  config: { stake: 'nl100', pfrSize: '2.5bb', stack: 100 },
  totalScenarios: files.length,
  categories: {},
  scenarios: []
};

for (const file of files) {
  const id = file.replace('.json', '');
  const { category, desc } = categorize(id);
  const srcPath = path.join(srcDir, file);
  const data = JSON.parse(fs.readFileSync(srcPath, 'utf8'));

  // Extract key info for manifest
  const response = data.response || (data.variants && Object.values(data.variants)[0]?.response);
  const info = {
    id,
    category,
    player: response?.player,
    villain: response?.villain_player,
    hasVariants: !!data.variants,
    variants: data.variants ? Object.keys(data.variants) : undefined,
    actions: response?.actions?.map(a => a.action),
    pot: response?.pot,
    path: data.path
  };

  manifest.scenarios.push(info);

  // Track categories
  if (!manifest.categories[category]) {
    manifest.categories[category] = { description: desc, count: 0, scenarios: [] };
  }
  manifest.categories[category].count++;
  manifest.categories[category].scenarios.push(id);

  // Create category directory and copy file
  const destDir = path.join(destBase, category);
  fs.mkdirSync(destDir, { recursive: true });
  fs.copyFileSync(srcPath, path.join(destDir, file));
}

// Sort
manifest.scenarios.sort((a, b) => a.category.localeCompare(b.category) || a.id.localeCompare(b.id));

// Write manifest
fs.mkdirSync(destBase, { recursive: true });
fs.writeFileSync(path.join(destBase, 'manifest.json'), JSON.stringify(manifest, null, 2));

// Print summary
console.log(`Organized ${files.length} scenarios into:\n`);
for (const [cat, info] of Object.entries(manifest.categories).sort()) {
  console.log(`  ${cat.padEnd(20)} ${String(info.count).padStart(3)} files  (${info.description})`);
}
console.log(`\nOutput: ${destBase}/`);
console.log(`Manifest: ${destBase}/manifest.json`);
