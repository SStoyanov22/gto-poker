// ── Game type / stake / stack configuration ───────────────────────────────────
//
// Defines the UI hierarchy: game type → stakes → stack sizes.
// Scenario lists are shared across all stacks (data availability is handled
// at load time by the registry returning null for missing combinations).
// ─────────────────────────────────────────────────────────────────────────────

import SCENARIO_DEFS from './scenarios.js'
import MTT_SCENARIO_DEFS from './mttScenarios.js'

export const PFR_SIZES = ['2bb', '2.25bb', '2.5bb', '3bb']

function makeStack(id, label, scenarios = SCENARIO_DEFS) {
  return { id, label, scenarios }
}

const mttStack = (bb) => makeStack(`${bb}bb`, `${bb}bb`, MTT_SCENARIO_DEFS)

export const gameTypes = [
  {
    id: 'cash_6max',
    label: '6-max Cash',
    stakes: [
      {
        id: 'nl100',
        label: 'NL100',
        stackSizes: [
          // Row 1: Short stacks (10-90bb)
          makeStack('40bb',  '40bb'),
          makeStack('50bb',  '50bb'),
          makeStack('70bb',  '70bb'),
          // Row 2: Standard stacks (100-190bb)
          makeStack('100bb', '100bb'),
          makeStack('125bb', '125bb'),
          makeStack('150bb', '150bb'),
          // Row 3: Deep stacks (200bb+)
          makeStack('200bb', '200bb'),
        ],
        defaultStack: '100bb',
      },
    ],
  },
  {
    id: 'mtt_8max',
    label: 'MTT 8-max',
    // No `stakes` layer — MTT solutions are stack-only (no NL100/200 distinction).
    // 90bb omitted: account doesn't have GTOWizard solutions at that depth.
    stackSizes: [
      mttStack(10), mttStack(20), mttStack(22), mttStack(25), mttStack(26), mttStack(28),
      mttStack(30), mttStack(32), mttStack(35), mttStack(38), mttStack(40), mttStack(45),
      mttStack(50), mttStack(55), mttStack(60), mttStack(70), mttStack(80), mttStack(100),
      mttStack(130), mttStack(160), mttStack(200),
    ],
    defaultStack: '40bb',
  },
]
