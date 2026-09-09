// IndexedDB-backed persistent storage for test results (replaces SQLite)
const DB_NAME = 'profnavigator'
const DB_VERSION = 1
const STORE = 'results'

function openDB() {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION)
    req.onupgradeneeded = e => {
      const db = e.target.result
      if (!db.objectStoreNames.contains(STORE)) {
        const store = db.createObjectStore(STORE, { keyPath: 'id', autoIncrement: true })
        store.createIndex('school', 'school', { unique: false })
        store.createIndex('profile_title', 'profile_title', { unique: false })
        store.createIndex('test_date', 'test_date', { unique: false })
      }
    }
    req.onsuccess = () => resolve(req.result)
    req.onerror = () => reject(req.error)
  })
}

export async function saveResult(payload) {
  const db = await openDB()
  const now = new Date().toISOString().replace('T', ' ').slice(0, 19)
  const record = { ...payload, test_date: now }
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE, 'readwrite')
    const req = tx.objectStore(STORE).add(record)
    req.onsuccess = () => resolve(req.result)
    req.onerror = () => reject(req.error)
  })
}

export async function getAllResults() {
  const db = await openDB()
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE, 'readonly')
    const req = tx.objectStore(STORE).getAll()
    req.onsuccess = () => resolve(req.result || [])
    req.onerror = () => reject(req.error)
  })
}

export async function deleteResult(id) {
  const db = await openDB()
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE, 'readwrite')
    const req = tx.objectStore(STORE).delete(id)
    req.onsuccess = () => resolve()
    req.onerror = () => reject(req.error)
  })
}

export function computeStats(records) {
  const total = records.length
  const avg_match = total ? Math.round(records.reduce((s, r) => s + (r.match_percent || 0), 0) / total * 10) / 10 : 0
  const count = key => records.reduce((acc, r) => { const v = r[key] || '—'; acc[v] = (acc[v] || 0) + 1; return acc }, {})
  const top = (obj, n) => Object.entries(obj).sort((a, b) => b[1] - a[1]).slice(0, n)
  return {
    records,
    total,
    avg_match,
    top_profiles: top(count('profile_title'), 6),
    top_personalities: top(count('personality_title'), 6),
    top_colleges: top(count('top_college'), 6),
    top_specialties: top(count('top_specialty'), 8),
    top_schools: top(count('school'), 8),
  }
}
