/**
 * Adaptive Advisory Diagnostic — question bank and static reference data.
 *
 * This is rule-based (no AI/LLM call). The metadata on each question is what
 * lets `lib/diagnosticEngine.ts` pick the next question, detect contradictions
 * and know how much evidence it has per dimension — see that file for the
 * V1 selection/scoring logic. Keeping the bank and the engine separate is
 * what lets a V2 (AI-assisted selection) replace only the engine later.
 */

export type CoreDimension =
  | 'value-priorities'
  | 'economics'
  | 'execution'
  | 'governance'
  | 'operating-model'

export type Lens = 'commercial-alignment' | 'benefits-realisation'

export type Module = 'gcc' | 'ai'

export type TrackKey = CoreDimension | Lens | Module

export const coreDimensions: { key: CoreDimension; label: string }[] = [
  { key: 'value-priorities', label: 'Value & Priorities' },
  { key: 'economics', label: 'Economics & Value Leakage' },
  { key: 'execution', label: 'Execution & Transformation' },
  { key: 'governance', label: 'Governance & Decision Quality' },
  { key: 'operating-model', label: 'Operating Model & Capability' },
]

export const lenses: { key: Lens; label: string }[] = [
  { key: 'commercial-alignment', label: 'Commercial & Delivery Alignment' },
  { key: 'benefits-realisation', label: 'Benefits Realisation' },
]

export const modules: { key: Module; label: string }[] = [
  { key: 'gcc', label: 'GCC Value & Capability' },
  { key: 'ai', label: 'AI Value & Readiness' },
]

/** Where each track points when it's the constraint worth examining next. */
export const trackSupport: Record<TrackKey, { label: string; to: string }[]> = {
  'value-priorities': [{ label: 'Practice & Capability Building', to: '/advisory#practice-capability-building' }],
  economics: [{ label: 'Commercial & Value Assurance', to: '/advisory#commercial-value-assurance' }],
  execution: [{ label: 'Red-to-Ready Turnaround', to: '/advisory/red-to-ready-turnaround' }],
  governance: [{ label: 'Governance & Delivery Leadership', to: '/advisory#governance-delivery-leadership' }],
  'operating-model': [{ label: 'Practice & Capability Building', to: '/advisory#practice-capability-building' }],
  'commercial-alignment': [{ label: 'Pursuit, RFP & Deal Assurance', to: '/advisory#pursuit-deal-assurance' }],
  'benefits-realisation': [{ label: 'Practice & Capability Building', to: '/advisory#practice-capability-building' }],
  gcc: [{ label: 'GCC advisory', to: '/gcc' }],
  ai: [{ label: 'AI advisory', to: '/ai' }],
}

export type AnswerOption = {
  label: string
  /** -2 (clearly healthy) to +2 (clearly exposed). 0 is neutral/uninformative. */
  value: -2 | -1 | 0 | 1 | 2
}

export type Question = {
  id: string
  track: TrackKey | 'orientation'
  text: string
  options: AnswerOption[]
  /** How much this single answer contributes to the track's evidence strength. */
  weight: 'limited' | 'strong'
  /** Only asked if this module is active (from orientation). */
  requiresModule?: Module
  /** Skip this question if true given the running state. */
  skipIf?: (ctx: EngineContext) => boolean
  /** Sets a module active when a specific option is chosen (orientation only). */
  activatesModule?: Module
  /** Fires a specific follow-up question id when both conditions hold. */
  contradiction?: {
    withQuestionId: string
    /** Return true if the two answers are in tension. */
    when: (thisValue: number, otherValue: number) => boolean
    followUpId: string
  }
}

/** Minimal shape the engine passes into skipIf — kept here to avoid a circular import. */
export type EngineContext = {
  answers: Record<string, number>
  askedIds: string[]
  activeModules: Set<Module>
}

export const orientationQuestions: Question[] = [
  {
    id: 'ORI-01',
    track: 'orientation',
    text: 'What best describes the situation you are trying to improve?',
    weight: 'limited',
    options: [
      { label: 'Transformation is moving, but outcomes remain unclear', value: 0 },
      { label: 'Delivery is becoming unpredictable', value: 0 },
      { label: 'Costs or complexity are increasing', value: 0 },
      { label: 'Governance is heavy but decisions remain slow', value: 0 },
      { label: 'We are considering or scaling a GCC', value: 0 },
      { label: 'We want to identify meaningful AI opportunities', value: 0 },
      { label: 'We have too many initiatives and unclear priorities', value: 0 },
      { label: 'Commercial commitments and delivery reality are diverging', value: 0 },
      { label: 'Something else', value: 0 },
    ],
  },
  {
    id: 'ORI-02',
    track: 'orientation',
    text: 'How would you describe the pace of change your organisation is currently carrying?',
    weight: 'limited',
    options: [
      { label: 'Manageable', value: -1 },
      { label: 'Heavy, but coping', value: 0 },
      { label: 'More than we can absorb', value: 2 },
    ],
  },
  {
    id: 'ORI-03',
    track: 'orientation',
    text: 'If one thing would most improve outcomes right now, is it doing fewer things, deciding faster, clearer ownership, or something structural (skills, systems, location of work)?',
    weight: 'limited',
    options: [
      { label: 'Doing fewer things', value: 0 },
      { label: 'Deciding faster', value: 0 },
      { label: 'Clearer ownership', value: 0 },
      { label: 'Something structural', value: 0 },
      { label: 'Not sure', value: 0 },
    ],
  },
  {
    id: 'ORI-04',
    track: 'orientation',
    text: 'Are you also actively exploring or scaling a Global Capability Centre / India-based capability?',
    weight: 'limited',
    activatesModule: 'gcc',
    options: [
      { label: 'Yes', value: 0 },
      { label: 'No', value: 0 },
    ],
  },
  {
    id: 'ORI-05',
    track: 'orientation',
    text: 'Are you also running AI pilots or initiatives you want a clearer read on?',
    weight: 'limited',
    activatesModule: 'ai',
    options: [
      { label: 'Yes', value: 0 },
      { label: 'No', value: 0 },
    ],
  },
]

export const questionBank: Question[] = [
  // Value & Priorities
  {
    id: 'VP-01',
    track: 'value-priorities',
    text: 'For your top initiatives, is there a named owner accountable for the business benefit — separate from whoever owns technical delivery?',
    weight: 'strong',
    options: [
      { label: 'Yes, clearly', value: -2 },
      { label: 'Informally', value: 0 },
      { label: 'No', value: 2 },
    ],
  },
  {
    id: 'VP-02',
    track: 'value-priorities',
    text: 'When priorities compete for the same people or budget, how consistently are the lower-value initiatives actually stopped or deferred?',
    weight: 'strong',
    options: [
      { label: 'Consistently', value: -2 },
      { label: 'Sometimes', value: 0 },
      { label: 'Rarely', value: 2 },
    ],
    contradiction: {
      withQuestionId: 'VP-03',
      when: (thisValue, otherValue) => thisValue >= 2 && otherValue <= -1,
      followUpId: 'VP-02-FOLLOWUP',
    },
  },
  {
    id: 'VP-03',
    track: 'value-priorities',
    text: 'Would you say leadership priorities are clear and shared across the organisation?',
    weight: 'limited',
    options: [
      { label: 'Yes', value: -1 },
      { label: 'Mostly', value: 0 },
      { label: 'No', value: 1 },
    ],
  },
  {
    id: 'VP-02-FOLLOWUP',
    track: 'value-priorities',
    text: 'When priorities compete for the same resources, how consistently are lower-value initiatives actually stopped or deferred, given priorities are described as clear?',
    weight: 'strong',
    options: [
      { label: 'They still get stopped once the conflict is visible', value: -1 },
      { label: 'They tend to stay alive in some reduced form', value: 2 },
    ],
  },
  {
    id: 'VP-04',
    track: 'execution',
    text: 'For the initiatives that are clearly prioritised, how reliably do they deliver against agreed scope and milestones?',
    weight: 'strong',
    options: [
      { label: 'Reliably, in most cases', value: -2 },
      { label: 'Mixed', value: 0 },
      { label: 'Rarely', value: 2 },
    ],
  },
  {
    id: 'VP-05',
    track: 'benefits-realisation',
    text: 'Does the original business case for your largest initiative still hold, or has the rationale shifted since it was approved?',
    weight: 'strong',
    options: [
      { label: 'Still holds', value: -1 },
      { label: 'Partly shifted', value: 1 },
      { label: 'No longer sure', value: 2 },
    ],
  },

  // Economics & Value Leakage
  {
    id: 'EC-01',
    track: 'economics',
    text: 'Is margin or cost-to-serve on your key accounts/programs reviewed monthly, or does it mainly surface at quarter-end?',
    weight: 'strong',
    options: [
      { label: 'Monthly, by account', value: -2 },
      { label: 'Roughly, not in detail', value: 0 },
      { label: 'Mainly at quarter-end', value: 2 },
    ],
  },
  {
    id: 'EC-02',
    track: 'economics',
    text: 'Where rework, duplication or manual effort shows up, has anyone quantified what it costs?',
    weight: 'limited',
    options: [
      { label: 'Named and costed', value: -1 },
      { label: 'Known anecdotally', value: 1 },
      { label: 'Not really tracked', value: 2 },
    ],
  },
  {
    id: 'EC-03',
    track: 'commercial-alignment',
    text: 'Has scope changed materially on a currently pressured program, and was it renegotiated commercially when it did?',
    weight: 'strong',
    options: [
      { label: 'No material scope change', value: -1 },
      { label: 'Some change, renegotiated', value: 0 },
      { label: 'Some change, not renegotiated', value: 2 },
    ],
  },
  {
    id: 'EC-04',
    track: 'economics',
    text: 'Do you have visibility of which parts of the portfolio are absorbing cost without a corresponding return?',
    weight: 'limited',
    options: [
      { label: 'Clear visibility', value: -1 },
      { label: 'Partial', value: 1 },
      { label: 'Not really', value: 2 },
    ],
  },

  // Execution & Transformation
  {
    id: 'EX-01',
    track: 'execution',
    text: 'How often do delivery dates move without a clearly documented reason?',
    weight: 'strong',
    options: [
      { label: 'Rarely', value: -2 },
      { label: 'Sometimes', value: 0 },
      { label: 'Frequently', value: 2 },
    ],
  },
  {
    id: 'EX-02',
    track: 'execution',
    text: "Do the teams involved generally agree on what 'done' looks like for the current phase of work?",
    weight: 'limited',
    options: [
      { label: 'Yes', value: -1 },
      { label: 'Mostly', value: 0 },
      { label: 'No — frequent disagreement', value: 2 },
    ],
  },
  {
    id: 'EX-03',
    track: 'operating-model',
    text: 'Is the sequencing of dependent work visible to everyone who needs it, or does it live mainly in one person’s head?',
    weight: 'limited',
    options: [
      { label: 'Visible and shared', value: -1 },
      { label: 'Known to a few', value: 1 },
      { label: 'Mainly one person', value: 2 },
    ],
  },
  {
    id: 'EX-04',
    track: 'commercial-alignment',
    text: 'Were the current staffing levels and timeline set during the original proposal, or renegotiated materially since?',
    weight: 'strong',
    options: [
      { label: 'Set originally, largely unchanged', value: 2 },
      { label: 'Renegotiated significantly since', value: -1 },
    ],
  },

  // Governance & Decision Quality
  {
    id: 'GV-01',
    track: 'governance',
    text: 'Can leadership see one true status for every active program right now, and do people trust it?',
    weight: 'strong',
    options: [
      { label: 'Yes, trusted', value: -2 },
      { label: 'Several reports, mostly agree', value: 0 },
      { label: 'Reports disagree depending who you ask', value: 2 },
    ],
    contradiction: {
      withQuestionId: 'GV-02',
      when: (thisValue, otherValue) => thisValue <= -1 && otherValue >= 2,
      followUpId: 'GV-CONTRADICTION',
    },
  },
  {
    id: 'GV-02',
    track: 'governance',
    text: 'When a decision is stuck between two teams or functions, who owns getting it unstuck?',
    weight: 'strong',
    options: [
      { label: 'Always a named owner', value: -2 },
      { label: 'Usually, after chasing', value: 0 },
      { label: 'Often nobody does', value: 2 },
    ],
  },
  {
    id: 'GV-CONTRADICTION',
    track: 'governance',
    text: 'Status reporting is described as trusted, yet stuck decisions often have no owner — where does that gap actually show up?',
    weight: 'strong',
    options: [
      { label: 'Escalation paths exist but are slow to trigger', value: 1 },
      { label: 'There is no defined escalation path at all', value: 2 },
    ],
  },
  {
    id: 'GV-03',
    track: 'governance',
    text: 'How often do decisions remain unresolved until senior leadership has to intervene?',
    weight: 'strong',
    options: [
      { label: 'Rarely', value: -1 },
      { label: 'Increasingly often', value: 2 },
      { label: 'Routinely', value: 2 },
    ],
  },
  {
    id: 'GV-04',
    track: 'governance',
    text: 'Roughly what share of your governance meetings result in an explicit decision, rather than an update?',
    weight: 'limited',
    options: [
      { label: 'Most', value: -1 },
      { label: 'About half', value: 1 },
      { label: 'Few', value: 2 },
    ],
  },
  {
    id: 'GV-05',
    track: 'commercial-alignment',
    text: 'Was the solutioning/delivery team involved in reviewing an estimate or staffing model before it was committed to a customer or sponsor?',
    weight: 'strong',
    options: [
      { label: 'Fully involved', value: -2 },
      { label: 'Limited involvement', value: 1 },
      { label: 'Not involved', value: 2 },
    ],
  },

  // Operating Model & Capability
  {
    id: 'OM-01',
    track: 'operating-model',
    text: 'If the two or three people who hold the most critical operating knowledge left tomorrow, how quickly could the organisation reconstruct it?',
    weight: 'strong',
    options: [
      { label: "Quickly — it's documented", value: -2 },
      { label: 'Slowly, with pain', value: 1 },
      { label: "We couldn't", value: 2 },
    ],
  },
  {
    id: 'OM-02',
    track: 'operating-model',
    text: 'Does a new proposal, transition or process start from a repeatable model, or from a blank page each time?',
    weight: 'strong',
    options: [
      { label: 'A repeatable model', value: -2 },
      { label: 'Some reuse, a lot of rework', value: 0 },
      { label: 'From scratch, most times', value: 2 },
    ],
  },
  {
    id: 'OM-03',
    track: 'operating-model',
    text: "Are roles and process ownership clear enough that two people wouldn't give different answers about who owns what?",
    weight: 'limited',
    options: [
      { label: 'Clear', value: -1 },
      { label: 'Some overlap or gaps', value: 1 },
      { label: 'Frequently unclear', value: 2 },
    ],
  },
  {
    id: 'OM-04',
    track: 'operating-model',
    text: 'When responsibility is delegated to a team or centre, does it perform successfully, or does it typically need to be pulled back?',
    weight: 'strong',
    options: [
      { label: 'Performs successfully', value: -2 },
      { label: 'Mixed', value: 0 },
      { label: 'Usually pulled back', value: 2 },
    ],
  },

  // Benefits Realisation (remaining)
  {
    id: 'BR-01',
    track: 'benefits-realisation',
    text: 'Beyond go-live, is anyone tracking whether the intended benefit actually materialised?',
    weight: 'strong',
    options: [
      { label: 'Yes, tracked and owned', value: -2 },
      { label: 'Informally, not owned', value: 1 },
      { label: 'Not really', value: 2 },
    ],
  },
  {
    id: 'BR-02',
    track: 'benefits-realisation',
    text: "Is adoption of what was delivered measured, or is 'delivered' treated as the finish line?",
    weight: 'strong',
    options: [
      { label: 'Measured', value: -2 },
      { label: 'Assumed, not measured', value: 1 },
      { label: 'Not considered', value: 2 },
    ],
  },

  // GCC module
  {
    id: 'GCC-01',
    track: 'gcc',
    requiresModule: 'gcc',
    text: 'Today, does the centre own outcomes end-to-end, or execute tasks assigned by the retained organisation?',
    weight: 'strong',
    options: [
      { label: 'Owns outcomes end-to-end', value: -2 },
      { label: 'Some ownership, some task execution', value: 0 },
      { label: 'Executes tasks assigned to it', value: 2 },
    ],
  },
  {
    id: 'GCC-02',
    track: 'gcc',
    requiresModule: 'gcc',
    text: 'How long has the centre been operating in its current form?',
    weight: 'limited',
    options: [
      { label: 'Under a year', value: 0 },
      { label: '1–3 years', value: 0 },
      { label: 'Over 3 years', value: 1 },
    ],
  },
  {
    id: 'GCC-03',
    track: 'gcc',
    requiresModule: 'gcc',
    text: 'Does the centre have the domain knowledge required to make the decisions it is currently not authorised to make?',
    weight: 'strong',
    options: [
      { label: 'Yes', value: 2 },
      { label: 'Partly', value: 1 },
      { label: 'No, genuine capability gaps remain', value: -1 },
    ],
  },
  {
    id: 'OM-04-GCC',
    track: 'gcc',
    requiresModule: 'gcc',
    text: 'When responsibility is delegated to the centre specifically, does it perform successfully?',
    weight: 'strong',
    skipIf: (ctx) => ctx.askedIds.includes('OM-04'),
    options: [
      { label: 'Yes, consistently, when given the chance', value: 2 },
      { label: 'Mixed', value: 0 },
      { label: 'Usually needs to be pulled back', value: -1 },
    ],
  },
  {
    id: 'GCC-05',
    track: 'gcc',
    requiresModule: 'gcc',
    text: "Is the centre's value case still framed mainly around cost, or does it include capability and outcome contribution?",
    weight: 'limited',
    options: [
      { label: 'Includes capability/outcome contribution', value: -1 },
      { label: 'Mainly cost', value: 1 },
    ],
  },
  {
    id: 'GCC-06',
    track: 'ai',
    requiresModule: 'gcc',
    skipIf: (ctx) => !ctx.activeModules.has('ai'),
    text: 'Are AI or automation initiatives within the centre something it decided to run, or something assigned to it?',
    weight: 'limited',
    options: [
      { label: 'The centre decided to run them', value: -1 },
      { label: 'Mostly assigned to it', value: 1 },
    ],
  },

  // AI module
  {
    id: 'AI-01',
    track: 'ai',
    requiresModule: 'ai',
    text: 'Are your pilots technically working but not used, or not yet reliable enough to use?',
    weight: 'strong',
    options: [
      { label: 'Technically working, adoption inconsistent', value: 1 },
      { label: 'Not yet reliable enough', value: 2 },
      { label: 'Working and used', value: -2 },
    ],
  },
  {
    id: 'AI-02',
    track: 'ai',
    requiresModule: 'ai',
    text: "Is there a named business owner accountable for each pilot's value, separate from the technical team?",
    weight: 'strong',
    options: [
      { label: 'Yes', value: -2 },
      { label: 'Informally', value: 1 },
      { label: 'No — the technical team owns it end to end', value: 2 },
    ],
  },
  {
    id: 'AI-03',
    track: 'ai',
    requiresModule: 'ai',
    text: "Where an AI output could be wrong, is there a defined human-review step before it's acted on?",
    weight: 'limited',
    options: [
      { label: 'Yes, defined', value: -1 },
      { label: 'Informal', value: 1 },
      { label: 'No', value: 2 },
    ],
  },
  {
    id: 'AI-04',
    track: 'ai',
    requiresModule: 'ai',
    text: "Are your use cases chosen because they're technically impressive, or because they target measurably expensive or slow work?",
    weight: 'limited',
    options: [
      { label: 'Target measurably expensive/slow work', value: -1 },
      { label: 'Mostly technically impressive', value: 1 },
    ],
  },
  {
    id: 'AI-05',
    track: 'ai',
    requiresModule: 'ai',
    text: "Is the underlying knowledge or data these pilots depend on something you'd trust an important decision on?",
    weight: 'limited',
    options: [
      { label: 'Yes', value: -1 },
      { label: 'Somewhat', value: 0 },
      { label: 'No', value: 1 },
    ],
  },
  {
    id: 'AI-06',
    track: 'ai',
    requiresModule: 'ai',
    text: 'Once a pilot proves useful, is there a defined path to production ownership, or does it stay with whoever built it?',
    weight: 'limited',
    options: [
      { label: 'Defined path', value: -1 },
      { label: 'Stays with the builder', value: 1 },
    ],
  },
]

export const allQuestions = [...orientationQuestions, ...questionBank]

/** Curated "advisory profile" headline, matched by primary + (optional) preserved-strength track. */
export const patternLibrary: {
  primary: TrackKey
  preserved?: TrackKey
  statement: string
}[] = [
  { primary: 'benefits-realisation', preserved: 'execution', statement: 'Delivering activity, unproven benefit.' },
  { primary: 'value-priorities', statement: 'Busy, but not sure it is the right busy.' },
  { primary: 'governance', preserved: 'governance', statement: 'Governed, but decision-constrained.' },
  { primary: 'ai', statement: 'AI-ready, value-unproven.' },
  { primary: 'gcc', statement: 'Mature in operation, constrained in mandate.' },
  { primary: 'commercial-alignment', statement: 'Delivery inherited a promise it could not realistically keep.' },
  { primary: 'economics', statement: 'Busy and growing, margin unclear.' },
  { primary: 'operating-model', statement: 'Delivering through people, not yet through capability.' },
  { primary: 'execution', statement: 'Momentum without control.' },
]
