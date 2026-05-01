import { useState, useEffect } from 'react'
import './QuoteDisplay.css'

export function QuoteDisplay({ quote }) {
  const [visible, setVisible] = useState(true)
  const [displayed, setDisplayed] = useState(quote)

  useEffect(() => {
    if (quote.text === displayed.text) return
    setVisible(false)
    const t = setTimeout(() => {
      setDisplayed(quote)
      setVisible(true)
    }, 400)
    return () => clearTimeout(t)
  }, [quote.text])

  return (
    <div className={`quote ${visible ? 'visible' : 'hidden'}`}>
      <p className="quote-text">"{displayed.text}"</p>
      <p className="quote-author">— {displayed.author}</p>
    </div>
  )
}
