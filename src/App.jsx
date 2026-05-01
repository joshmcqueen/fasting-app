import './index.css'
import './App.css'
import { useFastTimer } from './hooks/useFastTimer'
import { useQuote } from './hooks/useQuote'
import { DurationPicker } from './components/DurationPicker/DurationPicker'
import { RingCountdown } from './components/RingCountdown/RingCountdown'
import { QuoteDisplay } from './components/QuoteDisplay/QuoteDisplay'
import { CompleteBanner } from './components/CompleteBanner/CompleteBanner'

export default function App() {
  const timer = useFastTimer()
  const quote = useQuote(timer.elapsedSeconds)

  return (
    <div className="app">
      {timer.status === 'idle' && (
        <DurationPicker onStart={timer.startFast} />
      )}

      {timer.status === 'fasting' && (
        <div className="fasting-screen">
          <RingCountdown
            progress={timer.progress}
            hoursRemaining={timer.hoursRemaining}
            minutesRemaining={timer.minutesRemaining}
            secondsRemaining={timer.secondsRemaining}
            durationHours={timer.durationHours}
            onBreak={timer.breakFast}
          />
          <QuoteDisplay quote={quote} />
        </div>
      )}

      {timer.status === 'complete' && (
        <CompleteBanner
          durationHours={timer.durationHours}
          onStartAnother={timer.breakFast}
        />
      )}
    </div>
  )
}
