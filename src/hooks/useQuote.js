import { quotes } from '../data/quotes'

const QUOTE_INTERVAL = 30

export function useQuote(elapsedSeconds) {
  const index = Math.floor(elapsedSeconds / QUOTE_INTERVAL) % quotes.length
  return quotes[index]
}
