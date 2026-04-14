import React, { useState, useMemo } from 'react'
import './App.css'
import { gameTypes, PFR_SIZES } from './ranges/index.js'
import { parseRangeString, countCombos, TOTAL_COMBOS } from './utils/rangeUtils.js'
import RangeGrid from './components/RangeGrid.jsx'
import ScenarioSelector from './components/ScenarioSelector.jsx'

const defaultGameType  = gameTypes[0]
const defaultStake     = defaultGameType.stakes?.find(s => s.id === 'nl100') ?? defaultGameType.stakes?.[0] ?? null
const defaultStackSize = (defaultStake ?? defaultGameType).stackSizes[0]
const defaultScenario  = defaultStackSize.scenarios[0]

function getStackSizes(gameType, stakeId) {
  if (gameType.stakes) {
    return gameType.stakes.find(s => s.id === stakeId)?.stackSizes ?? gameType.stakes[0].stackSizes
  }
  return gameType.stackSizes
}

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

  const selectedScenario = useMemo(() => {
    const gt         = gameTypes.find(g => g.id === selectedGameTypeId)
    const stackSizes = getStackSizes(gt, selectedStakeId)
    const stack      = stackSizes.find(s => s.id === selectedStackSizeId) ?? stackSizes[0]
    return stack.scenarios.find(s => s.id === selectedScenarioId) ?? stack.scenarios[0]
  }, [selectedGameTypeId, selectedStakeId, selectedStackSizeId, selectedScenarioId])

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
  }, [selectedScenario, vs4bIsAllin, vsSqueezeRfiFolds, sqzVs4bType, selectedGameTypeId, selectedStakeId, selectedStackSizeId])

  const scenarioContext = useMemo(() => {
    const gt = gameTypes.find(g => g.id === selectedGameTypeId)
    if (gt.stakes) {
      const stake = gt.stakes.find(s => s.id === selectedStakeId)
      return `6max, ${stake.label}, ${selectedPfrSizeId}`
    }
    return `Tournament, ${selectedStackSizeId}, ${selectedPfrSizeId}`
  }, [selectedGameTypeId, selectedStakeId, selectedStackSizeId, selectedPfrSizeId])

  const { raiseData, raise2Data, callData, raiseTo, stats } = useMemo(() => {
    const data    = activeScenario.data
    let pfrData = data.pfrSizes?.[selectedPfrSizeId] ?? { raise: data.raise ?? '', call: data.call ?? '' }
    if (activeScenario.section === 'sqz vs 4b') pfrData = pfrData?.[sqzVs4bType] ?? {}
    // call: { 'Xbb': "..." } object or call: "" string
    const callData = (() => {
      if (!pfrData.call) return {}
      if (typeof pfrData.call === 'object') {
        const merged = {}
        for (const rangeStr of Object.values(pfrData.call)) {
          const parsed = parseRangeString(rangeStr)
          for (const [hand, freq] of Object.entries(parsed)) {
            merged[hand] = Math.min(1, (merged[hand] ?? 0) + freq)
          }
        }
        return merged
      }
      return parseRangeString(pfrData.call)
    })()

    let raiseData  = {}  // smaller raises (primary color)
    let raise2Data = {}  // largest raise (dark green)
    let raiseTo

    if (pfrData.raise && typeof pfrData.raise === 'object') {
      // New format: raise: { 'Xbb': "...", '100bb': "..." }
      const entries = Object.entries(pfrData.raise)
        .sort((a, b) => parseFloat(a[0]) - parseFloat(b[0]))
      if (entries.length >= 2) {
        raise2Data = parseRangeString(entries[entries.length - 1][1])
        for (const [, rangeStr] of entries.slice(0, -1)) {
          const parsed = parseRangeString(rangeStr)
          for (const [hand, freq] of Object.entries(parsed)) {
            raiseData[hand] = Math.min(1, (raiseData[hand] ?? 0) + freq)
          }
        }
      } else if (entries.length === 1) {
        raiseData = parseRangeString(entries[0][1])
      }
      const sizes = entries.map(e => e[0])
      raiseTo = sizes.length === 1 ? sizes[0] : sizes.length > 1 ? sizes : null
    } else {
      // Legacy: raise: "" string
      raiseData = parseRangeString(pfrData.raise ?? '')
      raiseTo = activeScenario.raiseSizes?.[selectedPfrSizeId] ?? null
    }

    // Merged for stats (total raise combos)
    const mergedRaise = { ...raiseData }
    for (const [hand, freq] of Object.entries(raise2Data)) {
      mergedRaise[hand] = Math.min(1, (mergedRaise[hand] ?? 0) + freq)
    }

    const raiseCombos = countCombos(mergedRaise)
    const callCombos  = countCombos(callData)
    const totalCombos = raiseCombos + callCombos

    return {
      raiseData,
      raise2Data,
      callData,
      raiseTo,
      stats: {
        totalCombos:  Math.round(totalCombos  * 10) / 10,
        raiseCombos:  Math.round(raiseCombos  * 10) / 10,
        callCombos:   Math.round(callCombos   * 10) / 10,
        totalPct:    ((totalCombos  / TOTAL_COMBOS) * 100).toFixed(1),
        raisePct:    ((raiseCombos  / TOTAL_COMBOS) * 100).toFixed(1),
        callPct:     ((callCombos   / TOTAL_COMBOS) * 100).toFixed(1),
        hasCall:     callCombos > 0,
      },
    }
  }, [activeScenario, selectedPfrSizeId])

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
            onGameTypeChange={handleGameTypeChange}
            onStakeChange={handleStakeChange}
            onStackSizeChange={handleStackSizeChange}
            vs4bIsAllin={vs4bIsAllin}
            onVs4bAllinChange={setVs4bIsAllin}
            vsSqueezeRfiFolds={vsSqueezeRfiFolds}
            onVsSqueezeRfiFoldsChange={setVsSqueezeRfiFolds}
            sqzVs4bType={sqzVs4bType}
            onSqzVs4bTypeChange={setSqzVs4bType}
            onScenarioChange={(id) => { setSelectedScenarioId(id); setVs4bIsAllin(false); setVsSqueezeRfiFolds(false); setSqzVs4bType('rfi_4b') }}
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
            <div className="scenario-title">{activeScenario.data.name}</div>

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
