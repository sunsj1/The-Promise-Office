export type Engagement = {
  slug: string
  index: string
  title: string
  /** Short promise used on cards, completed by `verb`. */
  entryProblem: string
  verb: string
  featured: boolean
  lead: string
  whenToCall: string
  whatIDo: string[]
  whatYouReceive: string
  basis: string
  area: 'delivery' | 'managed-services' | 'commercial-ai'
  /** Which of the four advisory practices this mandate belongs to. */
  practice: 'delivery-recovery' | 'managed-services' | 'ai'
}

export const engagements: Engagement[] = [
  {
    slug: 'red-to-ready-turnaround',
    index: '01',
    title: 'Red-to-Ready Turnaround',
    entryProblem:
      'A program is slipping, trust is low and leaders need a fact-based recovery path.',
    verb: 'Restore control',
    featured: true,
    area: 'delivery',
    practice: 'delivery-recovery',
    lead: 'A program is slipping. The reported status and the lived reality no longer match. The first task is to establish the truth, then earn back control.',
    whenToCall:
      'Repeated date changes, unresolved dependencies, customer escalations, unclear success criteria or a program that everyone knows is red but nobody can reset.',
    whatIDo: [
      'Review plan, scope, contracts, dependencies, risks and evidence of progress.',
      'Interview sponsors, customers, delivery teams and critical suppliers.',
      'Separate immediate stabilisation from structural recovery.',
      'Reset ownership, decision rights, critical path and escalation cadence.',
      'Lead the restart or assure the team executing it.',
    ],
    whatYouReceive:
      'A candid situation assessment, recovery options, a credible integrated plan, decision log, executive cadence and measurable exit criteria.',
    basis:
      'Led recovery of a distressed Australian billing transformation; extensive executive escalation and account governance experience.',
  },
  {
    slug: 'the-delivery-office',
    index: '02',
    title: 'The Delivery Office',
    entryProblem:
      'Build a PMO/PGO that exposes risk, connects decisions and raises delivery maturity across an account or portfolio.',
    verb: 'Build the management system',
    featured: false,
    area: 'delivery',
    practice: 'delivery-recovery',
    lead: 'Build a PMO or PGO that lets leaders see where outcomes are at risk and equips teams to act — across projects, services and commercial commitments.',
    whenToCall:
      'Portfolio reports disagree, escalation comes late, projects use different rules, resources are stretched or governance is viewed as overhead.',
    whatIDo: [
      'Assess delivery maturity, decision latency and current reporting quality.',
      'Set the charter, service catalogue, RACI and governance levels.',
      'Design assurance checkpoints, portfolio measures and risk triggers.',
      'Establish SteerCo, QBR and operational review rhythm.',
      'Coach the team and embed a usable handover.',
    ],
    whatYouReceive:
      'A working PMO/PGO operating model, templates, dashboards, decision pathways, resource view and the first cycle of leadership reviews.',
    basis:
      'Headed a PGO in a ~550-FTE managed services program; led PMO/SLA functions and fintech governance assessment.',
  },
  {
    slug: 'managed-services-builder',
    index: '03',
    title: 'Managed Services Builder',
    entryProblem:
      'Turn a service ambition into an offer that sales can position, operations can run and customers can trust.',
    verb: 'Design the business',
    featured: true,
    area: 'managed-services',
    practice: 'managed-services',
    lead: 'Turn “we should sell managed services” into a service business with a clear offer, transition path, performance promise and delivery economics.',
    whenToCall:
      'Sales has demand but operations lacks a repeatable model; SLAs are proposed before cost and capability are understood; every bid starts from scratch.',
    whatIDo: [
      'Define the service catalogue, scope boundaries and target customers.',
      'Build the operating model, roles, governance and ITIL-aligned practices.',
      'Design SLA/KPI measures, reporting and service reviews.',
      'Shape transition, stabilisation and steady-state lifecycle.',
      'Develop staffing, effort, pricing and proposal assets.',
    ],
    whatYouReceive:
      'A sellable and operable managed services blueprint, transition toolkit, commercial assumptions and reusable pursuit collateral.',
    basis:
      'Led a six-month managed services practice build later adopted for pursuits; governed large service accounts.',
  },
  {
    slug: 'process-to-platform',
    index: '04',
    title: 'Process-to-Platform',
    entryProblem:
      'Redesign fragmented work before digitising it, then govern change across people, systems and adoption.',
    verb: 'Remove the friction',
    featured: false,
    area: 'managed-services',
    practice: 'managed-services',
    lead: 'Fix the work before automating it. Connect the customer journey, operating process, system handoffs and measures into one transformation path.',
    whenToCall:
      'Manual effort keeps growing, teams blame one another for handoffs, a digital project reproduces old inefficiency or the platform is live without adoption.',
    whatIDo: [
      'Map current-state flows, ownership and customer friction.',
      'Identify rework, control gaps, automation points and data handoffs.',
      'Design future-state process, roles and service measures.',
      'Translate the change into delivery increments and acceptance criteria.',
      'Govern UAT, rollout and operational adoption.',
    ],
    whatYouReceive:
      'A process and system change roadmap, prioritised business case, future-state model, integration dependencies and adoption measures.',
    basis:
      'Telecom lead-to-cash and trouble-to-resolve redesign; energy workflow automation across ~150 jobs per day.',
  },
  {
    slug: 'commercial-command',
    index: '05',
    title: 'Commercial Command',
    entryProblem:
      'Connect effort, staffing, scope, SLAs, pricing and P&L so account growth does not outrun delivery economics.',
    verb: 'Find the margin truth',
    featured: false,
    area: 'commercial-ai',
    practice: 'managed-services',
    lead: 'Bring delivery and P&L into the same conversation. Make the cost to serve, staffing model, service promise and account opportunity visible together.',
    whenToCall:
      'Revenue is growing but margin is unclear, utilization looks healthy while delivery struggles, scope changes go unpriced or a bid cannot be delivered at its proposed cost.',
    whatIDo: [
      'Review budget, actuals, forecast, effort and resource assumptions.',
      'Examine scope, SLA obligations and commercial leakage points.',
      'Model pricing and staffing options for pursuits or renewals.',
      'Connect account health, delivery risk and growth pipeline.',
      'Build a review cadence with decision owners.',
    ],
    whatYouReceive:
      'A transparent commercial baseline, decision options, risk register, account action plan and repeatable financial review rhythm.',
    basis:
      'Portfolio P&L and account ownership, RFP solution shaping, pricing and managed services resource models.',
  },
  {
    slug: 'ai-that-works',
    index: '06',
    title: 'AI That Works',
    entryProblem:
      'Choose valuable use cases, deliver with controls and train teams around their actual work.',
    verb: 'Move from pilot to practice',
    featured: true,
    area: 'commercial-ai',
    practice: 'ai',
    lead: 'Choose the right work for AI, deliver the pilot with real controls, then teach the teams who must use and judge its outputs.',
    whenToCall:
      'Ideas are plentiful but value is vague; a demo is impressive but untested; teams need practical AI fluency; leaders need an accountable pilot.',
    whatIDo: [
      'Discover and prioritise use cases by effort, value and risk.',
      'Map source data, workflow, human review and success measures.',
      'Lead delivery across product, technology, business and UAT.',
      'Test source grounding, confidence and failure scenarios.',
      'Run role-based workshops using the team’s own work examples.',
    ],
    whatYouReceive:
      'A prioritised use-case portfolio, pilot charter, validation and adoption plan, or a tailored AI learning experience.',
    basis:
      'Led a production knowledge assistant across a large document corpus and practical AI/automation delivery. Training is offered as a tailored new service.',
  },
]

export function getEngagement(slug: string) {
  return engagements.find((item) => item.slug === slug)
}

export type PracticeKey = 'delivery-recovery' | 'gcc' | 'managed-services' | 'ai'

/**
 * The four practices clients engage The Promise Office to solve. Nav only shows three
 * top-level links (Advisory, GCC, AI) because delivery-recovery and managed-services both
 * live under /advisory as anchors; GCC has no signature engagement of its own — see /gcc.
 */
export const practices: {
  key: PracticeKey
  index: string
  title: string
  outcome: string
  phrases: string[]
  to: string
  cta: string
}[] = [
  {
    key: 'delivery-recovery',
    index: '01',
    title: 'Delivery, Recovery & Assurance',
    outcome: 'Get critical programs under control and keep leadership decisions connected to delivery reality.',
    phrases: ['Program recovery', 'PMO / PGO', 'Delivery assurance', 'Executive governance'],
    to: '/advisory#delivery',
    cta: 'See delivery & recovery mandates',
  },
  {
    key: 'gcc',
    index: '02',
    title: 'GCC & Capability Centre Advisory',
    outcome: 'Build capability around outcomes, not tasks.',
    phrases: ['Operating model & mandate', 'Governance & decision rights', 'Vendor-to-GCC transition', 'AI-enabled GCC'],
    to: '/gcc',
    cta: 'See the GCC page',
  },
  {
    key: 'managed-services',
    index: '03',
    title: 'Managed Services, ITSM & Capability Building',
    outcome: 'Build services that can be sold, transitioned, governed and scaled.',
    phrases: ['Service catalogue & pricing', 'ITSM / ITIL practices', 'SLA/KPI design', 'Process-to-platform'],
    to: '/advisory#managed-services',
    cta: 'See managed services mandates',
  },
  {
    key: 'ai',
    index: '04',
    title: 'AI & Intelligent Operations',
    outcome: 'Move AI from experimentation into governed, measurable operations.',
    phrases: ['Use-case discovery', 'Pilot-to-production', 'AI operating model & governance', 'Workforce enablement'],
    to: '/ai',
    cta: 'See the AI page',
  },
]

export type CapabilityKey =
  | 'process-operating-model'
  | 'practice-capability-building'
  | 'itsm-service-management'
  | 'pursuit-deal-assurance'
  | 'commercial-value-assurance'
  | 'governance-delivery-leadership'

/**
 * The six capabilities that cut across all four practices. Each traces back
 * to a signature engagement, an evidence case, or an adjacent-mandate entry
 * that already exists elsewhere on the site — no new claims are made here.
 */
export const capabilities: {
  key: CapabilityKey
  index: string
  title: string
  philosophy: string
  problem: string
  whatWeDo: string[]
  whatYouReceive: string
  experience: string
  relatedSlug?: string
}[] = [
  {
    key: 'process-operating-model',
    index: '01',
    title: 'Process & Operating Model Transformation',
    philosophy: 'Fix the workflow before automating it.',
    problem:
      'Manual effort keeps growing, teams blame one another for handoffs, or a digital project reproduces the same friction it was meant to remove.',
    whatWeDo: [
      'Map current-state flows, ownership and customer friction.',
      'Identify rework, control gaps, automation points and data handoffs.',
      'Design the future-state process, roles and service measures.',
      'Translate the change into delivery increments, acceptance criteria and adoption measures.',
    ],
    whatYouReceive:
      'A process and system change roadmap, a prioritised business case, the future-state model and adoption measures — not a diagram nobody uses.',
    experience:
      'Telecom lead-to-cash and trouble-to-resolve redesign in New Zealand; energy compliance workflow automation across roughly 150 certification jobs a day, with reported SLA compliance rising from about 65% to about 95%.',
    relatedSlug: 'process-to-platform',
  },
  {
    key: 'practice-capability-building',
    index: '02',
    title: 'Practice & Capability Building',
    philosophy: 'Turn know-how into a capability the organisation can repeat.',
    problem:
      'Individual expertise does not scale. Without a defined offer, operating model, methodology and reusable assets, growth depends on specific people rather than a system the organisation can run.',
    whatWeDo: [
      'Define the service catalogue, scope boundaries and target customers.',
      'Build the operating model, roles, governance and methodology.',
      'Develop estimation, pricing, staffing models and reusable proposal collateral.',
      'Create templates, playbooks, quality gates and a training path so the capability outlives the mandate.',
    ],
    whatYouReceive:
      'An operating model, methodology and commercial framework the organisation can run on its own once the mandate ends — the objective is not dependence on the advisor, but a capability left behind. This applies equally to a managed-services practice, an ITSM function, a GCC, a Delivery Office/PMO or an AI capability.',
    experience:
      'Led a six-month managed services practice build later adopted as the standard pursuit approach — reported bid pace moved from roughly 1–2 to around 10 managed-services opportunities a year.',
    relatedSlug: 'managed-services-builder',
  },
  {
    key: 'itsm-service-management',
    index: '03',
    title: 'ITSM & Service Management Transformation',
    philosophy: 'Make service management improve the service — not merely administer the process.',
    problem:
      'SLA reports read green while the customer’s experience disagrees. Incident, problem and change practices exist on paper but do not change what customers feel.',
    whatWeDo: [
      'Examine incident, problem, change and request practices against real outcomes, not ITIL theory.',
      'Redesign SLA/OLA measures, escalation models and the service-review cadence.',
      'Align continual improvement and service ownership to where performance and experience diverge.',
      'Design ServiceNow-aligned process where a platform is already in place.',
    ],
    whatYouReceive:
      'Service practices, SLA/KPI design and a review cadence tied to what customers actually feel, not just what the dashboard reports.',
    experience:
      'ITSM, ITIL, SLA/SLM and major service governance across large managed-services accounts; the energy-compliance workflow redesign lifted reported SLA compliance from about 65% to about 95%.',
    relatedSlug: 'managed-services-builder',
  },
  {
    key: 'pursuit-deal-assurance',
    index: '04',
    title: 'Pursuit, RFP & Deal Assurance',
    philosophy: 'Win the work without creating tomorrow’s delivery problem.',
    problem:
      'A bid can be won on a solution that sales, solutioning and delivery never actually agreed on — leaving margin, staffing and SLA commitments unresolved until they become someone else’s emergency.',
    whatWeDo: [
      'Pressure-test bid strategy, requirement interpretation and solution feasibility.',
      'Review estimation, resource model, staffing mix and delivery model against the proposed timeline.',
      'Examine pricing, margin, SLA feasibility, risks and assumptions before they become contractual.',
      'Review transition feasibility, SOW conditions and give an executive delivery sign-off.',
    ],
    whatYouReceive:
      'A pressure-tested commitment — solution, staffing, pricing and delivery plan that sales, solutioning, commercials and delivery can all stand behind before the signature.',
    experience:
      'RFP support, solution and cost modelling, staffing and pricing across telecom and enterprise accounts; one Australian telecom engagement grew from one platform to four concurrent programs on the back of this discipline.',
    relatedSlug: 'commercial-command',
  },
  {
    key: 'commercial-value-assurance',
    index: '05',
    title: 'Commercial & Value Assurance',
    philosophy: 'Make the commercial model and the delivery model tell the same story.',
    problem:
      'Revenue is growing but margin is unclear, utilisation looks healthy while delivery struggles, or scope changes go unpriced until they surface at quarter-end.',
    whatWeDo: [
      'Review budget, actuals, forecast, effort and resource assumptions.',
      'Examine scope, SLA obligations and commercial leakage points.',
      'Model pricing and staffing options for pursuits or renewals.',
      'Build a review cadence with named decision owners.',
    ],
    whatYouReceive:
      'A transparent commercial baseline, decision options, a risk register and a repeatable financial review rhythm.',
    experience: 'Portfolio P&L and account ownership, RFP solution shaping, pricing and managed-services resource models.',
    relatedSlug: 'commercial-command',
  },
  {
    key: 'governance-delivery-leadership',
    index: '06',
    title: 'Governance & Delivery Leadership',
    philosophy: 'Governance should help leaders decide, not merely report.',
    problem:
      'Portfolio reports disagree, escalation arrives late, projects run by different rules, or governance is experienced as overhead rather than a way to act sooner.',
    whatWeDo: [
      'Assess delivery maturity, decision latency and current reporting quality.',
      'Set the charter, service catalogue, RACI and governance levels.',
      'Design assurance checkpoints, portfolio measures and risk triggers.',
      'Establish SteerCo, QBR and operational review rhythm, then coach the team to run it.',
    ],
    whatYouReceive:
      'A working PMO/PGO operating model — templates, dashboards, decision pathways and the first cycle of leadership reviews.',
    experience: 'Headed a PGO in a ~550-FTE managed services program; led PMO/SLA functions and fintech governance assessment.',
    relatedSlug: 'the-delivery-office',
  },
]

export const engagementAreas = [
  {
    index: '01',
    label: 'Delivery & recovery',
    question: 'Is the plan still credible?',
    copy: 'Start with the Delivery Diagnostic, then decide whether recovery leadership or a stronger delivery office is needed.',
    cta: 'Start here',
    area: 'delivery' as const,
  },
  {
    index: '02',
    label: 'Managed Services & ITSM',
    question: 'Can the service promise be run?',
    copy: 'Examine the offer, transition, operating model, SLA, cost to serve and governance before scaling it.',
    cta: 'Explore this area',
    area: 'managed-services' as const,
  },
  {
    index: '03',
    label: 'Commercial & AI',
    question: 'Will the investment create value?',
    copy: 'Connect bids, account economics and AI use cases to the teams, controls and measures that make them real.',
    cta: 'Explore this area',
    area: 'commercial-ai' as const,
  },
]

/**
 * The paid, fixed-scope engagement — distinct from the free online Health Check
 * self-assessment tool at /health-check (src/features/healthCheck).
 */
export const deliveryDiagnostic = {
  title: 'The Delivery Diagnostic',
  lead: 'A fixed-scope, two-week independent review of one program, account or delivery unit. You get a clear reading of where it stands, what puts it at risk, and which decisions will restore control.',
  facts: [
    { label: 'Length', value: 'Two weeks, remote or on site as agreed' },
    {
      label: 'Your time',
      value:
        'A kickoff, approximately 6–10 stakeholder conversations where available, and one executive readout',
    },
    { label: 'Fee', value: 'Fixed fee quoted after the scoping call' },
    { label: 'Turnaround', value: 'Recovery options presented with trade-offs' },
  ],
  receive: [
    'A RAG view of scope, schedule, commercials, people and service',
    'A risk and dependency map with named owners',
    'Recovery options and their trade-offs',
    'A 30-60-90 day action plan and executive readout',
  ],
} as const

export const aiFormats = [
  {
    title: 'Corporate AI Enablement Workshops',
    copy: 'Half-day or full-day sessions built around the tools and workflows your people actually use. Practical prompts, judgment checks and department-specific exercises.',
    tags: ['In person', 'Remote', 'Tailored'],
  },
  {
    title: 'Team Workflow Optimisation Sprint',
    copy: 'Focus on one team’s work: baseline effort and rework, find useful AI entry points, map human review, and define a measurable pilot.',
    tags: ['One team', 'Workflow', 'Pilot'],
  },
  {
    title: 'Role-based AI Implementation Sessions',
    copy: 'Separate learning paths for delivery leaders, PMO, HR, finance and operations, each tied to decisions and tasks in their daily work.',
    tags: ['Role specific', 'Practical', 'Measured'],
  },
] as const

export const adjacentMandates = [
  {
    kicker: 'Bid to Run',
    title: 'Deal Delivery Assurance',
    copy: 'Review a proposed solution before commitment: scope, assumptions, staffing, transition, SLA feasibility, risk and delivery economics.',
    basis: 'Built on RFP leadership, pricing, P&L and end-to-end delivery.',
  },
  {
    kicker: 'Interim leadership',
    title: 'Fractional Head of Delivery',
    copy: 'Provide an executive delivery rhythm, account review, escalation ownership and coaching during a growth or leadership transition.',
    basis: 'Built on customer delivery, portfolio and people leadership.',
  },
  {
    kicker: 'Service reliability',
    title: 'ITSM Reset',
    copy: 'Examine incident, problem, change, SLA and service-review practices; redesign the points where operational performance and customer experience diverge.',
    basis: 'Built on ITSM, ITIL, SLA/SLM and major service governance.',
  },
  {
    kicker: 'Capability centre',
    title: 'GCC Delivery Launch',
    copy: 'Set up the delivery governance, transition readiness, operating measures and cross-location handoffs for a new or expanding India capability centre.',
    basis: 'Built on large transitions, PMO/PGO setup and global client delivery; scope is tailored.',
  },
  {
    kicker: 'Transition',
    title: 'Vendor & CoE Transition Office',
    copy: 'Coordinate people, knowledge, tooling, infrastructure and service acceptance when delivery moves between providers or a new centre is formed.',
    basis: 'Built on a ~400-FTE Test CoE transition and service mobilisation work.',
  },
  {
    kicker: 'Field operations',
    title: 'Field Service Digitisation',
    copy: 'Redesign scheduling, assignment, inspection, mobility and performance visibility for teams working across distributed physical assets.',
    basis: 'Built on telecom generator and tower operations plus energy assessment platforms.',
  },
  {
    kicker: 'Executive decisions',
    title: 'Transformation Assurance',
    copy: 'Give sponsors an independent view of whether a major transformation has credible scope, readiness, dependencies and measurable benefits.',
    basis: 'Built on program recovery, delivery assurance and executive governance.',
  },
  {
    kicker: 'Learning',
    title: 'Delivery & AI Academy',
    copy: 'Practical workshops for PMs, delivery leaders and business teams on escalation judgment, governance, ITSM and responsible everyday AI use.',
    basis: 'Built on people leadership, mentoring and AI program experience; curriculum tailored to the audience.',
  },
  {
    kicker: 'Account growth',
    title: 'Customer Value Office',
    copy: 'Link QBRs, service performance, roadmap, commercial commitments and new opportunities into one account leadership cadence.',
    basis: 'Built on strategic customer ownership, account growth and commercial governance.',
  },
] as const

export const faqs = [
  {
    q: 'How long does an engagement take?',
    a: 'The Delivery Diagnostic is designed around two weeks when documents and stakeholders are available. A practice build, transition or interim leadership mandate is scoped against the work and decision cycle.',
  },
  {
    q: 'Remote or on-site?',
    a: 'Both. I am based in Pune and have worked with distributed teams and customers across markets. Workshops, critical reviews and transitions may benefit from time on site; we agree the model and travel in the scope.',
  },
  {
    q: 'How is confidential information handled?',
    a: 'We agree confidentiality, access, data handling, deliverables and ownership in writing before sensitive material is shared. A first call can stay at the problem and context level.',
  },
  {
    q: 'Will you work with our own team?',
    a: 'Yes. The work is designed around the sponsor, delivery and operational owners who will carry it forward. Decision rights, specialist contributions and handover are explicit in the engagement.',
  },
  {
    q: 'How are fees set?',
    a: 'A fixed diagnostic can be quoted after a short scoping conversation. Longer mandates depend on duration, travel, access, deliverables and whether hands-on leadership is required. A written proposal sets out the fee and terms.',
  },
  {
    q: 'What happens in the first call?',
    a: 'In about 30 minutes, we discuss the decision you face, timing, the people involved and what evidence exists. I will say whether I can help and what a useful first step would look like.',
  },
] as const
