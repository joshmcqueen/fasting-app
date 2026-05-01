import { useEffect, useRef } from 'react'
import './RingCountdown.css'

const SIZE = 200
const RADIUS = 88
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

function pad(n) {
  return String(n).padStart(2, '0')
}

export function RingCountdown({ progress, hoursRemaining, minutesRemaining, secondsRemaining, durationHours, onBreak }) {
  const circleRef = useRef(null)
  const loadedRef = useRef(false)

  const offset = CIRCUMFERENCE * (1 - progress)

  useEffect(() => {
    if (!loadedRef.current && circleRef.current) {
      circleRef.current.style.transition = 'none'
      circleRef.current.style.strokeDashoffset = offset
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          if (circleRef.current) {
            circleRef.current.style.transition = 'stroke-dashoffset 1s linear'
          }
          loadedRef.current = true
        })
      })
    }
  }, [])

  const percentDone = Math.round(progress * 100)

  return (
    <div className="ring-wrap">
      <div className="ring-container">
        <svg
          className="ring-svg"
          viewBox={`0 0 ${SIZE} ${SIZE}`}
          aria-label={`${percentDone}% complete`}
        >
          <circle
            cx={SIZE / 2}
            cy={SIZE / 2}
            r={RADIUS}
            fill="none"
            stroke="var(--color-ring-bg)"
            strokeWidth="10"
          />
          <circle
            ref={circleRef}
            cx={SIZE / 2}
            cy={SIZE / 2}
            r={RADIUS}
            fill="none"
            stroke="var(--color-accent)"
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={loadedRef.current ? offset : CIRCUMFERENCE}
            transform={`rotate(-90 ${SIZE / 2} ${SIZE / 2})`}
            style={{ transition: loadedRef.current ? 'stroke-dashoffset 1s linear' : 'none' }}
          />
        </svg>

        <div className="ring-center">
          <div className="ring-time">
            {pad(hoursRemaining)}:{pad(minutesRemaining)}:{pad(secondsRemaining)}
          </div>
          <div className="ring-sublabel">remaining of {durationHours}h fast</div>
          <div className="ring-percent">{percentDone}% complete</div>
        </div>
      </div>

      <button className="break-btn" onClick={onBreak}>
        Break Fast
      </button>
    </div>
  )
}
