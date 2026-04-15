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
          makeStack('100bb', '100bb'),
          makeStack('150bb', '150bb'),
          makeStack('200bb', '200bb'),
          makeStack('70bb',  '70bb'),
          makeStack('50bb',  '50bb'),
          makeStack('40bb',  '40bb'),
        ],
      },
    ],
  },
]
