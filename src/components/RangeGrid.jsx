import React, { useState, useCallback, useRef } from 'react'
import { RANKS, getHandNotation, getCellData } from '../utils/rangeUtils.js'
import HandTooltip from './HandTooltip.jsx'
import DecisionModal from './DecisionModal.jsx'
import './RangeGrid.css'

// Colors
const COLOR_RAISE  = '#EE3B3B'
const COLOR_RAISE2 = '#3E0F0F'
const COLOR_CALL   = '#22c55e'
const COLOR_FOLD   = '#3E7BB6'


/**
 * Build a CSS background for a cell.
 * Left-to-right gradient, most to least aggressive: raise2 → raise → call → fold.
 */
function cellBackground(raiseFreq, raise2Freq, callFreq, foldFreq) {
  const hasRaise  = raiseFreq  > 0.001
  const hasRaise2 = raise2Freq > 0.001
  const hasCall   = callFreq   > 0.001
  const hasFold   = foldFreq   > 0.001

  if (!hasRaise && !hasRaise2 && !hasCall) return COLOR_FOLD

  const segments = []
  if (hasRaise2) segments.push({ color: COLOR_RAISE2, freq: raise2Freq })
  if (hasRaise)  segments.push({ color: COLOR_RAISE,  freq: raiseFreq })
  if (hasCall)   segments.push({ color: COLOR_CALL,   freq: callFreq })
  if (hasFold)   segments.push({ color: COLOR_FOLD,   freq: foldFreq })

  if (segments.length === 1) return segments[0].color

  // Hard-stop gradient so each segment is a distinct block
  let pos = 0
  const stops = []
  for (const seg of segments) {
    const pct  = Math.round(pos * 100)
    const next = Math.round((pos + seg.freq) * 100)
    stops.push(`${seg.color} ${pct}%`, `${seg.color} ${next}%`)
    pos += seg.freq
  }
  return `linear-gradient(to right, ${stops.join(', ')})`
}

function rollDecision(raiseFreq, raise2Freq, callFreq) {
  const r = Math.random()
  if (r < raiseFreq) return 'Raise'
  if (r < raiseFreq + raise2Freq) return 'Raise2'
  if (r < raiseFreq + raise2Freq + callFreq) return 'Call'
  return 'Fold'
}

// Color for hands not in range (grayed out)
const COLOR_NOT_IN_RANGE = '#2a2e38'

export default function RangeGrid({ raiseData, raise2Data = {}, callData, raiseTo, callLabel = 'Call', inRangeSet = null }) {
  const [tooltip, setTooltip] = useState({ visible: false, hand: '', raiseFreq: 0, raise2Freq: 0, callFreq: 0, foldFreq: 0, isInRange: true, x: 0, y: 0 })
  const [modal, setModal] = useState(null)
  const containerRef = useRef(null)

  const handleMouseEnter = useCallback((e, hand, raiseFreq, raise2Freq, callFreq, foldFreq, isInRange) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setTooltip({
      visible: true,
      hand,
      raiseFreq,
      raise2Freq,
      callFreq,
      foldFreq,
      isInRange,
      x: rect.right,
      y: rect.top + rect.height / 2,
    })
  }, [])

  const handleMouseMove = useCallback((e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setTooltip(prev => ({
      ...prev,
      x: rect.right,
      y: rect.top + rect.height / 2,
    }))
  }, [])

  const handleMouseLeave = useCallback(() => {
    setTooltip(prev => ({ ...prev, visible: false }))
  }, [])

  const handleClick = useCallback((hand, raiseFreq, raise2Freq, callFreq, foldFreq) => {
    const activeActions = [raiseFreq, raise2Freq, callFreq, foldFreq].filter(f => f > 0.001).length
    if (activeActions < 2) return
    setModal({ hand, raiseFreq, raise2Freq, callFreq, foldFreq, decision: rollDecision(raiseFreq, raise2Freq, callFreq), raiseTo, callLabel })
  }, [raiseTo, callLabel])

  return (
    <div className="range-grid-wrapper" ref={containerRef}>
      <div className="range-grid">
        {/* Column headers */}
        <div className="grid-corner" />
        {RANKS.map(rank => (
          <div key={rank} className="grid-header col-header">{rank}</div>
        ))}

        {/* Rows */}
        {RANKS.map((rowRank, row) => (
          <React.Fragment key={rowRank}>
            {/* Row header */}
            <div className="grid-header row-header">{rowRank}</div>

            {/* Cells */}
            {RANKS.map((colRank, col) => {
              const hand = getHandNotation(row, col)
              const { raiseFreq, raise2Freq, callFreq, foldFreq, isInRange } = getCellData(hand, raiseData, callData, raise2Data, inRangeSet)

              // "Not in range" hands show as gray, otherwise use action colors
              const bg = isInRange
                ? cellBackground(raiseFreq, raise2Freq, callFreq, foldFreq)
                : COLOR_NOT_IN_RANGE

              const isActive = raiseFreq > 0.001 || raise2Freq > 0.001 || callFreq > 0.001
              const isPair = row === col

              return (
                <div
                  key={col}
                  className={`grid-cell${isActive ? ' active' : ''}${isPair ? ' pair-cell' : ''}${!isInRange ? ' not-in-range' : ''}`}
                  style={{ background: bg }}
                  onMouseEnter={e => handleMouseEnter(e, hand, raiseFreq, raise2Freq, callFreq, foldFreq, isInRange)}
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                  onClick={() => handleClick(hand, raiseFreq, raise2Freq, callFreq, foldFreq)}
                >
                  <span className="cell-label">{hand}</span>
                </div>
              )
            })}
          </React.Fragment>
        ))}
      </div>

      <HandTooltip
        hand={tooltip.hand}
        raiseFreq={tooltip.raiseFreq}
        raise2Freq={tooltip.raise2Freq}
        callFreq={tooltip.callFreq}
        foldFreq={tooltip.foldFreq}
        raiseTo={raiseTo}
        callLabel={callLabel}
        isInRange={tooltip.isInRange}
        x={tooltip.x}
        y={tooltip.y}
        visible={tooltip.visible}
      />

      {modal && (
        <DecisionModal
          hand={modal.hand}
          raiseFreq={modal.raiseFreq}
          raise2Freq={modal.raise2Freq}
          callFreq={modal.callFreq}
          foldFreq={modal.foldFreq}
          decision={modal.decision}
          raiseTo={modal.raiseTo}
          callLabel={modal.callLabel}
          onClose={() => setModal(null)}
        />
      )}
    </div>
  )
}
