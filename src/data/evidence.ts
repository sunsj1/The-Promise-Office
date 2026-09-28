export type CaseTag = 'delivery' | 'gcc' | 'managed-services' | 'process' | 'ai' | 'commercial'

export type CaseStudy = {
  slug: string
  index: string
  discipline: string
  context: string
  metric?: string
  title: string
  lead: string
  facts: { label: string; value: string }[]
  /** Translates the historical engagement into current advisory capability. Kept out of the compact card, shown on expand. */
  whatThisProves: string
  /** A case can carry more than one tag; filters match on inclusion. */
  tags: CaseTag[]
}

export const caseStudies: CaseStudy[] = [
  {
    slug: 'broadband-journey',
    index: '01',
    discipline: 'Process consulting',
    context: 'Telecom · New Zealand',
    title: 'Redesigning the customer journey behind broadband delivery.',
    lead: 'Lead-to-cash and trouble-to-resolve crossed customer acquisition, order management, fulfilment, provisioning and downstream operations. The challenge was not a single system; it was the sequence of work across business, operations and technology.',
    facts: [
      { label: 'Role', value: 'Led consulting and cross-functional process redesign.' },
      {
        label: 'Work',
        value:
          'Mapped the end-to-end flow, surfaced gaps and handoff dependencies, and aligned teams on the future operating process.',
      },
      {
        label: 'Relevance',
        value:
          'Useful where customers experience delays that individual functions cannot solve on their own.',
      },
    ],
    whatThisProves:
      'The ability to redesign a customer-facing process end-to-end, across business, operations and technology — not just within one function.',
    tags: ['process'],
  },
  {
    slug: 'billing-recovery',
    index: '02',
    discipline: 'Program recovery',
    context: 'Billing transformation · Australia',
    metric: '~US$20M program',
    title: 'Turning a red program into controlled delivery.',
    lead: 'A real-time rating and billing migration had reached a distressed state. Progress depended on a credible scope, explicit dependencies and a delivery plan that teams and leaders could use to make decisions.',
    facts: [
      {
        label: 'Role',
        value:
          'Led the recovery and restart of a transformation valued at approximately US$20 million.',
      },
      {
        label: 'Work',
        value: 'Reset scope and dependencies, re-established the plan and drove execution through the restart.',
      },
      {
        label: 'Outcome',
        value:
          'Moved the program from a red state to controlled delivery, with schedule deviation kept limited. A precise variance was not recorded for publication.',
      },
    ],
    whatThisProves:
      'An ability to convert a distressed, high-value program back to controlled delivery on the strength of fact, not reassurance — the basis for the Red-to-Ready Turnaround mandate.',
    tags: ['delivery'],
  },
  {
    slug: 'managed-services-practice',
    index: '03',
    discipline: 'Practice build',
    context: 'Technology services · India',
    metric: '~6-month build',
    title: 'Building managed services as an actual operating capability.',
    lead: 'A service firm needed more than a proposal label. The engagement brought Geo, business-unit and domain leaders together to define what the offer was, how it would be transitioned, how performance would be governed and how it would be priced and resourced.',
    facts: [
      { label: 'Role', value: 'Led the six-month consulting engagement.' },
      {
        label: 'Work',
        value:
          'Developed the service catalogue, operating model, SLA/KPI governance, transition approach, pricing and resource models, and proposal toolkit.',
      },
      {
        label: 'Outcome',
        value:
          'The framework became a standard pursuit approach; the reported bid pace moved from roughly 1–2 to around 10 managed services opportunities a year.',
      },
    ],
    whatThisProves:
      'That practice-building work sticks: the framework was still the standard pursuit approach after the engagement ended, not a one-off deliverable — the basis for the Practice & Capability Building capability.',
    tags: ['managed-services'],
  },
  {
    slug: 'pgo-transition',
    index: '04',
    discipline: 'PGO and transition',
    context: 'Telecom · Australia and Philippines',
    metric: '~550 FTE governed',
    title: 'Governance for large operations and high-stakes transitions.',
    lead: 'For an Australian managed services engagement of around 550 FTE, I led the Project Governance Office across managed services and projects, connecting performance, commercials, executive reviews and transformation work. In the Philippines, I led PM and governance for a roughly 400-FTE Test CoE transition from an incumbent provider.',
    facts: [
      {
        label: 'Scope',
        value:
          'Account governance, service reviews, infrastructure readiness, staffing mobilisation and go-live coordination.',
      },
      {
        label: 'Outcome',
        value:
          'The Test CoE reached go-live in approximately four months; the governance team covered a complex mix of rebadged and newly hired staff.',
      },
      {
        label: 'Relevance',
        value:
          'Large transitions succeed when people, operating processes, infrastructure and customer governance become ready together.',
      },
    ],
    whatThisProves:
      'Governance and transition discipline at capability-centre scale — directly relevant experience behind the GCC & Capability Centre Advisory proposition, though this was delivered as managed-services governance and a CoE transition, not a formal GCC consulting engagement.',
    tags: ['managed-services', 'gcc'],
  },
  {
    slug: 'knowledge-assistant',
    index: '05',
    discipline: 'AI delivery',
    context: 'Energy compliance · Australia',
    metric: '~80,000 source files',
    title: 'From document overload to a usable knowledge assistant.',
    lead: 'Assessors needed reliable access to information across a large body of plans, policies and regulatory documents. I led delivery of a production GenAI knowledge assistant designed for contextual questions with source references and confidence scoring.',
    facts: [
      {
        label: 'Scale',
        value: 'Approximately 80,000 source files in the broader knowledge corpus.',
      },
      {
        label: 'Role',
        value: 'End-to-end delivery leadership, including stakeholder alignment, UAT and validation.',
      },
      {
        label: 'Control',
        value: 'Accuracy and hallucination risk were explicit considerations in testing and acceptance.',
      },
    ],
    whatThisProves:
      'AI delivery leadership that treats accuracy, grounding and adoption as delivery requirements, not afterthoughts — the basis for AI That Works and the AI page.',
    tags: ['ai'],
  },
  {
    slug: 'certification-automation',
    index: '06',
    discipline: 'Process automation',
    context: 'Energy compliance · Australia',
    metric: '~65% to ~95% SLA',
    title: 'Reworking a high-volume certification operation.',
    lead: 'Manual email intake and allocation made work difficult to track and scale. The new flow used OCR-assisted document processing, automated job creation, skill-based assignment and customer communications.',
    facts: [
      { label: 'Scale', value: 'Approximately 150 certification jobs per day.' },
      {
        label: 'Outcome',
        value: 'Reported SLA compliance rose from about 65% to about 95% for the operation.',
      },
      {
        label: 'Relevance',
        value:
          'The gain came from redesigning the workflow and its ownership, then implementing automation around it.',
      },
    ],
    whatThisProves:
      'That the SLA gain followed the redesign of ownership and flow, not automation alone — the argument behind "fix the workflow before automating it."',
    tags: ['process'],
  },
  {
    slug: 'account-leadership',
    index: '07',
    discipline: 'Commercial and account leadership',
    context: 'Telecom and enterprise technology',
    metric: '1 → 4 programs',
    title: 'Connecting account growth to dependable execution.',
    lead: 'Commercial work has been part of my delivery responsibility: pursuit workshops, solution shaping, estimation, staffing, pricing, P&L review, executive customer relationships and growth. On an Australian telecom account, the engagement grew from one platform to four concurrent programs.',
    facts: [
      { label: 'Role', value: 'Account delivery and commercial ownership in prior roles.' },
      {
        label: 'Work',
        value:
          'RFP support, solution and cost modelling, delivery reviews, customer escalation and account planning.',
      },
      {
        label: 'Principle',
        value:
          'Growth is durable when the service promise, staffing model and delivery controls agree.',
      },
    ],
    whatThisProves:
      'That an account can grow without the service promise, staffing model and delivery controls drifting apart — the basis for Pursuit, RFP & Deal Assurance.',
    tags: ['commercial'],
  },
  {
    slug: 'generator-portal',
    index: '08',
    discipline: 'Field operations',
    context: 'Telecom · Australia',
    metric: '~3,000 generators',
    title: 'Making a distributed asset operation visible.',
    lead: 'Generator tracking across a national telecommunications estate relied on spreadsheets. I led delivery of a portal to improve visibility, utilisation and operational decisions across an estate of roughly 50,000 tower sites and 3,000 generators.',
    facts: [
      { label: 'Role', value: 'End-to-end project leadership for the generator management portal.' },
      {
        label: 'Scale',
        value:
          'Approximately US$800,000 project; three follow-on projects worth around US$500,000 combined.',
      },
      {
        label: 'Outcome',
        value:
          'The program reported roughly 30–35% cost optimisation in the targeted operation. This is a historical engagement figure, not a forecast for another client.',
      },
    ],
    whatThisProves:
      'End-to-end delivery ownership of a field-operations platform, from business case through to a measurable operational outcome.',
    tags: ['process'],
  },
]

export const evidenceFilters = [
  { id: 'all', label: 'All work' },
  { id: 'delivery', label: 'Delivery & Recovery' },
  { id: 'gcc', label: 'GCC & Capability' },
  { id: 'managed-services', label: 'Managed Services & ITSM' },
  { id: 'process', label: 'Process & Transformation' },
  { id: 'commercial', label: 'Commercial & Pursuits' },
  { id: 'ai', label: 'AI & Automation' },
] as const

export const proofPoints = [
  {
    discipline: 'Program recovery',
    metric: 'Red to controlled',
    copy: 'Reset scope, dependencies and execution for a distressed billing transformation in Australia.',
  },
  {
    discipline: 'Operational transformation',
    metric: '~65% to ~95%',
    copy: 'Reported SLA compliance after redesign and automation of a high-volume energy compliance workflow.',
  },
  {
    discipline: 'Practice creation',
    metric: 'Standardised',
    copy: 'Managed services framework adopted for pursuits and proposals after a six-month capability build.',
  },
] as const

export const careerStats = [
  { metric: '21+ years', label: 'In technology delivery and transformation' },
  { metric: '~US$40M', label: 'Account under delivery and commercial oversight' },
  { metric: '~550 FTE', label: 'Managed services programme governed' },
  { metric: '~US$20M', label: 'Troubled transformation steered back to controlled delivery' },
  { metric: '~350 → ~75', label: 'Systems rationalised into a smaller application estate' },
  { metric: '7 → 3', label: 'Data centres consolidated in a major transformation' },
  { metric: '~80,000', label: 'Documents in an AI knowledge assistant delivered' },
  { metric: '~150/day', label: 'Jobs handled by an automated intake workflow' },
] as const
