#!/usr/bin/env node
/**
 * Generates import statements and makeScenarios map for GTOWizard data.
 * Output can be pasted into src/ranges/index.js
 *
 * Usage:
 *   node generate-imports.js --stake nl100 --stack 100
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

function parseArgs() {
  const args = process.argv.slice(2)
  const opts = { stake: 'nl100', stack: '100' }
  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--stake' && args[i + 1]) opts.stake = args[++i]
    else if (args[i] === '--stack' && args[i + 1]) opts.stack = args[++i]
  }
  return opts
}

function main() {
  const opts = parseArgs()
  const convertedDir = path.join(__dirname, '..', '..', 'src', 'ranges', 'cash_6max_gtowiz', opts.stake, `${opts.stack}bb`)

  if (!fs.existsSync(convertedDir)) {
    console.error(`Directory not found: ${convertedDir}`)
    process.exit(1)
  }

  // Find all JS files recursively
  const files = []
  function walk(dir) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      if (entry.isDirectory()) {
        walk(path.join(dir, entry.name))
      } else if (entry.name.endsWith('.js')) {
        files.push(path.join(dir, entry.name))
      }
    }
  }
  walk(convertedDir)

  // Generate import statements
  const imports = []
  const scenarios = {}

  for (const file of files) {
    const relativePath = path.relative(path.join(__dirname, '..', '..', 'src', 'ranges'), file).replace(/\\/g, '/')
    const scenarioId = path.basename(file, '.js')
    const varName = `gw_${opts.stake.replace('nl', '')}_${opts.stack}_${scenarioId}`

    imports.push(`import ${varName} from './${relativePath}'`)
    scenarios[scenarioId] = varName
  }

  console.log('// ═══════════════════════════════════════════════════════════════════════════')
  console.log(`// GTOWizard ${opts.stake.toUpperCase()} ${opts.stack}bb imports`)
  console.log('// ═══════════════════════════════════════════════════════════════════════════')
  console.log(imports.sort().join('\n'))
  console.log('')
  console.log('// ───────────────────────────────────────────────────────────────────────────')
  console.log('// makeScenarios map:')
  console.log('// ───────────────────────────────────────────────────────────────────────────')
  console.log('makeScenarios({')
  const entries = Object.entries(scenarios).sort((a, b) => a[0].localeCompare(b[0]))
  for (const [id, varName] of entries) {
    console.log(`  ${id}: ${varName},`)
  }
  console.log('})')
  console.log('')
  console.log(`// Total: ${files.length} scenarios`)
}

main()
