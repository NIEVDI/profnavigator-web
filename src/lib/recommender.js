import { QUESTIONS, TAG_LABELS, PROFILE_TITLES, PERSONALITY_TITLES, PROFILES } from './data.js'

const TAG_TO_PROFILE = {
  it: 'digital', digital: 'digital', security: 'digital',
  electronics: 'engineering', automation: 'engineering', engineering: 'engineering',
  tech: 'engineering', energy: 'engineering', quality: 'engineering',
  machinery: 'industrial', production: 'industrial', construction: 'industrial',
  transport: 'industrial', agro: 'industrial', industrial: 'industrial',
  business: 'business', law: 'business',
  service: 'service',
  creative: 'creative', design: 'creative',
  education: 'humanitarian', social: 'humanitarian', humanitarian: 'humanitarian',
  sport: 'sport',
  nature: 'nature', bio: 'nature',
}

const PERSONALITY_FROM_PROFILE = {
  digital: 'analyst', engineering: 'maker', industrial: 'maker',
  business: 'organizer', service: 'helper', creative: 'creator',
  humanitarian: 'helper', sport: 'active', nature: 'researcher',
}

const SCORE_WEIGHTS = { 1: 0.15, 2: 0.30, 3: 0.45, 4: 0.60, 5: 0.75 }

function safeFloat(v, def = 0) {
  const n = parseFloat(v)
  return isFinite(n) ? n : def
}

function normalize(obj) {
  const clean = {}
  for (const [k, v] of Object.entries(obj)) {
    const f = Math.max(0, safeFloat(v))
    if (f > 0) clean[k] = f
  }
  const total = Object.values(clean).reduce((a, b) => a + b, 0)
  if (total <= 0) return {}
  return Object.fromEntries(Object.entries(clean).map(([k, v]) => [k, v / total]))
}

function cosineSim(a, b) {
  if (!a || !b) return 0
  const keys = new Set([...Object.keys(a), ...Object.keys(b)])
  let dot = 0, na = 0, nb = 0
  for (const k of keys) {
    const av = a[k] || 0, bv = b[k] || 0
    dot += av * bv; na += av * av; nb += bv * bv
  }
  if (na === 0 || nb === 0) return 0
  return dot / (Math.sqrt(na) * Math.sqrt(nb))
}

function softPercent(v) {
  v = Math.max(0, Math.min(1, v))
  return Math.min(38 + 54 * Math.pow(v, 0.82), 94)
}

function buildUserVector(answers) {
  const scores = {}
  answers.forEach((ans, i) => {
    const q = QUESTIONS[i]
    const mult = SCORE_WEIGHTS[parseInt(ans)] || 0
    for (const [tag, w] of Object.entries(q.weights || {})) {
      scores[tag] = (scores[tag] || 0) + safeFloat(w) * mult
    }
  })
  return normalize(scores)
}

function profileScores(userVec) {
  const raw = {}
  for (const [pk, pv] of Object.entries(PROFILES)) {
    raw[pk] = cosineSim(userVec, normalize(pv))
  }
  const total = Object.values(raw).reduce((a, b) => a + b, 0)
  const scaled = total > 0
    ? Object.fromEntries(Object.entries(raw).map(([k, v]) => [k, (v / total) * 100]))
    : Object.fromEntries(Object.keys(PROFILES).map(k => [k, 0]))
  const result = {}
  for (const [k, v] of Object.entries(scaled)) {
    if (v > 0) result[PROFILE_TITLES[k] || k] = Math.round(v * 10) / 10
  }
  return result
}

function mainProfileKey(userVec) {
  let best = 'digital', bestScore = -1
  for (const [pk, pv] of Object.entries(PROFILES)) {
    const s = cosineSim(userVec, normalize(pv))
    if (s > bestScore) { bestScore = s; best = pk }
  }
  return best
}

function detectPersonality(userVec) {
  const pk = mainProfileKey(userVec)
  const key = PERSONALITY_FROM_PROFILE[pk] || 'analyst'
  return PERSONALITY_TITLES[key] || key
}

function prepSpecVec(spec) {
  const raw = spec.tags || {}
  return normalize(Object.fromEntries(Object.entries(raw).map(([k, v]) => [k, safeFloat(v, 1)])))
}

function collegeBonus(college, userVec, specVec) {
  const pt = college.priority_tags || {}
  let overlap = 0
  for (const [tag, w] of Object.entries(pt)) {
    overlap += (userVec[tag] || 0) * (specVec[tag] || 0) * safeFloat(w, 1)
  }
  return Math.min(overlap * 0.12, 0.08)
}

function profileBonus(spec, mainPK) {
  const profiles = spec.profiles || []
  if (profiles.includes(mainPK)) return 0.16
  const sv = prepSpecVec(spec)
  let bonus = 0
  for (const [tag, w] of Object.entries(sv)) {
    if (TAG_TO_PROFILE[tag] === mainPK) bonus += w * 0.08
  }
  return Math.min(bonus, 0.08)
}

function personalityBonus(spec, personalityLabel) {
  const raw = spec.personality || spec.personalities || []
  let matchKey = null
  for (const [k, v] of Object.entries(PERSONALITY_TITLES)) {
    if (v === personalityLabel) { matchKey = k; break }
  }
  return matchKey && raw.includes(matchKey) ? 0.05 : 0
}

function coveragePenalty(userVec, specVec) {
  let missing = 0, total = 0
  for (const [tag, w] of Object.entries(specVec)) {
    total += w
    if ((userVec[tag] || 0) < 0.03) missing += w
  }
  if (total <= 0) return 0
  return Math.min((missing / total) * 0.10, 0.10)
}

function profileMismatchPenalty(spec, mainPK) {
  const profiles = spec.profiles || []
  if (!profiles.length || profiles.includes(mainPK)) return 0
  const hardMismatch = {
    service: { industrial: 0.20, engineering: 0.16 },
    humanitarian: { industrial: 0.20, engineering: 0.14 },
    creative: { industrial: 0.16, engineering: 0.12 },
    digital: { service: 0.10, humanitarian: 0.08 },
    industrial: { service: 0.12, humanitarian: 0.10 },
    business: { industrial: 0.08 },
  }
  const penalties = hardMismatch[mainPK] || {}
  for (const p of profiles) {
    if (penalties[p]) return penalties[p]
  }
  return 0.06
}

export function recommend(answers, colleges, topN = 8) {
  let userVec = buildUserVector(answers)
  if (!Object.keys(userVec).length) {
    userVec = { it: 0.18, engineering: 0.15, business: 0.16, service: 0.16, social: 0.16, creative: 0.16 }
  }

  if (!colleges || colleges.length === 0) {
    return {
      recommendations: [],
      profile_scores: {},
      top_tags: [],
      profile_title: '',
      personality_title: '',
      match_percent: 0,
      mixed_profile: false,
      summary: 'Нет данных о колледжах. Добавьте информацию о техникумах и специальностях.',
    }
  }

  const pScores = profileScores(userVec)
  const sortedProfiles = Object.entries(pScores).sort((a, b) => b[1] - a[1])
  const mainPK = mainProfileKey(userVec)
  const profileTitle = PROFILE_TITLES[mainPK] || mainPK
  const personalityTitle = detectPersonality(userVec)

  const mainPercent = sortedProfiles[0]?.[1] || 0
  const secondPercent = sortedProfiles[1]?.[1] || 0
  const profileGap = mainPercent - secondPercent
  const mixedProfile = mainPercent < 22 || profileGap < 5

  const topProfileKeys = []
  for (const [label] of sortedProfiles.slice(0, 3)) {
    for (const [k, v] of Object.entries(PROFILE_TITLES)) {
      if (v === label) { topProfileKeys.push(k); break }
    }
  }

  const recs = []
  for (const college of colleges) {
    for (const spec of college.specialties || []) {
      const sv = prepSpecVec(spec)
      if (!Object.keys(sv).length) continue
      const specProfiles = spec.profiles || []
      if (mixedProfile && specProfiles.length && !specProfiles.some(p => topProfileKeys.includes(p))) continue

      const similarity = cosineSim(userVec, sv)
      const pb = profileBonus(spec, mainPK)
      let perb = personalityBonus(spec, personalityTitle)
      if (mixedProfile) perb *= 0.45
      const cb = collegeBonus(college, userVec, sv)
      const pen = coveragePenalty(userVec, sv)
      const mmp = profileMismatchPenalty(spec, mainPK)

      let finalScore = similarity + pb + perb + cb - pen - mmp
      if (mixedProfile) {
        if (specProfiles.includes('industrial') && topProfileKeys.includes('service')) finalScore -= 0.10
        if (specProfiles.includes('industrial') && topProfileKeys.includes('humanitarian')) finalScore -= 0.08
        if (specProfiles.includes('industrial') && topProfileKeys.includes('digital')) finalScore -= 0.05
      }
      finalScore = Math.max(0, Math.min(finalScore, 1))

      const reasons = []
      if (similarity >= 0.55) reasons.push('сильное совпадение по интересам')
      else if (similarity >= 0.40) reasons.push('хорошее совпадение по интересам')
      else reasons.push('есть базовое совпадение по интересам')
      if (pb >= 0.03) reasons.push(`подходит под профиль «${profileTitle}»`)
      if (perb > 0) reasons.push(`учитывает тип личности «${personalityTitle}»`)
      if (cb >= 0.03) reasons.push('у колледжа сильное направление в этой области')
      if (mixedProfile) reasons.push('профиль выражен смешанно, рекомендация ориентировочная')

      recs.push({
        code: spec.code || '',
        specialty: spec.name || 'Без названия',
        college_name: college.name || '',
        college_short: college.short || '',
        college_city: college.city || 'Каменск-Уральский',
        college_site: college.website || '',
        education_form: spec.education_form || '',
        duration: spec.duration || '',
        match_percent: softPercent(finalScore),
        raw_score: Math.round(finalScore * 10000) / 10000,
        reason: reasons.join('; '),
        reasons,
      })
    }
  }

  recs.sort((a, b) => b.raw_score - a.raw_score || b.match_percent - a.match_percent)

  const seen = new Set()
  const unique = []
  for (const r of recs) {
    const key = r.code || `${r.specialty}|${r.college_short}`
    if (!seen.has(key)) { seen.add(key); unique.push(r) }
  }
  const topRecs = unique.slice(0, topN)

  if (topRecs.length > 1) {
    const best = topRecs[0].raw_score
    const worst = topRecs[topRecs.length - 1].raw_score
    const spread = Math.max(best - worst, 0.001)
    for (const r of topRecs) {
      const relative = (r.raw_score - worst) / spread
      let shown = 58 + relative * 28
      shown = Math.max(Math.min(shown, r.match_percent), shown)
      r.match_percent = Math.round(Math.min(shown, 94) * 10) / 10
    }
  }
  if (mixedProfile) {
    for (const r of topRecs) r.match_percent = Math.min(r.match_percent, 74)
  }

  const top = topRecs[0] || {}
  const sortedTags = Object.entries(userVec).sort((a, b) => b[1] - a[1])
  const topTags = sortedTags.slice(0, 6).map(([k, v]) => [TAG_LABELS[k] || k, Math.round(v * 1000) / 10])

  const summary = mixedProfile
    ? `Профиль выражен смешанно. Ближайшее направление: ${top.specialty || 'не определено'}. Рекомендуемый колледж: ${top.college_name || 'не определён'}.`
    : `Наиболее подходящее направление: ${top.specialty || 'не определено'}. Рекомендуемый колледж: ${top.college_name || 'не определён'}.`

  return {
    profile_key: mainPK,
    profile_title: profileTitle,
    personality_title: personalityTitle,
    match_percent: top.match_percent || 0,
    top_specialty: top.specialty || '',
    top_college: top.college_name || '',
    top_recommendation: top,
    summary,
    top_tags: topTags,
    tag_scores: Object.fromEntries(sortedTags.map(([k, v]) => [k, Math.round(v * 1000) / 10])),
    profile_scores: pScores,
    recommendations: topRecs,
    mixed_profile: mixedProfile,
    profile_gap: Math.round(profileGap * 10) / 10,
  }
}
