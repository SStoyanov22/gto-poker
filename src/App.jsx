import React, { useState, useMemo } from 'react'
import './App.css'
import { gameTypes, PFR_SIZES } from './config/gameTypes.js'
import { getRange } from './data/registry.js'
import { countCombos, TOTAL_COMBOS } from './utils/rangeUtils.js'
import RangeGrid from './components/RangeGrid.jsx'
import ScenarioSelector from './components/ScenarioSelector.jsx'

// ── Helpers ───────────────────────────────────────────────────────────────────

function getStackSizes(gameType, stakeId) {
  if (gameType.stakes) {
    return gameType.stakes.find(s => s.id === stakeId)?.stackSizes ?? gameType.stakes[0].stackSizes
  }
  return gameType.stackSizes
}

// Merge one or more { handType: freq } maps (used when combining call sizes)
function mergeFreqMaps(maps) {
  const merged = {}
  for (const map of maps) {
    for (const [hand, freq] of Object.entries(map)) {
      merged[hand] = Math.min(1, (merged[hand] ?? 0) + freq)
    }
  }
  return merged
}

// Build a human-readable name from a scenario definition
function scenarioName(def) {
  if (!def) return ''
  const { section, group, label } = def
  if (section === 'RFI') return `${group} RFI`
  const cleanLabel = label
    .replace(/^vs /, '')
    .replace(/ [345]b$/, '')
    .replace(/ limp$/, '')
  return `${group} ${cleanLabel}`
}

// ── Defaults ──────────────────────────────────────────────────────────────────

const defaultGameType  = gameTypes[0]
const defaultStake     = defaultGameType.stakes?.find(s => s.id === 'nl100') ?? defaultGameType.stakes?.[0] ?? null
const defaultStackSize = (defaultStake ?? defaultGameType).stackSizes[0]
const defaultScenario  = defaultStackSize.scenarios[0]

// ── App ───────────────────────────────────────────────────────────────────────

export default function App() {
  const [selectedGameTypeId,  setSelectedGameTypeId]  = useState(defaultGameType.id)
  const [selectedStakeId,     setSelectedStakeId]     = useState(defaultStake?.id ?? null)
  const [selectedStackSizeId, setSelectedStackSizeId] = useState(defaultStackSize.id)
  const [selectedScenarioId,  setSelectedScenarioId]  = useState(defaultScenario.id)
  const [selectedPfrSizeId,   setSelectedPfrSizeId]   = useState('2.5bb')
  const [vs4bIsAllin,         setVs4bIsAllin]         = useState(false)
  const [vsSqueezeRfiFolds,   setVsSqueezeRfiFolds]   = useState(false)
  const [sqzVs4bType,         setSqzVs4bType]         = useState('rfi_4b') // 'rfi_4b' | 'cc_fold' | 'cc_call'

  const handleGameTypeChange = (gameTypeId) => {
    const gt         = gameTypes.find(g => g.id === gameTypeId)
    const newStake   = gt.stakes?.[0] ?? null
    const stackSizes = getStackSizes(gt, newStake?.id)
    const newStack   = stackSizes.find(s => s.id === selectedStackSizeId) ?? stackSizes[0]
    const newScene   = newStack.scenarios.find(s => s.id === selectedScenarioId) ?? newStack.scenarios[0]
    setSelectedGameTypeId(gameTypeId)
    setSelectedStakeId(newStake?.id ?? null)
    setSelectedStackSizeId(newStack.id)
    setSelectedScenarioId(newScene.id)
  }

  const handleStakeChange = (stakeId) => {
    const gt         = gameTypes.find(g => g.id === selectedGameTypeId)
    const stackSizes = getStackSizes(gt, stakeId)
    const newStack   = stackSizes.find(s => s.id === selectedStackSizeId) ?? stackSizes[0]
    const newScene   = newStack.scenarios.find(s => s.id === selectedScenarioId) ?? newStack.scenarios[0]
    setSelectedStakeId(stakeId)
    setSelectedStackSizeId(newStack.id)
    setSelectedScenarioId(newScene.id)
  }

  const handleStackSizeChange = (stackSizeId) => {
    const gt         = gameTypes.find(g => g.id === selectedGameTypeId)
    const stackSizes = getStackSizes(gt, selectedStakeId)
    const newStack   = stackSizes.find(s => s.id === stackSizeId)
    const newScene   = newStack.scenarios.find(s => s.id === selectedScenarioId) ?? newStack.scenarios[0]
    setSelectedStackSizeId(stackSizeId)
    setSelectedScenarioId(newScene.id)
  }

  // The scenario def selected in the UI (may differ from activeScenario due to toggles)
  const selectedScenario = useMemo(() => {
    const gt         = gameTypes.find(g => g.id === selectedGameTypeId)
    const stackSizes = getStackSizes(gt, selectedStakeId)
    const stack      = stackSizes.find(s => s.id === selectedStackSizeId) ?? stackSizes[0]
    return stack.scenarios.find(s => s.id === selectedScenarioId) ?? stack.scenarios[0]
  }, [selectedGameTypeId, selectedStakeId, selectedStackSizeId, selectedScenarioId])

  // The effective scenario def after applying toggles (vs4b allin, sqz rfi-folds)
  const activeScenario = useMemo(() => {
    const gt         = gameTypes.find(g => g.id === selectedGameTypeId)
    const stackSizes = getStackSizes(gt, selectedStakeId)
    const stack      = stackSizes.find(s => s.id === selectedStackSizeId) ?? stackSizes[0]

    if (vs4bIsAllin && selectedScenario?.section === 'vs 4b') {
      const allinId = selectedScenario.id.replace('_vs_4b_', '_vs_4b_allin_')
      return stack.scenarios.find(s => s.id === allinId) ?? selectedScenario
    }
    if (vsSqueezeRfiFolds && selectedScenario?.coldCaller) {
      const foldId = selectedScenario.id + '_rfi_fold'
      return stack.scenarios.find(s => s.id === foldId) ?? selectedScenario
    }
    return selectedScenario
  }, [selectedScenario, vs4bIsAllin, vsSqueezeRfiFolds, selectedGameTypeId, selectedStakeId, selectedStackSizeId])

  const scenarioContext = useMemo(() => {
    const gt = gameTypes.find(g => g.id === selectedGameTypeId)
    if (gt.stakes) {
      const stake = gt.stakes.find(s => s.id === selectedStakeId)
      return `6-max, ${stake.label}, ${selectedPfrSizeId}`
    }
    return `Tournament, ${selectedStackSizeId}, ${selectedPfrSizeId}`
  }, [selectedGameTypeId, selectedStakeId, selectedStackSizeId, selectedPfrSizeId])

  // ── Load range data from processed JSON registry ──────────────────────────
  const { raiseData, raise2Data, callData, raiseTo, stats } = useMemo(() => {
    const raw = getRange(selectedStakeId, selectedPfrSizeId, selectedStackSizeId, activeScenario.id)

    // Handle sqz vs 4b variant key (rfi_4b / cc_fold / cc_call)
    const data = (activeScenario.section === 'sqz vs 4b')
      ? raw?.[sqzVs4bType] ?? {}
      : raw ?? {}

    // call: merge all size maps into one frequency map
    const callData = mergeFreqMaps(Object.values(data.call ?? {}))

    // raise: sort sizes, smallest → raiseData (teal), largest → raise2Data (dark green)
    const raiseEntries = Object.entries(data.raise ?? {})
      .sort((a, b) => parseFloat(a[0]) - parseFloat(b[0]))

    let raiseData  = {}
    let raise2Data = {}
    let raiseTo    = null

    if (raiseEntries.length >= 2) {
      raise2Data = raiseEntries[raiseEntries.length - 1][1]
      raiseData  = mergeFreqMaps(raiseEntries.slice(0, -1).map(e => e[1]))
      raiseTo    = raiseEntries.map(e => e[0])
    } else if (raiseEntries.length === 1) {
      raiseData = raiseEntries[0][1]
      raiseTo   = raiseEntries[0][0]
    }

    // Stats
    const mergedRaise  = mergeFreqMaps([raiseData, raise2Data])
    const raiseCombos  = countCombos(mergedRaise)
    const callCombos   = countCombos(callData)
    const totalCombos  = raiseCombos + callCombos

    return {
      raiseData,
      raise2Data,
      callData,
      raiseTo,
      stats: {
        totalCombos: Math.round(totalCombos  * 10) / 10,
        raiseCombos: Math.round(raiseCombos  * 10) / 10,
        callCombos:  Math.round(callCombos   * 10) / 10,
        totalPct:    ((totalCombos  / TOTAL_COMBOS) * 100).toFixed(1),
        raisePct:    ((raiseCombos  / TOTAL_COMBOS) * 100).toFixed(1),
        callPct:     ((callCombos   / TOTAL_COMBOS) * 100).toFixed(1),
        hasCall:     callCombos > 0,
        hasData:     !!raw,
      },
    }
  }, [activeScenario, selectedStakeId, selectedPfrSizeId, selectedStackSizeId, sqzVs4bType])

  return (
    <div className="app">

      {/* ── Header ── */}
      <header className="app-header">
        <div className="app-logo">
          <span className="app-logo-icon">♠</span>
          <span className="app-logo-text">GTO Preflop Ranges</span>
        </div>
      </header>

      {/* ── Body: left panel + grid ── */}
      <div className="app-body">

        {/* Left panel */}
        <aside className="left-panel">
          <ScenarioSelector
            gameTypes={gameTypes}
            pfrSizes={PFR_SIZES}
            selectedGameTypeId={selectedGameTypeId}
            selectedStakeId={selectedStakeId}
            selectedStackSizeId={selectedStackSizeId}
            selectedScenarioId={selectedScenarioId}
            selectedPfrSizeId={selectedPfrSizeId}
            vs4bIsAllin={vs4bIsAllin}
            onVs4bAllinChange={setVs4bIsAllin}
            vsSqueezeRfiFolds={vsSqueezeRfiFolds}
            onVsSqueezeRfiFoldsChange={setVsSqueezeRfiFolds}
            sqzVs4bType={sqzVs4bType}
            onSqzVs4bTypeChange={setSqzVs4bType}
            onGameTypeChange={handleGameTypeChange}
            onStakeChange={handleStakeChange}
            onStackSizeChange={handleStackSizeChange}
            onScenarioChange={(id) => {
              setSelectedScenarioId(id)
              setVs4bIsAllin(false)
              setVsSqueezeRfiFolds(false)
              setSqzVs4bType('rfi_4b')
            }}
            onPfrSizeChange={setSelectedPfrSizeId}
          />
        </aside>

        {/* Grid + info bar */}
        <main className="right-panel">
          <RangeGrid
            raiseData={raiseData}
            raise2Data={raise2Data}
            callData={callData}
            raiseTo={raiseTo}
            callLabel={activeScenario.callLabel ?? 'Call'}
          />

          <div className="grid-info-overlay">
            <div className="scenario-context">{scenarioContext}</div>
            <div className="scenario-title">{scenarioName(activeScenario)}</div>

            {!stats.hasData ? (
              <div className="no-data-msg">No data scraped for this combination yet.</div>
            ) : (
              <div className="stats-block">
                <div className="stat-item">
                  <span className="stat-label">Total range</span>
                  <span className="stat-value">{stats.totalPct}%</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Combos</span>
                  <span className="stat-value">{stats.totalCombos}</span>
                </div>
                {stats.hasCall ? (
                  <>
                    <div className="stat-item">
                      <span className="stat-label">Raise</span>
                      <span className="stat-value raise-value">{stats.raisePct}%</span>
                      <span className="stat-combos raise-value">{stats.raiseCombos} combos</span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-label">{activeScenario.callLabel ?? 'Call'}</span>
                      <span className="stat-value call-value">{stats.callPct}%</span>
                      <span className="stat-combos call-value">{stats.callCombos} combos</span>
                    </div>
                  </>
                ) : (
                  <div className="stat-item">
                    <span className="stat-label">Raise</span>
                    <span className="stat-value raise-value">{stats.raisePct}%</span>
                    <span className="stat-combos raise-value">{stats.raiseCombos} combos</span>
                  </div>
                )}
                {raiseTo && (
                  <div className="stat-item">
                    <span className="stat-label">Raise to</span>
                    {[raiseTo].flat().map(size => (
                      <span key={size} className="stat-value raise-value">{size}</span>
                    ))}
                  </div>
                )}
              </div>
            )}

            <div className="legend">
              <div className="legend-item">
                <span className="legend-swatch raise" />Raise
              </div>
              {stats.hasCall && (
                <div className="legend-item">
                  <span className="legend-swatch call" />{activeScenario.callLabel ?? 'Call'}
                </div>
              )}
              <div className="legend-item">
                <span className="legend-swatch fold" />Fold
              </div>
            </div>
          </div>
        </main>

      </div>
    </div>
  )
}
