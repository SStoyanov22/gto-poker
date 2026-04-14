import React, { useEffect } from 'react'
import './DecisionModal.css'

export default function DecisionModal({ hand, raiseFreq, raise2Freq = 0, callFreq, foldFreq, decision, raiseTo, callLabel = 'Call', onClose }) {
  if (!hand) return null

  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  const pct = v => `${Math.round(v * 100)}%`
  const isMixed = [raiseFreq, raise2Freq, callFreq, foldFreq].filter(f => f > 0.001).length >= 2

  const sizes = raiseTo ? [raiseTo].flat() : []
  const raise1To = sizes.length >= 2 ? sizes[0]                 : sizes[0] ?? null
  const raise2To = sizes.length >= 2 ? sizes[sizes.length - 1]  : null

  const decisionColor = decision === 'Raise'  ? 'var(--color-raise)'
    : decision === 'Raise2' ? 'var(--color-raise2)'
    : decision === 'Call'   ? 'var(--color-call)'
    : '#c94d3a'

  const decisionLabel = decision === 'Call' ? callLabel.toUpperCase()
    : decision === 'Fold' ? 'FOLD'
    : 'RAISE'
  const decisionSize  = decision === 'Raise'  && raise1To ? raise1To
    : decision === 'Raise2' && raise2To ? raise2To
    : null

  return (
    <div className="decision-overlay" onClick={onClose}>
      <div className="decision-modal" onClick={e => e.stopPropagation()}>
        <div className="decision-hand">{hand}</div>

        <div className="decision-result" style={{ color: decisionColor }}>
          {decisionLabel}
          {decisionSize && (
            <span className="decision-raise-to"> to {decisionSize}</span>
          )}
        </div>

        {isMixed && (
          <div className="decision-freqs">
            {raiseFreq > 0.001 && (
              <div className="decision-freq-row">
                <span className="decision-dot" style={{ background: 'var(--color-raise)' }} />
                <span>Raise{raise1To ? ` to ${raise1To}` : ''}</span>
                <span className="decision-freq-val">{pct(raiseFreq)}</span>
              </div>
            )}
            {raise2Freq > 0.001 && (
              <div className="decision-freq-row">
                <span className="decision-dot" style={{ background: 'var(--color-raise2)' }} />
                <span>Raise{raise2To ? ` to ${raise2To}` : ''}</span>
                <span className="decision-freq-val">{pct(raise2Freq)}</span>
              </div>
            )}
            {callFreq > 0.001 && (
              <div className="decision-freq-row">
                <span className="decision-dot" style={{ background: 'var(--color-call)' }} />
                <span>{callLabel}</span>
                <span className="decision-freq-val">{pct(callFreq)}</span>
              </div>
            )}
            {foldFreq > 0.001 && (
              <div className="decision-freq-row">
                <span className="decision-dot" style={{ background: '#c94d3a' }} />
                <span>Fold</span>
                <span className="decision-freq-val">{pct(foldFreq)}</span>
              </div>
            )}
          </div>
        )}

        <button className="decision-close" onClick={onClose}>dismiss</button>
      </div>
    </div>
  )
}
