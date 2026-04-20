#!/usr/bin/env node
/**
 * Patches src/ranges/index.js to add GTOWizard data as a new game type.
 *
 * Usage:
 *   node patch-index.js
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const indexPath = path.join(__dirname, '..', '..', 'src', 'ranges', 'index.js')

// GTOWizard imports
const imports = `
// ═══════════════════════════════════════════════════════════════════════════
// GTOWizard NL100 100bb imports
// ═══════════════════════════════════════════════════════════════════════════
import gw_100_100_bb_vs_4b_btn from './cash_6max_gtowiz/nl100/100bb/vs4b/bb_vs_4b_btn.js'
import gw_100_100_bb_vs_4b_co from './cash_6max_gtowiz/nl100/100bb/vs4b/bb_vs_4b_co.js'
import gw_100_100_bb_vs_4b_hj from './cash_6max_gtowiz/nl100/100bb/vs4b/bb_vs_4b_hj.js'
import gw_100_100_bb_vs_4b_sb from './cash_6max_gtowiz/nl100/100bb/vs4b/bb_vs_4b_sb.js'
import gw_100_100_bb_vs_4b_utg from './cash_6max_gtowiz/nl100/100bb/vs4b/bb_vs_4b_utg.js'
import gw_100_100_bb_vs_btn from './cash_6max_gtowiz/nl100/100bb/vs_rfi/bb_vs_btn.js'
import gw_100_100_bb_vs_co from './cash_6max_gtowiz/nl100/100bb/vs_rfi/bb_vs_co.js'
import gw_100_100_bb_vs_hj from './cash_6max_gtowiz/nl100/100bb/vs_rfi/bb_vs_hj.js'
import gw_100_100_bb_vs_sb from './cash_6max_gtowiz/nl100/100bb/vs_rfi/bb_vs_sb.js'
import gw_100_100_bb_vs_utg from './cash_6max_gtowiz/nl100/100bb/vs_rfi/bb_vs_utg.js'
import gw_100_100_btn_vs_3b_bb from './cash_6max_gtowiz/nl100/100bb/vs3b/btn_vs_3b_bb.js'
import gw_100_100_btn_vs_3b_sb from './cash_6max_gtowiz/nl100/100bb/vs3b/btn_vs_3b_sb.js'
import gw_100_100_btn_vs_4b_co from './cash_6max_gtowiz/nl100/100bb/vs4b/btn_vs_4b_co.js'
import gw_100_100_btn_vs_4b_hj from './cash_6max_gtowiz/nl100/100bb/vs4b/btn_vs_4b_hj.js'
import gw_100_100_btn_vs_4b_utg from './cash_6max_gtowiz/nl100/100bb/vs4b/btn_vs_4b_utg.js'
import gw_100_100_btn_vs_5b_bb from './cash_6max_gtowiz/nl100/100bb/vs5b/btn_vs_5b_bb.js'
import gw_100_100_btn_vs_5b_sb from './cash_6max_gtowiz/nl100/100bb/vs5b/btn_vs_5b_sb.js'
import gw_100_100_btn_vs_co from './cash_6max_gtowiz/nl100/100bb/vs_rfi/btn_vs_co.js'
import gw_100_100_btn_vs_hj from './cash_6max_gtowiz/nl100/100bb/vs_rfi/btn_vs_hj.js'
import gw_100_100_btn_vs_utg from './cash_6max_gtowiz/nl100/100bb/vs_rfi/btn_vs_utg.js'
import gw_100_100_co_vs_3b_bb from './cash_6max_gtowiz/nl100/100bb/vs3b/co_vs_3b_bb.js'
import gw_100_100_co_vs_3b_btn from './cash_6max_gtowiz/nl100/100bb/vs3b/co_vs_3b_btn.js'
import gw_100_100_co_vs_3b_sb from './cash_6max_gtowiz/nl100/100bb/vs3b/co_vs_3b_sb.js'
import gw_100_100_co_vs_4b_hj from './cash_6max_gtowiz/nl100/100bb/vs4b/co_vs_4b_hj.js'
import gw_100_100_co_vs_4b_utg from './cash_6max_gtowiz/nl100/100bb/vs4b/co_vs_4b_utg.js'
import gw_100_100_co_vs_5b_bb from './cash_6max_gtowiz/nl100/100bb/vs5b/co_vs_5b_bb.js'
import gw_100_100_co_vs_5b_btn from './cash_6max_gtowiz/nl100/100bb/vs5b/co_vs_5b_btn.js'
import gw_100_100_co_vs_5b_sb from './cash_6max_gtowiz/nl100/100bb/vs5b/co_vs_5b_sb.js'
import gw_100_100_co_vs_hj from './cash_6max_gtowiz/nl100/100bb/vs_rfi/co_vs_hj.js'
import gw_100_100_co_vs_utg from './cash_6max_gtowiz/nl100/100bb/vs_rfi/co_vs_utg.js'
import gw_100_100_hj_vs_3b_bb from './cash_6max_gtowiz/nl100/100bb/vs3b/hj_vs_3b_bb.js'
import gw_100_100_hj_vs_3b_btn from './cash_6max_gtowiz/nl100/100bb/vs3b/hj_vs_3b_btn.js'
import gw_100_100_hj_vs_3b_co from './cash_6max_gtowiz/nl100/100bb/vs3b/hj_vs_3b_co.js'
import gw_100_100_hj_vs_3b_sb from './cash_6max_gtowiz/nl100/100bb/vs3b/hj_vs_3b_sb.js'
import gw_100_100_hj_vs_4b_utg from './cash_6max_gtowiz/nl100/100bb/vs4b/hj_vs_4b_utg.js'
import gw_100_100_hj_vs_5b_bb from './cash_6max_gtowiz/nl100/100bb/vs5b/hj_vs_5b_bb.js'
import gw_100_100_hj_vs_5b_btn from './cash_6max_gtowiz/nl100/100bb/vs5b/hj_vs_5b_btn.js'
import gw_100_100_hj_vs_5b_co from './cash_6max_gtowiz/nl100/100bb/vs5b/hj_vs_5b_co.js'
import gw_100_100_hj_vs_5b_sb from './cash_6max_gtowiz/nl100/100bb/vs5b/hj_vs_5b_sb.js'
import gw_100_100_hj_vs_utg from './cash_6max_gtowiz/nl100/100bb/vs_rfi/hj_vs_utg.js'
import gw_100_100_rfi_btn from './cash_6max_gtowiz/nl100/100bb/rfi/rfi_btn.js'
import gw_100_100_rfi_co from './cash_6max_gtowiz/nl100/100bb/rfi/rfi_co.js'
import gw_100_100_rfi_hj from './cash_6max_gtowiz/nl100/100bb/rfi/rfi_hj.js'
import gw_100_100_rfi_sb from './cash_6max_gtowiz/nl100/100bb/rfi/rfi_sb.js'
import gw_100_100_rfi_utg from './cash_6max_gtowiz/nl100/100bb/rfi/rfi_utg.js'
import gw_100_100_sb_vs_3b_bb from './cash_6max_gtowiz/nl100/100bb/vs3b/sb_vs_3b_bb.js'
import gw_100_100_sb_vs_4b_btn from './cash_6max_gtowiz/nl100/100bb/vs4b/sb_vs_4b_btn.js'
import gw_100_100_sb_vs_4b_co from './cash_6max_gtowiz/nl100/100bb/vs4b/sb_vs_4b_co.js'
import gw_100_100_sb_vs_4b_hj from './cash_6max_gtowiz/nl100/100bb/vs4b/sb_vs_4b_hj.js'
import gw_100_100_sb_vs_4b_utg from './cash_6max_gtowiz/nl100/100bb/vs4b/sb_vs_4b_utg.js'
import gw_100_100_sb_vs_5b_bb from './cash_6max_gtowiz/nl100/100bb/vs5b/sb_vs_5b_bb.js'
import gw_100_100_sb_vs_btn from './cash_6max_gtowiz/nl100/100bb/vs_rfi/sb_vs_btn.js'
import gw_100_100_sb_vs_co from './cash_6max_gtowiz/nl100/100bb/vs_rfi/sb_vs_co.js'
import gw_100_100_sb_vs_hj from './cash_6max_gtowiz/nl100/100bb/vs_rfi/sb_vs_hj.js'
import gw_100_100_sb_vs_utg from './cash_6max_gtowiz/nl100/100bb/vs_rfi/sb_vs_utg.js'
import gw_100_100_utg_vs_3b_bb from './cash_6max_gtowiz/nl100/100bb/vs3b/utg_vs_3b_bb.js'
import gw_100_100_utg_vs_3b_btn from './cash_6max_gtowiz/nl100/100bb/vs3b/utg_vs_3b_btn.js'
import gw_100_100_utg_vs_3b_co from './cash_6max_gtowiz/nl100/100bb/vs3b/utg_vs_3b_co.js'
import gw_100_100_utg_vs_3b_hj from './cash_6max_gtowiz/nl100/100bb/vs3b/utg_vs_3b_hj.js'
import gw_100_100_utg_vs_3b_sb from './cash_6max_gtowiz/nl100/100bb/vs3b/utg_vs_3b_sb.js'
import gw_100_100_utg_vs_5b_bb from './cash_6max_gtowiz/nl100/100bb/vs5b/utg_vs_5b_bb.js'
import gw_100_100_utg_vs_5b_btn from './cash_6max_gtowiz/nl100/100bb/vs5b/utg_vs_5b_btn.js'
import gw_100_100_utg_vs_5b_co from './cash_6max_gtowiz/nl100/100bb/vs5b/utg_vs_5b_co.js'
import gw_100_100_utg_vs_5b_hj from './cash_6max_gtowiz/nl100/100bb/vs5b/utg_vs_5b_hj.js'
import gw_100_100_utg_vs_5b_sb from './cash_6max_gtowiz/nl100/100bb/vs5b/utg_vs_5b_sb.js'
`

// GTOWizard game type entry
const gameTypeEntry = `
  {
    id: 'cash_6max_gtowiz',
    label: '6max Cash (GTOWiz)',
    stakes: [
      {
        id: 'nl100', label: 'NL100',
        stackSizes: [
          { id: '100bb', label: '100bb', scenarios: makeScenarios({
            rfi_utg: gw_100_100_rfi_utg,
            rfi_hj: gw_100_100_rfi_hj,
            rfi_co: gw_100_100_rfi_co,
            rfi_btn: gw_100_100_rfi_btn,
            rfi_sb: gw_100_100_rfi_sb,
            bb_vs_utg: gw_100_100_bb_vs_utg,
            bb_vs_hj: gw_100_100_bb_vs_hj,
            bb_vs_co: gw_100_100_bb_vs_co,
            bb_vs_btn: gw_100_100_bb_vs_btn,
            bb_vs_sb: gw_100_100_bb_vs_sb,
            sb_vs_utg: gw_100_100_sb_vs_utg,
            sb_vs_hj: gw_100_100_sb_vs_hj,
            sb_vs_co: gw_100_100_sb_vs_co,
            sb_vs_btn: gw_100_100_sb_vs_btn,
            btn_vs_utg: gw_100_100_btn_vs_utg,
            btn_vs_hj: gw_100_100_btn_vs_hj,
            btn_vs_co: gw_100_100_btn_vs_co,
            co_vs_utg: gw_100_100_co_vs_utg,
            co_vs_hj: gw_100_100_co_vs_hj,
            hj_vs_utg: gw_100_100_hj_vs_utg,
            utg_vs_3b_hj: gw_100_100_utg_vs_3b_hj,
            utg_vs_3b_co: gw_100_100_utg_vs_3b_co,
            utg_vs_3b_btn: gw_100_100_utg_vs_3b_btn,
            utg_vs_3b_sb: gw_100_100_utg_vs_3b_sb,
            utg_vs_3b_bb: gw_100_100_utg_vs_3b_bb,
            hj_vs_3b_co: gw_100_100_hj_vs_3b_co,
            hj_vs_3b_btn: gw_100_100_hj_vs_3b_btn,
            hj_vs_3b_sb: gw_100_100_hj_vs_3b_sb,
            hj_vs_3b_bb: gw_100_100_hj_vs_3b_bb,
            co_vs_3b_btn: gw_100_100_co_vs_3b_btn,
            co_vs_3b_sb: gw_100_100_co_vs_3b_sb,
            co_vs_3b_bb: gw_100_100_co_vs_3b_bb,
            btn_vs_3b_sb: gw_100_100_btn_vs_3b_sb,
            btn_vs_3b_bb: gw_100_100_btn_vs_3b_bb,
            sb_vs_3b_bb: gw_100_100_sb_vs_3b_bb,
            bb_vs_4b_utg: gw_100_100_bb_vs_4b_utg,
            bb_vs_4b_hj: gw_100_100_bb_vs_4b_hj,
            bb_vs_4b_co: gw_100_100_bb_vs_4b_co,
            bb_vs_4b_btn: gw_100_100_bb_vs_4b_btn,
            bb_vs_4b_sb: gw_100_100_bb_vs_4b_sb,
            sb_vs_4b_utg: gw_100_100_sb_vs_4b_utg,
            sb_vs_4b_hj: gw_100_100_sb_vs_4b_hj,
            sb_vs_4b_co: gw_100_100_sb_vs_4b_co,
            sb_vs_4b_btn: gw_100_100_sb_vs_4b_btn,
            btn_vs_4b_utg: gw_100_100_btn_vs_4b_utg,
            btn_vs_4b_hj: gw_100_100_btn_vs_4b_hj,
            btn_vs_4b_co: gw_100_100_btn_vs_4b_co,
            co_vs_4b_utg: gw_100_100_co_vs_4b_utg,
            co_vs_4b_hj: gw_100_100_co_vs_4b_hj,
            hj_vs_4b_utg: gw_100_100_hj_vs_4b_utg,
            utg_vs_5b_bb: gw_100_100_utg_vs_5b_bb,
            utg_vs_5b_sb: gw_100_100_utg_vs_5b_sb,
            utg_vs_5b_btn: gw_100_100_utg_vs_5b_btn,
            utg_vs_5b_co: gw_100_100_utg_vs_5b_co,
            utg_vs_5b_hj: gw_100_100_utg_vs_5b_hj,
            hj_vs_5b_bb: gw_100_100_hj_vs_5b_bb,
            hj_vs_5b_sb: gw_100_100_hj_vs_5b_sb,
            hj_vs_5b_btn: gw_100_100_hj_vs_5b_btn,
            hj_vs_5b_co: gw_100_100_hj_vs_5b_co,
            co_vs_5b_bb: gw_100_100_co_vs_5b_bb,
            co_vs_5b_sb: gw_100_100_co_vs_5b_sb,
            co_vs_5b_btn: gw_100_100_co_vs_5b_btn,
            btn_vs_5b_bb: gw_100_100_btn_vs_5b_bb,
            btn_vs_5b_sb: gw_100_100_btn_vs_5b_sb,
            sb_vs_5b_bb: gw_100_100_sb_vs_5b_bb,
          }) },
        ],
      },
    ],
  },`

function main() {
  let content = fs.readFileSync(indexPath, 'utf-8')

  // Check if already patched
  if (content.includes('cash_6max_gtowiz')) {
    console.log('Already patched - GTOWizard data already present in index.js')
    return
  }

  // Find last import line
  const lines = content.split('\n')
  let lastImportLine = -1
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].startsWith('import ')) {
      lastImportLine = i
    }
  }

  if (lastImportLine === -1) {
    console.error('Could not find import statements in index.js')
    process.exit(1)
  }

  // Insert imports after last import
  lines.splice(lastImportLine + 1, 0, imports)

  // Find the closing bracket of gameTypes array and insert before it
  const newContent = lines.join('\n')
  const finalContent = newContent.replace(
    /(\nexport const gameTypes = \[[\s\S]*?)(\n\])/,
    `$1${gameTypeEntry}$2`
  )

  // Write back
  fs.writeFileSync(indexPath, finalContent)
  console.log('Successfully patched src/ranges/index.js with GTOWizard data!')
  console.log('Added:')
  console.log('  - 65 import statements for GTOWizard NL100 100bb')
  console.log('  - New game type: "6max Cash (GTOWiz)"')
}

main()
