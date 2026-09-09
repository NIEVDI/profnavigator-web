import { useState, useEffect } from 'react'
import { getAllResults, deleteResult, computeStats } from '../lib/db'
import { loadColleges, saveColleges, PROFILE_TITLES, PERSONALITY_TITLES, TAG_LABELS } from '../lib/data'
import styles from './AdminPage.module.css'

const ADMIN_TABS = ['Результаты', 'Статистика', 'Колледжи']

export default function AdminPage({ onClose, onCollegesChanged }) {
  const [tab, setTab] = useState(0)
  const [records, setRecords] = useState([])
  const [stats, setStats] = useState(null)
  const [search, setSearch] = useState('')
  const [colleges, setColleges] = useState(() => loadColleges())
  const [selectedCollege, setSelectedCollege] = useState(null)
  const [editingSpec, setEditingSpec] = useState(null)
  const [saveMsg, setSaveMsg] = useState('')

  useEffect(() => {
    getAllResults().then(recs => {
      setRecords(recs)
      setStats(computeStats(recs))
    })
  }, [])

  const filtered = records.filter(r => {
    if (!search.trim()) return true
    const s = search.toLowerCase()
    return (
      (r.student_name || '').toLowerCase().includes(s) ||
      (r.school || '').toLowerCase().includes(s) ||
      (r.top_specialty || '').toLowerCase().includes(s) ||
      (r.top_college || '').toLowerCase().includes(s)
    )
  })

  const handleDelete = async (id) => {
    if (!window.confirm('Удалить эту запись?')) return
    await deleteResult(id)
    const recs = await getAllResults()
    setRecords(recs)
    setStats(computeStats(recs))
  }

  const handleExportCSV = () => {
    const headers = ['Дата', 'ФИО', 'Школа', 'Класс', 'Профиль', 'Тип личности', 'Специальность', 'Колледж', 'Совпадение %']
    const rows = filtered.map(r => [
      r.test_date || '',
      r.student_name || '',
      r.school || '',
      r.class_name || '',
      r.profile_title || '',
      r.personality_title || '',
      r.top_specialty || '',
      r.top_college || '',
      r.match_percent || 0,
    ])
    const csv = [headers, ...rows].map(row => row.map(v => `"${String(v).replace(/"/g, '""')}"`).join(',')).join('\n')
    const blob = new Blob(['\ufeff' + csv], { type: 'text/csv;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `profnavigator_results_${new Date().toISOString().slice(0, 10)}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  const handleSaveColleges = () => {
    saveColleges(colleges)
    onCollegesChanged?.()
    setSaveMsg('Сохранено!')
    setTimeout(() => setSaveMsg(''), 2000)
  }

  const addCollege = () => {
    const c = { name: 'Новый колледж', short: '', city: 'Каменск-Уральский', website: '', priority_tags: {}, specialties: [] }
    setColleges(prev => [...prev, c])
    setSelectedCollege(colleges.length)
  }

  const deleteCollege = (idx) => {
    if (!window.confirm('Удалить колледж?')) return
    setColleges(prev => prev.filter((_, i) => i !== idx))
    setSelectedCollege(null)
  }

  const updateCollege = (idx, field, value) => {
    setColleges(prev => prev.map((c, i) => i === idx ? { ...c, [field]: value } : c))
  }

  const addSpec = (collegeIdx) => {
    const spec = { code: '', name: 'Новая специальность', department: '', education_form: 'Очная', duration: '2 года 10 мес.', description: '', tags: {}, profiles: [], personality: [] }
    setColleges(prev => prev.map((c, i) => i === collegeIdx ? { ...c, specialties: [...(c.specialties || []), spec] } : c))
  }

  const deleteSpec = (collegeIdx, specIdx) => {
    if (!window.confirm('Удалить специальность?')) return
    setColleges(prev => prev.map((c, i) => i === collegeIdx
      ? { ...c, specialties: c.specialties.filter((_, si) => si !== specIdx) }
      : c
    ))
    setEditingSpec(null)
  }

  const updateSpec = (collegeIdx, specIdx, field, value) => {
    setColleges(prev => prev.map((c, i) => i === collegeIdx
      ? { ...c, specialties: c.specialties.map((s, si) => si === specIdx ? { ...s, [field]: value } : s) }
      : c
    ))
  }

  const college = selectedCollege !== null ? colleges[selectedCollege] : null

  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <span className={styles.badge}>РЕЖИМ ПСИХОЛОГА</span>
          <h1 className={styles.title}>ПрофНавигатор — Панель</h1>
        </div>
        <button className={styles.closeBtn} onClick={onClose}>✕ Выйти</button>
      </div>

      <div className={styles.tabs}>
        {ADMIN_TABS.map((t, i) => (
          <button
            key={t}
            className={`${styles.tab} ${tab === i ? styles.tabActive : ''}`}
            onClick={() => setTab(i)}
          >
            {t}
          </button>
        ))}
      </div>

      <div className={styles.body}>
        {/* ── Results tab ── */}
        {tab === 0 && (
          <div className={styles.panel}>
            <div className={styles.toolbar}>
              <input
                className={styles.search}
                placeholder="Поиск по имени, школе, специальности..."
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
              <button className={styles.secondaryBtn} onClick={handleExportCSV}>↓ CSV</button>
            </div>

            <div className={styles.tableWrap}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Дата</th>
                    <th>ФИО</th>
                    <th>Школа</th>
                    <th>Кл.</th>
                    <th>Профиль</th>
                    <th>Специальность</th>
                    <th>Колледж</th>
                    <th>%</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.length === 0 && (
                    <tr><td colSpan={9} className={styles.empty}>Нет записей</td></tr>
                  )}
                  {filtered.map(r => (
                    <tr key={r.id}>
                      <td className={styles.dateCell}>{(r.test_date || '').slice(0, 10)}</td>
                      <td>{r.student_name}</td>
                      <td>{r.school}</td>
                      <td>{r.class_name}</td>
                      <td><span className={styles.pill}>{r.profile_title}</span></td>
                      <td>{r.top_specialty}</td>
                      <td>{r.top_college}</td>
                      <td><strong>{r.match_percent}%</strong></td>
                      <td>
                        <button className={styles.dangerBtn} onClick={() => handleDelete(r.id)} title="Удалить">✕</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className={styles.caption}>Всего записей: {filtered.length}</p>
          </div>
        )}

        {/* ── Stats tab ── */}
        {tab === 1 && stats && (
          <div className={styles.panel}>
            <div className={styles.statsGrid}>
              <StatCard label="Всего тестов" value={stats.total} />
              <StatCard label="Среднее совпадение" value={`${stats.avg_match}%`} />
              <StatCard label="Топ профиль" value={stats.top_profiles[0]?.[0] || '—'} />
              <StatCard label="Топ колледж" value={stats.top_colleges[0]?.[0] || '—'} />
            </div>

            <div className={styles.chartsRow}>
              <BarSection title="Профили" items={stats.top_profiles} />
              <BarSection title="Типы личности" items={stats.top_personalities} />
              <BarSection title="Топ колледжи" items={stats.top_colleges} />
              <BarSection title="Топ специальности" items={stats.top_specialties} />
            </div>
          </div>
        )}

        {/* ── Colleges tab ── */}
        {tab === 2 && (
          <div className={styles.collegesLayout}>
            <div className={styles.collegeList}>
              <div className={styles.collegeListHeader}>
                <span>Колледжи ({colleges.length})</span>
                <button className={styles.addBtn} onClick={addCollege}>+ Добавить</button>
              </div>
              {colleges.map((c, i) => (
                <button
                  key={i}
                  className={`${styles.collegeItem} ${selectedCollege === i ? styles.collegeItemActive : ''}`}
                  onClick={() => { setSelectedCollege(i); setEditingSpec(null) }}
                >
                  <span>{c.name || 'Без названия'}</span>
                  <span className={styles.specCount}>{(c.specialties || []).length} спец.</span>
                </button>
              ))}
              {colleges.length === 0 && <p className={styles.empty}>Нет колледжей</p>}
              <div className={styles.saveRow}>
                <button className={styles.primaryBtn} onClick={handleSaveColleges}>Сохранить всё</button>
                {saveMsg && <span className={styles.saveMsg}>{saveMsg}</span>}
              </div>
            </div>

            {college ? (
              <div className={styles.collegeEditor}>
                <div className={styles.editorSection}>
                  <div className={styles.editorSectionHeader}>
                    <h3>Основные данные</h3>
                    <button className={styles.dangerBtn} onClick={() => deleteCollege(selectedCollege)}>Удалить колледж</button>
                  </div>
                  <div className={styles.formGrid}>
                    <FormField label="Название" value={college.name || ''} onChange={v => updateCollege(selectedCollege, 'name', v)} />
                    <FormField label="Аббревиатура" value={college.short || ''} onChange={v => updateCollege(selectedCollege, 'short', v)} />
                    <FormField label="Город" value={college.city || ''} onChange={v => updateCollege(selectedCollege, 'city', v)} />
                    <FormField label="Сайт" value={college.website || ''} onChange={v => updateCollege(selectedCollege, 'website', v)} />
                  </div>
                </div>

                <div className={styles.editorSection}>
                  <div className={styles.editorSectionHeader}>
                    <h3>Специальности ({(college.specialties || []).length})</h3>
                    <button className={styles.addBtn} onClick={() => addSpec(selectedCollege)}>+ Добавить</button>
                  </div>
                  <div className={styles.specList}>
                    {(college.specialties || []).map((s, si) => (
                      <div key={si} className={`${styles.specRow} ${editingSpec === si ? styles.specRowOpen : ''}`}>
                        <button className={styles.specToggle} onClick={() => setEditingSpec(editingSpec === si ? null : si)}>
                          <span>{s.code ? `[${s.code}] ` : ''}{s.name || 'Без названия'}</span>
                          <span>{editingSpec === si ? '▲' : '▼'}</span>
                        </button>
                        {editingSpec === si && (
                          <div className={styles.specEditor}>
                            <div className={styles.formGrid}>
                              <FormField label="Код" value={s.code || ''} onChange={v => updateSpec(selectedCollege, si, 'code', v)} />
                              <FormField label="Название" value={s.name || ''} onChange={v => updateSpec(selectedCollege, si, 'name', v)} />
                              <FormField label="Форма обучения" value={s.education_form || ''} onChange={v => updateSpec(selectedCollege, si, 'education_form', v)} />
                              <FormField label="Срок обучения" value={s.duration || ''} onChange={v => updateSpec(selectedCollege, si, 'duration', v)} />
                            </div>
                            <TagEditor
                              label="Теги специальности"
                              tags={s.tags || {}}
                              onChange={tags => updateSpec(selectedCollege, si, 'tags', tags)}
                            />
                            <CheckboxGroup
                              label="Профили"
                              options={PROFILE_TITLES}
                              selected={s.profiles || []}
                              onChange={v => updateSpec(selectedCollege, si, 'profiles', v)}
                            />
                            <CheckboxGroup
                              label="Типы личности"
                              options={PERSONALITY_TITLES}
                              selected={s.personality || []}
                              onChange={v => updateSpec(selectedCollege, si, 'personality', v)}
                            />
                            <button className={styles.dangerBtn} onClick={() => deleteSpec(selectedCollege, si)}>Удалить специальность</button>
                          </div>
                        )}
                      </div>
                    ))}
                    {(college.specialties || []).length === 0 && <p className={styles.empty}>Нет специальностей</p>}
                  </div>
                </div>
              </div>
            ) : (
              <div className={styles.collegeEditorEmpty}>
                <p>Выберите колледж слева для редактирования</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

function StatCard({ label, value }) {
  return (
    <div className={styles.statCard}>
      <span className={styles.statLabel}>{label}</span>
      <span className={styles.statValue}>{value}</span>
    </div>
  )
}

function BarSection({ title, items }) {
  const max = items[0]?.[1] || 1
  return (
    <div className={styles.barSection}>
      <h4 className={styles.barTitle}>{title}</h4>
      {items.map(([label, count]) => (
        <div key={label} className={styles.barRow}>
          <span className={styles.barLabel}>{label}</span>
          <div className={styles.barTrack}>
            <div className={styles.barFill} style={{ width: `${(count / max) * 100}%` }} />
          </div>
          <span className={styles.barCount}>{count}</span>
        </div>
      ))}
      {items.length === 0 && <p className={styles.empty}>Нет данных</p>}
    </div>
  )
}

function FormField({ label, value, onChange }) {
  return (
    <label className={styles.fieldLabel}>
      <span>{label}</span>
      <input className={styles.fieldInput} value={value} onChange={e => onChange(e.target.value)} />
    </label>
  )
}

function TagEditor({ label, tags, onChange }) {
  const [pairs, setPairs] = useState(() => Object.entries(tags || {}))

  useEffect(() => {
    const obj = {}
    for (const [k, v] of pairs) {
      if (k.trim()) obj[k.trim()] = parseFloat(v) || 0
    }
    onChange(obj)
  }, [pairs])

  const update = (i, field, val) => {
    setPairs(prev => prev.map((p, pi) => pi === i ? (field === 0 ? [val, p[1]] : [p[0], val]) : p))
  }

  return (
    <div className={styles.tagEditor}>
      <div className={styles.tagEditorHeader}>
        <span className={styles.subLabel}>{label}</span>
        <button className={styles.addBtn} onClick={() => setPairs(p => [...p, ['', 1]])}>+ Тег</button>
      </div>
      {pairs.map(([k, v], i) => (
        <div key={i} className={styles.tagRow}>
          <select
            className={styles.tagSelect}
            value={k}
            onChange={e => update(i, 0, e.target.value)}
          >
            <option value="">— выбери тег —</option>
            {Object.entries(TAG_LABELS).map(([key, lbl]) => (
              <option key={key} value={key}>{lbl} ({key})</option>
            ))}
          </select>
          <input
            type="number"
            className={styles.tagWeight}
            value={v}
            min={0.1}
            max={50}
            step={0.1}
            onChange={e => update(i, 1, e.target.value)}
          />
          <button className={styles.dangerBtn} onClick={() => setPairs(p => p.filter((_, pi) => pi !== i))}>✕</button>
        </div>
      ))}
    </div>
  )
}

function CheckboxGroup({ label, options, selected, onChange }) {
  const toggle = (key) => {
    if (selected.includes(key)) onChange(selected.filter(k => k !== key))
    else onChange([...selected, key])
  }
  return (
    <div className={styles.checkGroup}>
      <span className={styles.subLabel}>{label}</span>
      <div className={styles.checkGrid}>
        {Object.entries(options).map(([key, lbl]) => (
          <label key={key} className={styles.checkLabel}>
            <input
              type="checkbox"
              checked={selected.includes(key)}
              onChange={() => toggle(key)}
            />
            {lbl}
          </label>
        ))}
      </div>
    </div>
  )
}
