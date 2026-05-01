import { useState } from 'react'
import './DurationPicker.css'

const PRESETS = [12, 16, 24, 36]

export function DurationPicker({ onStart }) {
  const [selected, setSelected] = useState(16)
  const [showCustom, setShowCustom] = useState(false)
  const [customValue, setCustomValue] = useState('')
  const [error, setError] = useState('')

  const handlePreset = (h) => {
    setSelected(h)
    setShowCustom(false)
    setError('')
  }

  const handleCustomToggle = () => {
    setShowCustom(true)
    setCustomValue(String(selected))
    setError('')
  }

  const handleCustomChange = (e) => {
    setCustomValue(e.target.value)
    setError('')
    const val = parseInt(e.target.value, 10)
    if (!isNaN(val) && val >= 1 && val <= 168) {
      setSelected(val)
    }
  }

  const handleStart = () => {
    if (showCustom) {
      const val = parseInt(customValue, 10)
      if (isNaN(val) || val < 1 || val > 168) {
        setError('Enter a duration between 1 and 168 hours')
        return
      }
      setSelected(val)
      onStart(val)
    } else {
      onStart(selected)
    }
  }

  return (
    <div className="picker">
      <div className="picker-header">
        <div className="picker-icon">⚡</div>
        <h1 className="picker-title">Fast Timer</h1>
        <p className="picker-subtitle">Choose your fasting window</p>
      </div>

      <div className="picker-presets">
        {PRESETS.map((h) => (
          <button
            key={h}
            className={`preset-btn ${selected === h && !showCustom ? 'active' : ''}`}
            onClick={() => handlePreset(h)}
          >
            <span className="preset-hours">{h}h</span>
            <span className="preset-label">{presetLabel(h)}</span>
          </button>
        ))}
        <button
          className={`preset-btn ${showCustom ? 'active' : ''}`}
          onClick={handleCustomToggle}
        >
          <span className="preset-hours">+</span>
          <span className="preset-label">Custom</span>
        </button>
      </div>

      {showCustom && (
        <div className="custom-input-wrap">
          <input
            className="custom-input"
            type="number"
            min="1"
            max="168"
            value={customValue}
            onChange={handleCustomChange}
            placeholder="Hours"
            autoFocus
          />
          <span className="custom-unit">hours</span>
          {error && <p className="custom-error">{error}</p>}
        </div>
      )}

      <button className="start-btn" onClick={handleStart}>
        Begin Fast — {selected}h
      </button>
    </div>
  )
}

function presetLabel(h) {
  if (h === 12) return '12:12'
  if (h === 16) return '16:8 IF'
  if (h === 24) return 'OMAD'
  if (h === 36) return 'Extended'
  return ''
}
