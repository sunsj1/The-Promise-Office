import {
  allQuestions,
  confidenceZoneLibrary,
  consequencesLibrary,
  coreDimensions,
  heroLibrary,
  interventionsLibrary,
  lenses,
  modules,
  orientationQuestions,
  patternLibrary,
  questionBank,
  trackSupport,
  type CoreDimension,
  type Module,
  type Question,
  type TrackKey,
} from '@/data/diagnostic'

/**
 * Deterministic adaptive engine for the Health Check (V1 — no AI/LLM call).
 *
 * Question selection: breadth-first across tracks until every active track
 * has at least "limited" evidence, then depth-first on tracks that are still
 * ambiguous, honouring skip conditions and injecting contradiction
 * follow-ups immediately when triggered. Stops once there is enough evidence
 * to say something, or the eligible pool runs out.
 *
 * A future AI-assisted selector can replace only `pickNext` and the
 * confidence heuristics below — the question bank, evidence model and
 * result shape are designed to stay unchanged.
 */

export type EvidenceStrength = 'none' | 'limited' | 'sufficient' | 'strong'
export type Direction = 'positive' | 'negative' | 'mixed' | 'neutral'

export type TrackEvidence = {
  track: TrackKey
  label: string
  units: number
  avg: number
  strength: EvidenceStrength
  direction: Direction
}

export type EngineState = {
  answers: Record<string, number>
  askedIds: string[]
  pendingQueue: string[]
  activeModules: Set<Module>
}

const MIN_QUESTIONS = 8
const MAX_QUESTIONS = 15
const SUFFICIENT_UNITS = 2
const STRONG_UNITS = 4

const trackLabel: Record<TrackKey, string> = Object.fromEntries([
  ...coreDimensions.map((d) => [d.key, d.label]),
  ...lenses.map((l) => [l.key, l.label]),
  ...modules.map((m) => [m.key, m.label]),
]) as Record<TrackKey, string>

export function createInitialState(): EngineState {
  return { answers: {}, askedIds: [], pendingQueue: [], activeModules: new Set() }
}

function questionById(id: string): Question | undefined {
  return allQuestions.find((q) => q.id === id)
}

function trackEvidenceUnits(state: EngineState, track: TrackKey): number {
  return state.askedIds.reduce((total, id) => {
    const q = questionById(id)
    if (!q || q.track !== track || !(id in state.answers)) return total
    return total + (q.weight === 'strong' ? 2 : 1)
  }, 0)
}

function isEligible(state: EngineState, q: Question): boolean {
  if (state.askedIds.includes(q.id)) return false
  if (q.requiresModule && !state.activeModules.has(q.requiresModule)) return false
  if (q.skipIf && q.skipIf({ answers: state.answers, askedIds: state.askedIds, activeModules: state.activeModules }))
    return false
  return true
}

function activeCoreAndLensTracks(state: EngineState): TrackKey[] {
  const base: TrackKey[] = [...coreDimensions.map((d) => d.key), ...lenses.map((l) => l.key)]
  const moduleTracks: TrackKey[] = modules.filter((m) => state.activeModules.has(m.key)).map((m) => m.key)
  return [...base, ...moduleTracks]
}

/** Returns the next question to ask, or null if the diagnostic is complete. */
export function getNextQuestion(state: EngineState): Question | null {
  // 1. Orientation runs first, in fixed order.
  const nextOrientation = orientationQuestions.find((q) => !state.askedIds.includes(q.id))
  if (nextOrientation) return nextOrientation

  // 2. Any queued contradiction follow-up takes priority.
  if (state.pendingQueue.length > 0) {
    const followUp = questionById(state.pendingQueue[0])
    if (followUp && isEligible(state, followUp)) return followUp
  }

  const answeredCount = state.askedIds.length - orientationQuestions.length
  if (answeredCount >= MAX_QUESTIONS) return null

  const tracks = activeCoreAndLensTracks(state)
  const evidenceByTrack = new Map(tracks.map((t) => [t, trackEvidenceUnits(state, t)]))

  const eligible = questionBank.filter((q) => isEligible(state, q))
  if (eligible.length === 0) return null

  // Stop once every active track has at least "limited" evidence and at
  // least 3 tracks have reached "sufficient", provided the minimum question
  // count has been met.
  const allTracksHaveSomeEvidence = tracks.every((t) => (evidenceByTrack.get(t) ?? 0) > 0)
  const sufficientTrackCount = tracks.filter((t) => (evidenceByTrack.get(t) ?? 0) >= SUFFICIENT_UNITS).length
  if (answeredCount >= MIN_QUESTIONS && allTracksHaveSomeEvidence && sufficientTrackCount >= 3) {
    return null
  }

  // Breadth-first: prioritise tracks with zero evidence yet.
  const zeroEvidence = eligible.filter((q) => (evidenceByTrack.get(q.track as TrackKey) ?? 0) === 0)
  if (zeroEvidence.length > 0) return zeroEvidence[0]

  // Depth: prioritise tracks below "sufficient".
  const belowSufficient = eligible
    .filter((q) => (evidenceByTrack.get(q.track as TrackKey) ?? 0) < SUFFICIENT_UNITS)
    .sort((a, b) => (evidenceByTrack.get(a.track as TrackKey) ?? 0) - (evidenceByTrack.get(b.track as TrackKey) ?? 0))
  if (belowSufficient.length > 0) return belowSufficient[0]

  if (answeredCount >= MIN_QUESTIONS) return null
  return eligible[0]
}

export function applyAnswer(state: EngineState, question: Question, optionIndex: number): EngineState {
  const option = question.options[optionIndex]
  const next: EngineState = {
    answers: { ...state.answers, [question.id]: option.value },
    askedIds: [...state.askedIds, question.id],
    pendingQueue: state.pendingQueue.filter((id) => id !== question.id),
    activeModules: new Set(state.activeModules),
  }

  if (question.activatesModule && option.label === 'Yes') {
    next.activeModules.add(question.activatesModule)
  }

  if (question.contradiction) {
    const otherValue = next.answers[question.contradiction.withQuestionId]
    if (otherValue !== undefined && question.contradiction.when(option.value, otherValue)) {
      if (!next.pendingQueue.includes(question.contradiction.followUpId)) {
        next.pendingQueue = [...next.pendingQueue, question.contradiction.followUpId]
      }
    }
  }
  // Also check the reverse direction (this question may be the "other" half of a pair asked later).
  for (const q of allQuestions) {
    if (q.contradiction?.withQuestionId === question.id) {
      const thisValue = next.answers[q.id]
      if (thisValue !== undefined && q.contradiction.when(thisValue, option.value)) {
        if (!next.pendingQueue.includes(q.contradiction.followUpId)) {
          next.pendingQueue = [...next.pendingQueue, q.contradiction.followUpId]
        }
      }
    }
  }

  return next
}

export function isComplete(state: EngineState): boolean {
  return getNextQuestion(state) === null && state.askedIds.length > orientationQuestions.length
}

export function progressCount(state: EngineState): { answered: number; estimatedTotal: number } {
  const answered = Math.max(0, state.askedIds.length - orientationQuestions.length)
  return { answered, estimatedTotal: MAX_QUESTIONS }
}

/**
 * Human-readable phase, shown from question 1 so the visitor always has a
 * sense of where they are — never an exact count, since the path is adaptive.
 */
export function getPhaseLabel(state: EngineState, currentQuestion: Question | null): string {
  if (!currentQuestion || currentQuestion.track === 'orientation') return 'Orientation'
  const { answered } = progressCount(state)
  const tracks = activeCoreAndLensTracks(state)
  const sufficientCount = tracks.filter((t) => trackEvidenceUnits(state, t) >= SUFFICIENT_UNITS).length
  if (state.pendingQueue.length > 0) return 'Validating the diagnosis'
  if (answered <= 2) return 'Understanding your situation'
  if (sufficientCount < Math.ceil(tracks.length / 2)) return 'Exploring the strongest signals'
  return 'Preparing your assessment'
}

function computeTrackEvidence(state: EngineState, track: TrackKey): TrackEvidence {
  const ids = state.askedIds.filter((id) => questionById(id)?.track === track)
  const units = trackEvidenceUnits(state, track)
  const values = ids.map((id) => state.answers[id]).filter((v) => v !== undefined)
  const avg = values.length ? values.reduce((a, b) => a + b, 0) / values.length : 0

  let strength: EvidenceStrength = 'none'
  if (units >= STRONG_UNITS) strength = 'strong'
  else if (units >= SUFFICIENT_UNITS) strength = 'sufficient'
  else if (units > 0) strength = 'limited'

  let direction: Direction = 'neutral'
  if (values.length) {
    if (avg > 0.4) direction = 'negative'
    else if (avg < -0.4) direction = 'positive'
    else direction = 'mixed'
  }

  return { track, label: trackLabel[track], units, avg, strength, direction }
}

export type DiagnosticResult = {
  pattern: string
  interpretation: string
  primaryConstraint: TrackEvidence | null
  secondaryConstraint: TrackEvidence | null
  contributingConditions: TrackEvidence[]
  strengthToPreserve: TrackEvidence | null
  coreReadings: TrackEvidence[]
  crossCutting: TrackEvidence[]
  domainSignals: TrackEvidence[]
  limitedAreas: TrackEvidence[]
  promiseConfidence: 'Exposed' | 'Developing' | 'Controlled' | 'Confidence Zone'
  diagnosticConfidence: {
    band: 'High' | 'Moderate' | 'Needs more context'
    note: string
  }
  oneQuestionBack: string
  examineNext: string[]
  relevantSupport: { label: string; to: string }[]
  /** Plain-English executive headline — shown as the result hero, above `pattern`. */
  heroStatement: string
  /** 2-4 translated signals explaining why the diagnosis landed where it did. */
  whyWeThinkThis: string[]
  /** Only the readings that materially contributed (sufficient+ evidence) — for the primary "at a glance" visual. */
  materialReadings: TrackEvidence[]
  consequences: { title: string; body: string }[]
  pathToConfidenceZone: {
    currentPosition: string
    interventions: string[]
    confidenceZone: string
  } | null
}

const oneQuestionByTrack: Record<TrackKey, string> = {
  'value-priorities':
    'If we stopped the lowest-value 20% of active initiatives tomorrow, what would actually break?',
  economics: 'Do you know this month’s margin on each active account — or does it surface at quarter-end?',
  execution: 'How often do delivery dates move without a documented reason, and does everyone agree on why?',
  governance: 'What percentage of our governance meetings result in an explicit decision, rather than an update?',
  'operating-model':
    'If the people holding the most critical operating knowledge left tomorrow, how quickly could we reconstruct it?',
  'commercial-alignment':
    'Before the next proposal goes out, who from delivery signs off that the estimate and staffing model are actually executable?',
  'benefits-realisation': 'Six months after go-live, who is accountable for confirming the benefit actually happened?',
  gcc: 'If headquarters stopped reviewing every decision the centre makes, what would it actually be ready to own tomorrow?',
  ai: 'How much of our AI activity is producing measurable business value, rather than demonstrating technical capability?',
}

export function computeResult(state: EngineState): DiagnosticResult {
  const tracks = activeCoreAndLensTracks(state)
  const evidence = tracks.map((t) => computeTrackEvidence(state, t))

  const negativeQualified = evidence
    .filter((e) => e.strength !== 'none' && e.strength !== 'limited' && e.direction === 'negative')
    .sort((a, b) => b.avg - a.avg)

  const primaryConstraint = negativeQualified[0] ?? null
  const secondaryConstraint =
    negativeQualified[1] && negativeQualified[1].avg >= 0.8 ? negativeQualified[1] : null

  const contributingConditions = evidence
    .filter(
      (e) =>
        e.strength === 'limited' &&
        e.direction === 'negative' &&
        e.avg >= 0.5 &&
        e.track !== primaryConstraint?.track &&
        e.track !== secondaryConstraint?.track,
    )
    .sort((a, b) => b.avg - a.avg)
    .slice(0, 2)

  const strengthCandidates = evidence
    .filter((e) => (e.strength === 'sufficient' || e.strength === 'strong') && e.direction === 'positive')
    .sort((a, b) => a.avg - b.avg)
  const strengthToPreserve = strengthCandidates[0] ?? null

  const limitedAreas = evidence.filter(
    (e) =>
      coreDimensions.some((d) => d.key === e.track) &&
      (e.strength === 'none' || e.strength === 'limited') &&
      e.track !== primaryConstraint?.track &&
      !contributingConditions.some((c) => c.track === e.track),
  )

  const coreReadings = evidence.filter((e) => coreDimensions.some((d) => d.key === e.track))
  const crossCutting = evidence.filter((e) => lenses.some((l) => l.key === e.track))
  const domainSignals = evidence.filter((e) => modules.some((m) => m.key === e.track))

  // Pattern statement
  let pattern = 'No single constraint dominates the pattern yet — several areas show moderate signal worth exploring together.'
  if (primaryConstraint) {
    const exact = patternLibrary.find(
      (p) =>
        p.primary === primaryConstraint.track &&
        (!p.preserved || p.preserved === strengthToPreserve?.track),
    )
    const byPrimaryOnly = patternLibrary.find((p) => p.primary === primaryConstraint.track)
    pattern = exact?.statement ?? byPrimaryOnly?.statement ?? `${primaryConstraint.label} appears to be the more significant constraint right now.`
  }

  const interpretation = primaryConstraint
    ? `The answer pattern points toward ${primaryConstraint.label.toLowerCase()} as the strongest signal in what you've shared, ${
        strengthToPreserve ? `alongside a genuinely tested strength in ${strengthToPreserve.label.toLowerCase()}` : 'without a clearly evidenced strength to set against it yet'
      }.`
    : 'The answers collected so far are spread fairly evenly, without one area standing out as materially more exposed than the others.'

  // Promise Confidence band
  const negativeSufficientCount = evidence.filter(
    (e) => e.direction === 'negative' && (e.strength === 'sufficient' || e.strength === 'strong'),
  ).length
  let promiseConfidence: DiagnosticResult['promiseConfidence'] = 'Controlled'
  if (primaryConstraint && (primaryConstraint.strength === 'strong' || primaryConstraint.avg >= 1.2) && negativeSufficientCount >= 2) {
    promiseConfidence = 'Exposed'
  } else if (primaryConstraint) {
    promiseConfidence = 'Developing'
  } else if (strengthToPreserve) {
    promiseConfidence = 'Confidence Zone'
  }

  // Diagnostic Confidence
  const answeredCount = state.askedIds.length - orientationQuestions.length
  let diagnosticConfidence: DiagnosticResult['diagnosticConfidence']
  if (!primaryConstraint) {
    diagnosticConfidence = {
      band: 'Needs more context',
      note: 'No single constraint separated itself clearly from the alternatives — a longer conversation would likely sharpen this.',
    }
  } else if ((primaryConstraint.strength === 'strong' || primaryConstraint.avg >= 1.3) && answeredCount >= 10) {
    diagnosticConfidence = {
      band: 'High',
      note: 'The answer pattern is consistent, and the primary constraint was tested against at least one plausible alternative.',
    }
  } else {
    const weakest = limitedAreas[0]
    diagnosticConfidence = {
      band: 'Moderate',
      note: weakest
        ? `The pattern is reasonably clear, but further information about ${weakest.label.toLowerCase()} would improve confidence.`
        : 'The pattern is reasonably clear, though based on a shorter answer set than ideal.',
    }
  }

  const oneQuestionBack = primaryConstraint ? oneQuestionByTrack[primaryConstraint.track] : oneQuestionByTrack['value-priorities']

  const relevantTracks = [primaryConstraint?.track, secondaryConstraint?.track, ...contributingConditions.map((c) => c.track)].filter(
    (t): t is TrackKey => !!t,
  )
  const relevantSupport = Array.from(
    new Map(relevantTracks.flatMap((t) => trackSupport[t].map((s) => [s.to, s]))).values(),
  ).slice(0, 4)

  // Distinct from relevantSupport: these are diagnostic areas worth a closer look,
  // not the advisory practices that address them (shown separately below).
  const examineNext = relevantTracks.map((t) => trackLabel[t]).slice(0, 4)

  const heroStatement = primaryConstraint
    ? heroLibrary[primaryConstraint.track]
    : 'No single issue dominates — the pattern is fairly even across what you’ve shared.'

  // Why we think this: pull the signalNote from every answered question that
  // (a) belongs to a track that materially contributed, and (b) was actually
  // answered on the concerning side. Business language, no raw scoring.
  const materialTrackKeys = new Set(
    [primaryConstraint?.track, secondaryConstraint?.track, ...contributingConditions.map((c) => c.track)].filter(
      (t): t is TrackKey => !!t,
    ),
  )
  const whyWeThinkThis = state.askedIds
    .map((id) => questionById(id))
    .filter((q): q is Question => !!q && !!q.signalNote && materialTrackKeys.has(q.track as TrackKey))
    .filter((q) => (state.answers[q.id] ?? 0) > 0)
    .map((q) => q.signalNote as string)
    .slice(0, 4)

  // Capped at 5 and prioritised by narrative relevance (primary/secondary/
  // contributing/preserved first) — a uniformly bad or uniformly good answer
  // set can still legitimately fill all 5, but this stops "everything has
  // sufficient evidence" from turning into a 7-row wall on a mixed result.
  const priorityOrder: TrackKey[] = [
    primaryConstraint?.track,
    secondaryConstraint?.track,
    ...contributingConditions.map((c) => c.track),
    strengthToPreserve?.track,
  ].filter((t): t is TrackKey => !!t)
  const materialReadings = evidence
    .filter((e) => e.strength === 'sufficient' || e.strength === 'strong')
    .sort((a, b) => {
      const ai = priorityOrder.includes(a.track) ? priorityOrder.indexOf(a.track) : 99
      const bi = priorityOrder.includes(b.track) ? priorityOrder.indexOf(b.track) : 99
      if (ai !== bi) return ai - bi
      // Exposure first (worst to least), then strengths.
      const rank = (x: TrackEvidence) => (x.direction === 'negative' ? -x.avg : x.direction === 'positive' ? 10 + x.avg : 5)
      return rank(a) - rank(b)
    })
    .slice(0, 5)

  const consequences = primaryConstraint ? consequencesLibrary[primaryConstraint.track].slice(0, 3) : []

  const pathToConfidenceZone = primaryConstraint
    ? {
        currentPosition: heroStatement,
        interventions: interventionsLibrary[primaryConstraint.track],
        confidenceZone: confidenceZoneLibrary[primaryConstraint.track],
      }
    : null

  return {
    pattern,
    interpretation,
    primaryConstraint,
    secondaryConstraint,
    contributingConditions,
    strengthToPreserve,
    coreReadings,
    crossCutting,
    domainSignals,
    limitedAreas,
    promiseConfidence,
    diagnosticConfidence,
    oneQuestionBack,
    examineNext,
    relevantSupport,
    heroStatement,
    whyWeThinkThis,
    materialReadings,
    consequences,
    pathToConfidenceZone,
  }
}

export function evidenceLabel(strength: EvidenceStrength): string {
  switch (strength) {
    case 'strong':
    case 'sufficient':
      return ''
    case 'limited':
      return 'Limited signal'
    case 'none':
      return 'Not assessed'
  }
}

/**
 * Visitor-facing label — deliberately plainer than the internal
 * strength/direction vocabulary (which the engine keeps for its own use).
 */
export function simpleReadingLabel(e: TrackEvidence): { text: string; tone: 'muted' | 'exposure' | 'solid' } {
  if (e.strength === 'none' || e.strength === 'limited') return { text: 'Not enough information', tone: 'muted' }
  if (e.direction === 'negative') {
    if (e.avg >= 1.3) return { text: 'High exposure', tone: 'exposure' }
    return { text: 'Needs attention', tone: 'exposure' }
  }
  if (e.direction === 'positive') return { text: e.avg <= -1.3 ? 'Strength' : 'Working well', tone: 'solid' }
  return { text: 'Needs attention', tone: 'muted' }
}

export type { CoreDimension }
