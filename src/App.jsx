import { useState } from 'react'
import IntroPage from './pages/IntroPage'
import TestPage from './pages/TestPage'
import ResultPage from './pages/ResultPage'
import { DEFAULT_COLLEGES } from './lib/data'
import { recommend } from './lib/recommender'

export default function App() {
  const [page, setPage] = useState('intro')
  const [result, setResult] = useState(null)

  const handleStartTest = () => setPage('test')

  const handleTestComplete = (answers) => {
    const rec = recommend(answers, DEFAULT_COLLEGES)
    // Сохраняем только результат в localStorage
    try {
      const history = JSON.parse(localStorage.getItem('profnav_history') || '[]')
      history.push({ ...rec, date: new Date().toISOString() })
      localStorage.setItem('profnav_history', JSON.stringify(history.slice(-50)))
    } catch (_) {}
    setResult(rec)
    setPage('result')
  }

  const handleRestart = () => {
    setResult(null)
    setPage('intro')
  }

  return (
    <div className="app">
      {page === 'intro'  && <IntroPage  onStartTest={handleStartTest} />}
      {page === 'test'   && <TestPage   onComplete={handleTestComplete} />}
      {page === 'result' && <ResultPage result={result} onRestart={handleRestart} />}
    </div>
  )
}
