import React, { useState, useEffect } from 'react'
import './ScenarioSelector.css'

const POSITION_ORDER = ['BB', 'SB', 'BTN', 'CO', 'HJ', 'UTG']

export default function ScenarioSelector({
  gameTypes,
  pfrSizes,
  selectedGameTypeId,
  selectedStakeId,
  selectedStackSizeId,
  selectedScenarioId,
  selectedPfrSizeId,
  vs4bIsAllin,
  vsSqueezeRfiFolds,
  onGameTypeChange,
  onStakeChange,
  onStackSizeChange,
  onScenarioChange,
  onPfrSizeChange,
  onVs4bAllinChange,
  onVsSqueezeRfiFoldsChange,
}) {
  const currentGameType  = gameTypes.find(g => g.id === selectedGameTypeId)
  const hasStakes        = !!currentGameType.stakes
  const currentStake     = hasStakes ? currentGameType.stakes.find(s => s.id === selectedStakeId) : null
  const stackSizes       = hasStakes ? currentStake.stackSizes : currentGameType.stackSizes
  const currentStackSize = stackSizes.find(s => s.id === selectedStackSizeId) ?? stackSizes[0]
  // Build ordered list of sections, each with ordered groups
  const allSections = []
  const sectionMap = {}
  for (const s of currentStackSize.scenarios.filter(s => !s.hidden)) {
    const sectionKey = s.section ?? ''
    if (!sectionMap[sectionKey]) {
      const entry = { name: s.section ?? null, groups: [], groupMap: {} }
      sectionMap[sectionKey] = entry
      allSections.push(entry)
    }
    const sec = sectionMap[sectionKey]
    if (!sec.groupMap[s.group]) {
      sec.groupMap[s.group] = []
      sec.groups.push(s.group)
    }
    sec.groupMap[s.group].push(s)
  }

  const selectedScenario = currentStackSize.scenarios.find(s => s.id === selectedScenarioId)

  const [activeSectionName, setActiveSectionName] = useState(() => allSections[0]?.name ?? null)

  // If the active section disappears (stack/game change), fall back to first
  useEffect(() => {
    if (!allSections.find(s => s.name === activeSectionName)) {
      setActiveSectionName(allSections[0]?.name ?? null)
    }
  }, [selectedStackSizeId, selectedGameTypeId, selectedStakeId])

  const sections = allSections.filter(s => s.name === activeSectionName)

  const stripLabel = (label, section) => {
    let l = label.replace(/^vs /, '')
    if (section === 'vs 3b')   l = l.replace(/ 3b$/, '')
    if (section === 'vs 4b')   l = l.replace(/ 4b$/, '')
    if (section === 'vs 5b')   l = l.replace(/ 5b$/, '')
    if (section === 'vs limp') l = l.replace(/ limp$/, '')
    return l
  }

  return (
    <div className="scenario-selector">

      {/* Row 1: Game type */}
      <div className="selector-row">
        <span className="selector-row-label">Game</span>
        <div className="tab-group">
          {gameTypes.map(gt => (
            <button
              key={gt.id}
              className={`tab-btn${selectedGameTypeId === gt.id ? ' active' : ''}`}
              onClick={() => onGameTypeChange(gt.id)}
            >
              {gt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Row 2: Stakes (cash only) */}
      {hasStakes && (
        <div className="selector-row">
          <span className="selector-row-label">Stakes</span>
          <div className="tab-group">
            {currentGameType.stakes.map(stake => (
              <button
                key={stake.id}
                className={`tab-btn${selectedStakeId === stake.id ? ' active' : ''}`}
                onClick={() => onStakeChange(stake.id)}
              >
                {stake.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Row 3: Stack size */}
      <div className="selector-row">
        <span className="selector-row-label">Stack</span>
        <div className="tab-group">
          {stackSizes.map(ss => (
            <button
              key={ss.id}
              className={`tab-btn${selectedStackSizeId === ss.id ? ' active' : ''}`}
              onClick={() => onStackSizeChange(ss.id)}
            >
              {ss.label}
            </button>
          ))}
        </div>
      </div>

      {/* Row 4: PFR size */}
      <div className="selector-row">
        <span className="selector-row-label">Size</span>
        <div className="tab-group">
          {pfrSizes.map(size => (
            <button
              key={size}
              className={`tab-btn${selectedPfrSizeId === size ? ' active' : ''}`}
              onClick={() => onPfrSizeChange(size)}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Row 5: Section filter */}
      <div className="selector-row">
        <span className="selector-row-label">Type</span>
        <div className="section-filter-group">
          {allSections.map(sec => (
            <button
              key={sec.name ?? '__default__'}
              className={`section-filter-btn${activeSectionName === sec.name ? ' active' : ''}`}
              onClick={() => setActiveSectionName(sec.name)}
            >
              {sec.name ?? 'Other'}
            </button>
          ))}
        </div>
      </div>

      {/* Row 6: Scenarios grouped */}
      <div className="selector-row scenarios-row">
        {sections.map((sec, si) => (
          <React.Fragment key={sec.name ?? '__default__'}>
            {si > 0 && <div className="scenario-section-divider" />}
            <div className="scenario-section">
{sec.name === 'vs sqz' && selectedScenario?.coldCaller && (
                <div className="vs4b-allin-row">
                  <span className="vs4b-allin-label">RFI</span>
                  <div className="tab-group">
                    <button
                      className={`tab-btn${!vsSqueezeRfiFolds ? ' active' : ''}`}
                      onClick={() => onVsSqueezeRfiFoldsChange(false)}
                    >Calls</button>
                    <button
                      className={`tab-btn${vsSqueezeRfiFolds ? ' active' : ''}`}
                      onClick={() => onVsSqueezeRfiFoldsChange(true)}
                    >Folds</button>
                  </div>
                </div>
              )}
              {sec.name === 'vs 4b' && (
                <div className="vs4b-allin-row">
                  <span className="vs4b-allin-label">All-in</span>
                  <div className="tab-group">
                    <button
                      className={`tab-btn${!vs4bIsAllin ? ' active' : ''}`}
                      onClick={() => onVs4bAllinChange(false)}
                    >No</button>
                    <button
                      className={`tab-btn${vs4bIsAllin ? ' active' : ''}`}
                      onClick={() => onVs4bAllinChange(true)}
                    >Yes</button>
                  </div>
                </div>
              )}
              <div className="scenario-section-groups">
                {[...sec.groups].sort((a, b) => {
                  const ai = POSITION_ORDER.indexOf(a)
                  const bi = POSITION_ORDER.indexOf(b)
                  return (ai === -1 ? 99 : ai) - (bi === -1 ? 99 : bi)
                }).map(groupName => (
                  <div key={groupName} className="scenario-group">
                    <span className="group-label">{groupName}</span>
                    <div className="group-buttons">
                      {sec.groupMap[groupName].map(scenario => (
                        <button
                          key={scenario.id}
                          className={`scenario-btn${selectedScenarioId === scenario.id ? ' active' : ''}`}
                          onClick={() => onScenarioChange(scenario.id)}
                        >
                          {stripLabel(scenario.label, sec.name).split(/[+,]\s*/).map((part, i, arr) => (
                            <React.Fragment key={i}>
                              {part}{i < arr.length - 1 && <br />}
                            </React.Fragment>
                          ))}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </React.Fragment>
        ))}
      </div>

    </div>
  )
}
