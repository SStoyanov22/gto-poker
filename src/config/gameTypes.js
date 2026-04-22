// ── Game type / stake / stack configuration ───────────────────────────────────
//
// Defines the UI hierarchy: game type → stakes → stack sizes.
// Scenario lists are shared across all stacks (data availability is handled
// at load time by the registry returning null for missing combinations).
// ─────────────────────────────────────────────────────────────────────────────

import SCENARIO_DEFS from './scenarios.js'

export const PFR_SIZES = ['2bb', '2.25bb', '2.5bb', '3bb']

function makeStack(id, label) {
  return { id, label, scenarios: SCENARIO_DEFS }
}

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
]
