import React from 'react'
import './HandTooltip.css'

export default function HandTooltip({ hand, raiseFreq, raise2Freq = 0, callFreq, foldFreq, raiseTo, callLabel = 'Call', x, y, visible }) {
  if (!visible || !hand) return null

  const pct = v => `${Math.round(v * 100)}%`
  const sizes = raiseTo ? [raiseTo].flat() : []
  const raise1To = sizes.length >= 2 ? sizes[0]            : sizes[0] ?? null
  const raise2To = sizes.length >= 2 ? sizes[sizes.length - 1] : null

  return (
    <div
      className="hand-tooltip"
      style={{ left: x, top: y }}
    >
      <div className="tooltip-hand">{hand}</div>
      <div className="tooltip-rows">
        {raiseFreq > 0 && (
          <div className="tooltip-row">
            <span className="tooltip-dot raise-dot" />
            <span className="tooltip-label">Raise{raise1To ? ` to ${raise1To}` : ''}</span>
            <span className="tooltip-value">{pct(raiseFreq)}</span>
          </div>
        )}
        {raise2Freq > 0 && (
          <div className="tooltip-row">
            <span className="tooltip-dot raise2-dot" />
            <span className="tooltip-label">Raise{raise2To ? ` to ${raise2To}` : ''}</span>
            <span className="tooltip-value">{pct(raise2Freq)}</span>
          </div>
        )}
        {callFreq > 0 && (
          <div className="tooltip-row">
            <span className="tooltip-dot call-dot" />
            <span className="tooltip-label">{callLabel}</span>
            <span className="tooltip-value">{pct(callFreq)}</span>
          </div>
        )}
        {foldFreq > 0 && (
          <div className="tooltip-row">
            <span className="tooltip-dot fold-dot" />
            <span className="tooltip-label">Fold</span>
            <span className="tooltip-value">{pct(foldFreq)}</span>
          </div>
        )}
      </div>
    </div>
  )
}
