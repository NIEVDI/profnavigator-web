import { useState } from 'react'
import { QUESTIONS } from '../lib/data'
import styles from './TestPage.module.css'

const ANSWER_OPTIONS = [
  { value: 1, label: 'Совершенно не согласен' },
  { value: 2, label: 'Скорее не согласен' },
  { value: 3, label: 'Нейтрально' },
  { value: 4, label: 'Скорее согласен' },
  { value: 5, label: 'Совершенно согласен' },
]

export default function TestPage({ onComplete }) {
  const [current, setCurrent] = useState(0)
  const [answers, setAnswers] = useState(Array(QUESTIONS.length).fill(0))

  const total = QUESTIONS.length
  const progress = Math.round(((current + 1) / total) * 100)
  const selected = answers[current]

  const handleAnswer = (val) => {
    const next = [...answers]
    next[current] = val
    setAnswers(next)
    if (current < total - 1) {
      setTimeout(() => setCurrent(c => c + 1), 150)
    }
  }

  const handlePrev = () => {
    if (current > 0) setCurrent(c => c - 1)
  }

  const handleFinish = () => {
    if (answers.some(a => a === 0)) {
      alert('Пожалуйста, ответьте на все вопросы.')
      return
    }
    onComplete(answers)
  }

  const answered = answers.filter(a => a > 0).length

  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <div className={styles.counter}>Вопрос {current + 1} из {total}</div>
        </div>
        <div style={{ flex: 1, height: 4, background: 'var(--border)', borderRadius: 2, overflow: 'hidden' }}>
          <div className={styles.progressFill} style={{ width: `${progress}%` }} />
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.card}>
          <div className={styles.questionNum}>Вопрос {current + 1} из {total}</div>
          <p className={styles.question}>{QUESTIONS[current].text}</p>

          <div className={styles.options}>
            {ANSWER_OPTIONS.map(opt => (
              <button
                key={opt.value}
                className={`${styles.option} ${selected === opt.value ? styles.selected : ''}`}
                onClick={() => handleAnswer(opt.value)}
              >
                <span className={styles.optionNum}>{opt.value}</span>
                <span className={styles.optionLabel}>{opt.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.nav}>
        <button className={styles.backBtn} onClick={handlePrev} disabled={current === 0}>
          ← Назад
        </button>
        <div className={styles.dots}>
          {answers.map((a, i) => (
            <div
              key={i}
              className={`${styles.dot} ${a > 0 ? styles.dotDone : ''} ${i === current ? styles.dotActive : ''}`}
            />
          ))}
        </div>
        {current === total - 1 ? (
          <button className={styles.nextBtn} onClick={handleFinish}>
            Получить результат →
          </button>
        ) : (
          <button
            className={`${styles.nextBtn} ${selected === 0 ? styles.nextBtnDisabled : ''}`}
            onClick={() => setCurrent(c => c + 1)}
            disabled={selected === 0}
          >
            Далее →
          </button>
        )}
      </div>
    </div>
  )
}
