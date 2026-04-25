import React, { useState, useMemo, useEffect } from 'react'
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
const defaultStackSizes = (defaultStake ?? defaultGameType).stackSizes
const defaultStackId = (defaultStake ?? defaultGameType).defaultStack ?? '100bb'
const defaultStackSize = defaultStackSizes.find(s => s.id === defaultStackId) ?? defaultStackSizes[0]
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
    return `${gt.label}, ${selectedStackSizeId}`
  }, [selectedGameTypeId, selectedStakeId, selectedStackSizeId, selectedPfrSizeId])

  // ── Load range data from processed JSON registry (async) ──────────────────
  const [rangeData, setRangeData] = useState({
    raiseData: {},
    raise2Data: {},
    callData: {},
    foldData: {},
    raiseTo: null,
    inRangeSet: null,
    stats: {
      totalCombos: 0, raise1Combos: 0, raise2Combos: 0, callCombos: 0, foldCombos: 0,
      totalPct: '0.0', raise1Pct: '0.0', raise2Pct: '0.0', callPct: '0.0', foldPct: '0.0',
      hasCall: false, hasRaise2: false, hasFold: false, hasData: false,
      raise1Size: null, raise2Size: null,
    },
  })

  useEffect(() => {
    let cancelled = false

    async function loadRange() {
      // For game types without a `stakes` layer (MTT), synthesize 'mtt' as the lookup stake.
      const gt = gameTypes.find(g => g.id === selectedGameTypeId)
      const lookupStake = selectedStakeId ?? (gt.stakes ? null : 'mtt')
      const raw = await getRange(lookupStake, selectedPfrSizeId, selectedStackSizeId, activeScenario.id)
      if (cancelled) return

      const data = raw ?? {}

      // Use combo frequencies (absolute) for BOTH grid display AND statistics
      const combos = data.combos ?? { raise: {}, call: {}, fold: {} }

      const comboRaiseEntries = Object.entries(combos.raise ?? {})
        .sort((a, b) => parseFloat(a[0]) - parseFloat(b[0]))

      let raiseData  = {}
      let raise2Data = {}
      let raiseTo    = null

      if (comboRaiseEntries.length >= 2) {
        raise2Data = comboRaiseEntries[comboRaiseEntries.length - 1][1]
        raiseData  = mergeFreqMaps(comboRaiseEntries.slice(0, -1).map(e => e[1]))
        raiseTo    = comboRaiseEntries.map(e => e[0])
      } else if (comboRaiseEntries.length === 1) {
        raiseData = comboRaiseEntries[0][1]
        raiseTo   = comboRaiseEntries[0][0]
      }

      const callData = mergeFreqMaps(Object.values(combos.call ?? {}))
      const foldData = combos.fold ?? {}

      // Stats using combo frequencies (absolute)
      const raise1Combos = countCombos(raiseData)
      const raise2Combos = countCombos(raise2Data)
      const callCombos   = countCombos(callData)
      const foldCombos   = countCombos(foldData)

      const totalActionCombos = raise1Combos + raise2Combos + callCombos

      // Create set of hands that are "in range" for this spot
      const inRangeSet = raw?.inRange ? new Set(raw.inRange) : null

      // Get raise size labels
      const sizes = raiseTo ? [raiseTo].flat() : []
      const raise1Size = sizes.length >= 1 ? sizes[0] : null
      const raise2Size = sizes.length >= 2 ? sizes[sizes.length - 1] : null

      setRangeData({
        raiseData,
        raise2Data,
        callData,
        foldData,
        raiseTo,
        inRangeSet,
        stats: {
          totalCombos:  Math.round(totalActionCombos * 10) / 10,
          raise1Combos: Math.round(raise1Combos * 10) / 10,
          raise2Combos: Math.round(raise2Combos * 10) / 10,
          callCombos:   Math.round(callCombos * 10) / 10,
          foldCombos:   Math.round(foldCombos * 10) / 10,
          totalPct:     ((totalActionCombos / TOTAL_COMBOS) * 100).toFixed(1),
          raise1Pct:    ((raise1Combos / TOTAL_COMBOS) * 100).toFixed(1),
          raise2Pct:    ((raise2Combos / TOTAL_COMBOS) * 100).toFixed(1),
          callPct:      ((callCombos / TOTAL_COMBOS) * 100).toFixed(1),
          foldPct:      ((foldCombos / TOTAL_COMBOS) * 100).toFixed(1),
          hasCall:      callCombos > 0,
          hasRaise2:    raise2Combos > 0,
          hasFold:      foldCombos > 0.1,
          hasData:      !!raw,
          raise1Size,
          raise2Size,
        },
      })
    }

    loadRange()
    return () => { cancelled = true }
  }, [activeScenario, selectedGameTypeId, selectedStakeId, selectedPfrSizeId, selectedStackSizeId])

  const { raiseData, raise2Data, callData, foldData, raiseTo, inRangeSet, stats } = rangeData

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
            onGameTypeChange={handleGameTypeChange}
            onStakeChange={handleStakeChange}
            onStackSizeChange={handleStackSizeChange}
            onScenarioChange={(id) => {
              setSelectedScenarioId(id)
              setVs4bIsAllin(false)
              setVsSqueezeRfiFolds(false)
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
            foldData={foldData}
            raiseTo={raiseTo}
            callLabel={activeScenario.callLabel ?? 'Call'}
            inRangeSet={inRangeSet}
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
                  <span className="stat-combos">{stats.totalCombos} combos</span>
                </div>

                {/* Raise 1 (smaller size) */}
                {stats.raise1Combos > 0 && (
                  <div className="stat-item stat-raise">
                    <span className="stat-label">Raise{stats.raise1Size ? ` ${stats.raise1Size}` : ''}</span>
                    <span className="stat-value">{stats.raise1Pct}%</span>
                    <span className="stat-combos">{stats.raise1Combos} combos</span>
                  </div>
                )}

                {/* Raise 2 (larger size / all-in) */}
                {stats.hasRaise2 && (
                  <div className="stat-item stat-raise2">
                    <span className="stat-label">Raise{stats.raise2Size ? ` ${stats.raise2Size}` : ' (all-in)'}</span>
                    <span className="stat-value">{stats.raise2Pct}%</span>
                    <span className="stat-combos">{stats.raise2Combos} combos</span>
                  </div>
                )}

                {/* Call */}
                {stats.hasCall && (
                  <div className="stat-item stat-call">
                    <span className="stat-label">{activeScenario.callLabel ?? 'Call'}</span>
                    <span className="stat-value">{stats.callPct}%</span>
                    <span className="stat-combos">{stats.callCombos} combos</span>
                  </div>
                )}

                {/* Fold */}
                {stats.hasFold && (
                  <div className="stat-item stat-fold">
                    <span className="stat-label">Fold</span>
                    <span className="stat-value">{stats.foldPct}%</span>
                    <span className="stat-combos">{stats.foldCombos} combos</span>
                  </div>
                )}
              </div>
            )}

          </div>
        </main>

      </div>
    </div>
  )
}
