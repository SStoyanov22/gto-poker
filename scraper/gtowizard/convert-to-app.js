#!/usr/bin/env node
/**
 * Converts GTOWizard JSON files to JS modules for the app.
 *
 * Usage:
 *   node convert-to-app.js --stake nl100 --stack 100
 *   node convert-to-app.js --stake nl100 --stack 100 --scenario rfi_btn
 *   node convert-to-app.js --stake nl100 --stack 100 --out-dir ../../src/ranges/cash_6max_gtowiz
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// Scenario ID -> display name mapping
const SCENARIO_NAMES = {
  // RFI
  rfi_utg: 'UTG RFI',
  rfi_hj: 'HJ RFI',
  rfi_co: 'CO RFI',
  rfi_btn: 'BTN RFI',
  rfi_sb: 'SB RFI',
  // vs Open
  bb_vs_utg: 'BB vs UTG',
  bb_vs_hj: 'BB vs HJ',
  bb_vs_co: 'BB vs CO',
  bb_vs_btn: 'BB vs BTN',
  bb_vs_sb: 'BB vs SB',
  sb_vs_utg: 'SB vs UTG',
  sb_vs_hj: 'SB vs HJ',
  sb_vs_co: 'SB vs CO',
  sb_vs_btn: 'SB vs BTN',
  btn_vs_utg: 'BTN vs UTG',
  btn_vs_hj: 'BTN vs HJ',
  btn_vs_co: 'BTN vs CO',
  co_vs_utg: 'CO vs UTG',
  co_vs_hj: 'CO vs HJ',
  hj_vs_utg: 'HJ vs UTG',
  // vs 3-bet
  utg_vs_3b_hj: 'UTG vs HJ 3b',
  utg_vs_3b_co: 'UTG vs CO 3b',
  utg_vs_3b_btn: 'UTG vs BTN 3b',
  utg_vs_3b_sb: 'UTG vs SB 3b',
  utg_vs_3b_bb: 'UTG vs BB 3b',
  hj_vs_3b_co: 'HJ vs CO 3b',
  hj_vs_3b_btn: 'HJ vs BTN 3b',
  hj_vs_3b_sb: 'HJ vs SB 3b',
  hj_vs_3b_bb: 'HJ vs BB 3b',
  co_vs_3b_btn: 'CO vs BTN 3b',
  co_vs_3b_sb: 'CO vs SB 3b',
  co_vs_3b_bb: 'CO vs BB 3b',
  btn_vs_3b_sb: 'BTN vs SB 3b',
  btn_vs_3b_bb: 'BTN vs BB 3b',
  sb_vs_3b_bb: 'SB vs BB 3b',
  // vs 4-bet
  bb_vs_4b_utg: 'BB vs UTG 4b',
  bb_vs_4b_hj: 'BB vs HJ 4b',
  bb_vs_4b_co: 'BB vs CO 4b',
  bb_vs_4b_btn: 'BB vs BTN 4b',
  bb_vs_4b_sb: 'BB vs SB 4b',
  sb_vs_4b_utg: 'SB vs UTG 4b',
  sb_vs_4b_hj: 'SB vs HJ 4b',
  sb_vs_4b_co: 'SB vs CO 4b',
  sb_vs_4b_btn: 'SB vs BTN 4b',
  btn_vs_4b_utg: 'BTN vs UTG 4b',
  btn_vs_4b_hj: 'BTN vs HJ 4b',
  btn_vs_4b_co: 'BTN vs CO 4b',
  co_vs_4b_utg: 'CO vs UTG 4b',
  co_vs_4b_hj: 'CO vs HJ 4b',
  hj_vs_4b_utg: 'HJ vs UTG 4b',
  // vs 5-bet
  utg_vs_5b_hj: 'UTG vs HJ 5b',
  utg_vs_5b_co: 'UTG vs CO 5b',
  utg_vs_5b_btn: 'UTG vs BTN 5b',
  utg_vs_5b_sb: 'UTG vs SB 5b',
  utg_vs_5b_bb: 'UTG vs BB 5b',
  hj_vs_5b_co: 'HJ vs CO 5b',
  hj_vs_5b_btn: 'HJ vs BTN 5b',
  hj_vs_5b_sb: 'HJ vs SB 5b',
  hj_vs_5b_bb: 'HJ vs BB 5b',
  co_vs_5b_btn: 'CO vs BTN 5b',
  co_vs_5b_sb: 'CO vs SB 5b',
  co_vs_5b_bb: 'CO vs BB 5b',
  btn_vs_5b_sb: 'BTN vs SB 5b',
  btn_vs_5b_bb: 'BTN vs BB 5b',
  sb_vs_5b_bb: 'SB vs BB 5b',
}

function getScenarioSubdir(scenarioId) {
  if (scenarioId.startsWith('rfi_')) return 'rfi'
  if (scenarioId.includes('_vs_5b_')) return 'vs5b'
  if (scenarioId.includes('_vs_4b_')) return 'vs4b'
  if (scenarioId.includes('_vs_3b_')) return 'vs3b'
  if (scenarioId.includes('_vs_sqz_')) return 'vs_sqz'
  if (scenarioId.includes('sqz_')) return 'sqz'
  // vs Open scenarios: bb_vs_utg, sb_vs_btn, etc.
  if (/_vs_(?!3b|4b|5b|sqz)/.test(scenarioId)) return 'vs_rfi'
  return 'other'
}

function handMapToString(handMap) {
  if (!handMap || typeof handMap !== 'object') return ''

  const entries = Object.entries(handMap)
    .filter(([_, freq]) => freq > 0.0001)
    .map(([hand, freq]) => {
      // Round to 4 decimal places
      const rounded = Math.round(freq * 10000) / 10000
      if (rounded >= 0.9999) return hand
      return `${hand}:${rounded}`
    })

  return entries.join(',')
}

function convertJsonToJs(jsonData, scenarioId) {
  const { meta, processed } = jsonData
  const name = SCENARIO_NAMES[scenarioId] || meta?.description || scenarioId

  // Build pfrSizes object
  const pfrSizes = {
    '2bb': { raise: '', call: '' },
    '2.25bb': { raise: '', call: '' },
    '2.5bb': { raise: '', call: '' },
    '3bb': { raise: '', call: '' },
  }

  if (processed?.raise) {
    for (const [size, handMap] of Object.entries(processed.raise)) {
      const normalizedSize = normalizeSize(size)
      if (pfrSizes[normalizedSize]) {
        pfrSizes[normalizedSize].raise = handMapToString(handMap)
      }
    }
  }

  if (processed?.call) {
    for (const [size, handMap] of Object.entries(processed.call)) {
      const normalizedSize = normalizeSize(size)
      if (pfrSizes[normalizedSize]) {
        pfrSizes[normalizedSize].call = handMapToString(handMap)
      }
    }
  }

  // Generate JS module content
  const jsContent = `// ${name} — GTOWizard data
export default {
  name: "${name}",
  description: "${meta?.description || name}",
  pfrSizes: {
    '2bb': {
      raise: "${pfrSizes['2bb'].raise}",
      call: "${pfrSizes['2bb'].call}",
    },
    '2.25bb': {
      raise: "${pfrSizes['2.25bb'].raise}",
      call: "${pfrSizes['2.25bb'].call}",
    },
    '2.5bb': {
      raise: "${pfrSizes['2.5bb'].raise}",
      call: "${pfrSizes['2.5bb'].call}",
    },
    '3bb': {
      raise: "${pfrSizes['3bb'].raise}",
      call: "${pfrSizes['3bb'].call}",
    },
  }
}
`
  return jsContent
}

function normalizeSize(size) {
  // Convert sizes like "2.5bb", "100bb" (all-in), etc. to standard format
  const s = size.toLowerCase()
  if (s === '2bb' || s === '2.0bb') return '2bb'
  if (s === '2.25bb') return '2.25bb'
  if (s === '2.5bb') return '2.5bb'
  if (s === '3bb' || s === '3.0bb') return '3bb'
  // All-in or non-standard sizes - skip them (return null)
  return null
}

function parseArgs() {
  const args = process.argv.slice(2)
  const opts = {
    stake: 'nl100',
    stack: '100',
    scenario: null,
    outDir: null,
    dryRun: false,
  }

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--stake' && args[i + 1]) opts.stake = args[++i]
    else if (args[i] === '--stack' && args[i + 1]) opts.stack = args[++i]
    else if (args[i] === '--scenario' && args[i + 1]) opts.scenario = args[++i]
    else if (args[i] === '--out-dir' && args[i + 1]) opts.outDir = args[++i]
    else if (args[i] === '--dry-run') opts.dryRun = true
  }

  return opts
}

async function main() {
  const opts = parseArgs()

  const inputDir = path.join(__dirname, 'out', opts.stake, `${opts.stack}bb`)
  const outputBaseDir = opts.outDir
    ? path.resolve(opts.outDir)
    : path.join(__dirname, '..', '..', 'src', 'ranges', 'cash_6max_gtowiz', opts.stake, `${opts.stack}bb`)

  if (!fs.existsSync(inputDir)) {
    console.error(`Input directory not found: ${inputDir}`)
    process.exit(1)
  }

  const files = fs.readdirSync(inputDir).filter(f => f.endsWith('.json'))

  if (opts.scenario) {
    const targetFile = `${opts.scenario}.json`
    if (!files.includes(targetFile)) {
      console.error(`Scenario not found: ${opts.scenario}`)
      console.log('Available scenarios:', files.map(f => f.replace('.json', '')).join(', '))
      process.exit(1)
    }
    files.length = 0
    files.push(targetFile)
  }

  console.log(`Converting ${files.length} scenarios from ${inputDir}`)
  console.log(`Output directory: ${outputBaseDir}`)

  let converted = 0
  for (const file of files) {
    const scenarioId = file.replace('.json', '')
    const subdir = getScenarioSubdir(scenarioId)
    const outputDir = path.join(outputBaseDir, subdir)
    const outputFile = path.join(outputDir, `${scenarioId}.js`)

    try {
      const jsonPath = path.join(inputDir, file)
      const jsonData = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'))
      const jsContent = convertJsonToJs(jsonData, scenarioId)

      if (opts.dryRun) {
        console.log(`[DRY RUN] Would write: ${outputFile}`)
        console.log(jsContent.slice(0, 500) + '...\n')
      } else {
        if (!fs.existsSync(outputDir)) {
          fs.mkdirSync(outputDir, { recursive: true })
        }
        fs.writeFileSync(outputFile, jsContent)
        console.log(`✓ ${scenarioId} -> ${path.relative(process.cwd(), outputFile)}`)
      }
      converted++
    } catch (err) {
      console.error(`✗ ${scenarioId}: ${err.message}`)
    }
  }

  console.log(`\nConverted ${converted}/${files.length} scenarios`)
}

main().catch(console.error)
