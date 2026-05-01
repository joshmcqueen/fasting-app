import { useState, useEffect, useRef, useCallback } from 'react'

const STORAGE_KEY = 'fasting_session'

export function useFastTimer() {
  const [status, setStatus] = useState('idle')
  const [totalSeconds, setTotalSeconds] = useState(0)
  const [elapsedSeconds, setElapsedSeconds] = useState(0)
  const [durationHours, setDurationHours] = useState(0)

  const startTimeRef = useRef(null)
  const intervalRef = useRef(null)

  const clearTick = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }

  const startTick = useCallback((startTime, total) => {
    startTimeRef.current = startTime
    clearTick()
    intervalRef.current = setInterval(() => {
      const elapsed = (Date.now() - startTimeRef.current) / 1000
      if (elapsed >= total) {
        setElapsedSeconds(total)
        setStatus('complete')
        clearTick()
        const session = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
        localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...session, status: 'complete' }))
      } else {
        setElapsedSeconds(elapsed)
      }
    }, 1000)
  }, [])

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return
    try {
      const session = JSON.parse(raw)
      const total = session.durationHours * 3600
      setTotalSeconds(total)
      setDurationHours(session.durationHours)

      if (session.status === 'complete') {
        setElapsedSeconds(total)
        setStatus('complete')
      } else if (session.status === 'fasting') {
        const elapsed = (Date.now() - session.startTime) / 1000
        if (elapsed >= total) {
          setElapsedSeconds(total)
          setStatus('complete')
          localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...session, status: 'complete' }))
        } else {
          setElapsedSeconds(elapsed)
          setStatus('fasting')
          startTick(session.startTime, total)
        }
      }
    } catch {
      localStorage.removeItem(STORAGE_KEY)
    }
    return clearTick
  }, [startTick])

  const startFast = useCallback((hours) => {
    const startTime = Date.now()
    const total = hours * 3600
    const session = { startTime, durationHours: hours, status: 'fasting' }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(session))
    setDurationHours(hours)
    setTotalSeconds(total)
    setElapsedSeconds(0)
    setStatus('fasting')
    startTick(startTime, total)
  }, [startTick])

  const breakFast = useCallback(() => {
    clearTick()
    localStorage.removeItem(STORAGE_KEY)
    setStatus('idle')
    setElapsedSeconds(0)
    setTotalSeconds(0)
    setDurationHours(0)
    startTimeRef.current = null
  }, [])

  const remaining = Math.max(0, totalSeconds - elapsedSeconds)
  const progress = totalSeconds > 0 ? Math.min(1, elapsedSeconds / totalSeconds) : 0
  const hoursRemaining = Math.floor(remaining / 3600)
  const minutesRemaining = Math.floor((remaining % 3600) / 60)
  const secondsRemaining = Math.floor(remaining % 60)

  return {
    status,
    durationHours,
    elapsedSeconds,
    totalSeconds,
    progress,
    hoursRemaining,
    minutesRemaining,
    secondsRemaining,
    startFast,
    breakFast,
  }
}
