import './CompleteBanner.css'

export function CompleteBanner({ durationHours, onStartAnother }) {
  return (
    <div className="complete">
      <div className="complete-icon">🎉</div>
      <h2 className="complete-title">Fast Complete!</h2>
      <p className="complete-duration">{durationHours} hours</p>
      <p className="complete-message">
        You did it. Your body is thanking you. Take a moment to enjoy this win before breaking your fast.
      </p>
      <button className="complete-btn" onClick={onStartAnother}>
        Start Another Fast
      </button>
    </div>
  )
}
