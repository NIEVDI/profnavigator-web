import { useState } from 'react'
import styles from './ResultPage.module.css'

export default function ResultPage({ result, onRestart }) {
  const r = result || {}
  const recs = r.recommendations || []
  const topTags = r.top_tags || []
  const profileScores = r.profile_scores || {}
  const mixed = r.mixed_profile
  const [expandedRec, setExpandedRec] = useState(null)

  const handlePrint = () => window.print()

  const handleExportCSV = () => {
    const headers = ['Код', 'Специальность', 'Колледж', 'Город', 'Форма', 'Срок', 'Совпадение %', 'Причины']
    const rows = recs.map(rec => [
      rec.code || '',
      rec.specialty || '',
      rec.college_name || '',
      rec.college_city || '',
      rec.education_form || '',
      rec.duration || '',
      rec.match_percent || 0,
      (rec.reasons || [rec.reason || '']).join('; '),
    ])
    const csv = [headers, ...rows]
      .map(row => row.map(v => `"${String(v).replace(/"/g, '""')}"`).join(','))
      .join('\n')
    const blob = new Blob(['\ufeff' + csv], { type: 'text/csv;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${(r.student_name || 'result').replace(/\s+/g, '_')}_профориентация.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  const maxTag = topTags[0]?.[1] || 1
  const maxProfile = Math.max(...Object.values(profileScores), 1)

  return (
    <div className={styles.root}>
      {/* Header */}
      <div className={styles.header}>
        <div>
          <div className={styles.badge}>РЕЗУЛЬТАТ ТЕСТИРОВАНИЯ</div>
          <h1 className={styles.title}>
            {r.student_name ? `Результат: ${r.student_name}` : 'Твой результат'}
          </h1>
          {(r.school || r.class_name) && (
            <p className={styles.sub}>{[r.school, r.class_name].filter(Boolean).join(', ')}</p>
          )}
        </div>
        <div className={styles.headerBtns}>
          <button className={styles.ghostBtn} onClick={handlePrint}>🖨 Печать</button>
          <button className={styles.ghostBtn} onClick={handleExportCSV}>↓ CSV</button>
          <button className={styles.primaryBtn} onClick={onRestart}>Пройти заново</button>
        </div>
      </div>

      <div className={styles.body}>
        {/* Top summary cards */}
        <div className={styles.summaryCards}>
          <SummaryCard
            label={mixed ? 'Смешанный профиль' : 'Ведущий профиль'}
            value={r.profile_title || '—'}
            accent
          />
          <SummaryCard label="Тип личности" value={r.personality_title || '—'} />
          <SummaryCard
            label="Итоговое совпадение"
            value={r.match_percent ? `${r.match_percent}%` : '—'}
            accent
          />
          <SummaryCard label="Топ-рекомендация" value={r.top_specialty || '—'} />
        </div>

        {mixed && (
          <div className={styles.mixedBanner}>
            ℹ️ Профиль выражен смешанно — несколько направлений набрали близкие баллы. Рекомендации носят ориентировочный характер.
          </div>
        )}

        {/* Summary text */}
        {r.summary && (
          <div className={styles.summaryBox}>
            <p className={styles.summaryText}>{r.summary}</p>
          </div>
        )}

        <div className={styles.chartsRow}>
          {/* Top interests */}
          {topTags.length > 0 && (
            <div className={styles.chartCard}>
              <h3 className={styles.chartTitle}>Сильные интересы</h3>
              <div className={styles.bars}>
                {topTags.map(([label, val]) => (
                  <div key={label} className={styles.barRow}>
                    <span className={styles.barLabel}>{label}</span>
                    <div className={styles.barTrack}>
                      <div
                        className={styles.barFill}
                        style={{ width: `${(val / maxTag) * 100}%` }}
                      />
                    </div>
                    <span className={styles.barVal}>{val}%</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Profile scores */}
          {Object.keys(profileScores).length > 0 && (
            <div className={styles.chartCard}>
              <h3 className={styles.chartTitle}>Профили совпадения</h3>
              <div className={styles.bars}>
                {Object.entries(profileScores)
                  .sort((a, b) => b[1] - a[1])
                  .slice(0, 7)
                  .map(([label, val]) => (
                    <div key={label} className={styles.barRow}>
                      <span className={styles.barLabel}>{label}</span>
                      <div className={styles.barTrack}>
                        <div
                          className={`${styles.barFill} ${styles.barFillTeal}`}
                          style={{ width: `${(val / maxProfile) * 100}%` }}
                        />
                      </div>
                      <span className={styles.barVal}>{val}%</span>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>

        {/* Recommendations cards */}
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>
            Рекомендации по специальностям
            <span className={styles.recCount}>{recs.length}</span>
          </h2>

          {recs.length === 0 && (
            <div className={styles.emptyRecs}>
              Нет данных — добавьте колледжи в режиме психолога
            </div>
          )}

          <div className={styles.recCards}>
            {recs.map((rec, i) => {
              const isTop = i === 0
              const isOpen = expandedRec === i
              const reasons = rec.reasons?.length ? rec.reasons : (rec.reason ? rec.reason.split(';').map(s => s.trim()).filter(Boolean) : [])
              return (
                <div
                  key={i}
                  className={`${styles.recCard} ${isTop ? styles.recCardTop : ''} ${isOpen ? styles.recCardOpen : ''}`}
                >
                  {/* Card header — always visible */}
                  <button
                    className={styles.recCardHeader}
                    onClick={() => setExpandedRec(isOpen ? null : i)}
                    aria-expanded={isOpen}
                  >
                    <div className={styles.recRank}>
                      {isTop ? <span className={styles.topStar}>★</span> : <span className={styles.rankNum}>{i + 1}</span>}
                    </div>

                    <div className={styles.recMain}>
                      <div className={styles.recSpecialty}>{rec.specialty}</div>
                      <div className={styles.recCollege}>
                        {rec.college_short || rec.college_name}
                        {rec.college_city ? ` · ${rec.college_city}` : ''}
                      </div>
                    </div>

                    <div className={styles.recMeta}>
                      {rec.education_form && (
                        <span className={styles.recTag}>{rec.education_form}</span>
                      )}
                      {rec.duration && (
                        <span className={styles.recTag}>{rec.duration}</span>
                      )}
                    </div>

                    <div className={styles.recMatchWrap}>
                      <MatchBadge value={rec.match_percent} />
                    </div>

                    <span className={styles.recChevron}>{isOpen ? '▲' : '▼'}</span>
                  </button>

                  {/* Expanded details */}
                  {isOpen && (
                    <div className={styles.recDetails}>
                      <div className={styles.recDetailsGrid}>
                        {rec.code && (
                          <div className={styles.detailItem}>
                            <span className={styles.detailLabel}>Код специальности</span>
                            <span className={styles.detailValue}>{rec.code}</span>
                          </div>
                        )}
                        <div className={styles.detailItem}>
                          <span className={styles.detailLabel}>Полное название колледжа</span>
                          <span className={styles.detailValue}>{rec.college_name}</span>
                        </div>
                        {rec.education_form && (
                          <div className={styles.detailItem}>
                            <span className={styles.detailLabel}>Форма обучения</span>
                            <span className={styles.detailValue}>{rec.education_form}</span>
                          </div>
                        )}
                        {rec.duration && (
                          <div className={styles.detailItem}>
                            <span className={styles.detailLabel}>Срок обучения</span>
                            <span className={styles.detailValue}>{rec.duration}</span>
                          </div>
                        )}
                      </div>

                      {reasons.length > 0 && (
                        <div className={styles.reasonsBlock}>
                          <span className={styles.detailLabel}>Почему рекомендуется</span>
                          <ul className={styles.reasonsList}>
                            {reasons.map((r, ri) => (
                              <li key={ri} className={styles.reasonItem}>
                                <span className={styles.reasonDot}>·</span>
                                {r}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {rec.college_site && (
                        <a
                          href={rec.college_site}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles.collegeSiteBtn}
                        >
                          Перейти на сайт колледжа →
                        </a>
                      )}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        <p className={styles.disclaimer}>
          Результат носит информативный характер и не является официальной рекомендацией. Итоговый выбор — за тобой.
        </p>
      </div>
    </div>
  )
}

function SummaryCard({ label, value, accent }) {
  return (
    <div className={styles.summaryCard}>
      <span className={styles.summaryCardLabel}>{label}</span>
      <span className={`${styles.summaryCardValue} ${accent ? styles.summaryCardAccent : ''}`}>
        {value}
      </span>
    </div>
  )
}

function MatchBadge({ value }) {
  const v = parseFloat(value) || 0
  const color = v >= 80 ? '#22c55e' : v >= 65 ? '#f59e0b' : '#94a3b8'
  return (
    <span className={styles.matchBadge} style={{ '--badge-color': color }}>
      {v}%
    </span>
  )
}
