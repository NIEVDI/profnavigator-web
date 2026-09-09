import { useState } from 'react'
import { PRIVACY_POLICY } from '../lib/data'
import styles from './IntroPage.module.css'

export default function IntroPage({ onStartTest }) {
  const [consent, setConsent] = useState(false)
  const [showPrivacy, setShowPrivacy] = useState(false)

  const handleStart = () => {
    if (!consent) {
      alert('Для начала теста необходимо принять политику конфиденциальности и согласиться на обработку персональных данных.')
      return
    }
    onStartTest()
  }

  return (
    <div className={styles.root}>
      <div className={styles.hero}>
        <div className={styles.badge}>Профориентация</div>
        <h1 className={styles.title}>ПрофНавигатор</h1>
        <p className={styles.subtitle}>
          Помощь в выборе специальности<br />в колледжах Каменска-Уральского
        </p>
      </div>

      <div className={styles.features}>
        <div className={styles.featureCard}>
          <div className={styles.featureIcon}>📋</div>
          <strong>Анкета</strong>
          20 вопросов о ваших интересах
        </div>
        <div className={styles.featureCard}>
          <div className={styles.featureIcon}>🧠</div>
          <strong>Анализ</strong>
          Определение профиля и типа личности
        </div>
        <div className={styles.featureCard}>
          <div className={styles.featureIcon}>🎓</div>
          <strong>Рекомендации</strong>
          Подходящие специальности и колледжи
        </div>
      </div>

      <div className={styles.consentRow}>
        <input
          type="checkbox"
          id="consent"
          checked={consent}
          onChange={e => setConsent(e.target.checked)}
        />
        <label htmlFor="consent">
          Я согласен с{' '}
          <button
            className={styles.linkBtn}
            onClick={() => setShowPrivacy(true)}
          >
            политикой конфиденциальности
          </button>
          {' '}и согласен на обработку персональных данных
        </label>
      </div>

      <div className={styles.actions}>
        <button className={styles.primaryBtn} onClick={handleStart}>
          Начать тест →
        </button>
      </div>

      {showPrivacy && (
        <div className={styles.overlay} onClick={() => setShowPrivacy(false)}>
          <div className={styles.modal} onClick={e => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h2>Политика конфиденциальности</h2>
              <button
                className={styles.closeBtn}
                onClick={() => setShowPrivacy(false)}
              >
                ✕
              </button>
            </div>
            <div className={styles.modalBody}>
              <div className={styles.privacyText}>{PRIVACY_POLICY}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
