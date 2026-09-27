/**
 * Evidence, reframed: recurring executive situations The Promise Office has
 * learned to recognise, not a chronological list of projects. The client
 * problem is the protagonist; experience is the evidence underneath.
 */

export type EvidenceStrip = {
  context: string
  environment: string
  intervention: string
  outcome: string
}

export type Situation = {
  slug: string
  tier: 'primary' | 'supporting'
  index: string
  title: string
  /** The recurring executive situation, framed as a pattern, not a project. */
  situation: string
  /** What often sits underneath the visible symptom. */
  underneath: string
  /** How The Promise Office examines it — includes woven-in methodology, not a skills list. */
  view: string
  evidence: EvidenceStrip
  crossLinks: string[]
  relatedSlug?: string
}

export const situations: Situation[] = [
  {
    slug: 'strategy-has-outrun-execution',
    tier: 'primary',
    index: '01',
    title: 'When strategy has outrun execution',
    situation:
      'The visible symptom is delay. Dates move, status reads amber-to-green, and leadership is told the plan is intact — until it isn’t.',
    underneath:
      'Underneath, it is rarely a single cause: unclear scope, assumptions nobody re-tested when circumstances changed, dependencies that were known but not visible to the people making decisions, sequencing built for an ideal case, and a commercial commitment made before delivery had a real say in it.',
    view:
      'Recovery starts by re-establishing what is actually true — which milestones depend on a system or approval that isn’t ready, where acceptance criteria were assumed rather than confirmed, which requests for change never had their impact properly traced through to the plan. Only once that baseline is real does a restart date mean anything. The question worth asking first is not “how do we go faster,” but whether this is a delivery problem at all, or a discovery that the original promise was never sufficiently executable.',
    evidence: {
      context: 'Billing transformation · Australian telecommunications account',
      environment: 'A real-time rating and billing migration, part of a wider enterprise transformation',
      intervention: 'Reset scope and dependencies, re-established the delivery plan, drove execution through a restart',
      outcome: 'Moved from red status to controlled delivery, with schedule deviation kept limited',
    },
    crossLinks: ['governance-without-control'],
    relatedSlug: 'red-to-ready-turnaround',
  },
  {
    slug: 'work-moves-capability-does-not',
    tier: 'primary',
    index: '02',
    title: 'When work moves but capability does not',
    situation:
      'A transition is declared complete because the work is now being done somewhere else. Whether the receiving organisation can actually own it is a separate, and often unasked, question.',
    underneath:
      'A transition plan is really a readiness argument: what has to be true — access, documentation, a tested continuity plan, a defined exit from hypercare — before a new team can be trusted with the work. Skipping that argument is why “go-live” and “actually ready” keep drifting apart. It shows up as duplication, as decisions still routed back to whoever held the knowledge before, and as a centre that executes tasks well without ever being handed the outcome.',
    view:
      'The useful distinction is between moving work and building an organisation capable of owning it. That means testing, not assuming, whether a centre or new team performs when responsibility is actually delegated — and being honest about whether the constraint is readiness (too early) or mandate (capable, but not authorised).',
    evidence: {
      context: 'Test Centre of Excellence transition · Telecom, Philippines',
      environment: '~400 FTE, a four-month transition from an incumbent provider, ~60% rebadged and ~40% newly hired staff',
      intervention:
        'Led PM and governance from the ground up — infrastructure readiness, workforce mobilisation, knowledge transfer, hypercare and go-live',
      outcome: 'Reached go-live in approximately four months, with improved test coverage and turnaround time',
    },
    crossLinks: ['data-without-visibility'],
    relatedSlug: 'the-delivery-office',
  },
  {
    slug: 'growth-outruns-capability',
    tier: 'primary',
    index: '03',
    title: 'When growth creates complexity faster than capability',
    situation:
      'Good people keep solving the same problem differently. Every proposal starts from a blank page. Pricing depends on who happened to build the model. Lessons stay inside the project that produced them.',
    underneath:
      'This is the gap between successful delivery and institutional capability. An organisation can win, staff and deliver work competently for years without ever building a repeatable operating model, methodology or commercial framework underneath it — which is fine, until growth outpaces what any group of individuals can carry.',
    view:
      'The test is simple to ask and uncomfortable to answer: if the strongest people left tomorrow, how much of the capability would remain? Building a practice — a service catalogue, an operating model, SLA/KPI governance, transition approach, pricing and resource models, reusable proposal assets — is what converts delivery competence into something the organisation can run without a specific person in the room.',
    evidence: {
      context: 'Managed Services practice build · Global technology services company, India',
      environment: 'A six-month consulting engagement, aligning ~35–40 Geo, business-unit and domain leaders',
      intervention:
        'Developed the service catalogue, operating model, SLA/KPI governance, transition approach, pricing/resource models and proposal toolkit',
      outcome: 'The framework became the standard pursuit approach; reported bid pace moved from roughly 1–2 to around 10 managed-services opportunities a year',
    },
    crossLinks: ['friction-destroys-value', 'functions-not-outcomes'],
    relatedSlug: 'managed-services-builder',
  },
  {
    slug: 'ai-demonstrates-before-trust-established',
    tier: 'primary',
    index: '04',
    title: 'When AI demonstrates capability before the business establishes trust',
    situation:
      'A pilot is impressive in the room. Six months later, it is still a pilot — technically working, inconsistently used, and nobody outside the technical team is accountable for whether it actually creates value.',
    underneath:
      'This is rarely a model-selection problem. It is a trust problem (would you act on this output without checking it?), a workflow problem (does it fit where the work actually happens?), an evidence problem (can it show its sources and its confidence?), an ownership problem (who is accountable for its value once the technical team moves on?) and an adoption problem (do the people who need to use it actually trust it enough to)?',
    view:
      'Before funding the next pilot, define the work it will change: who does it today, how often, and what mistakes matter. Then decide what the system is allowed to do — find information, draft an answer, recommend an action, or act — because each level needs different controls and a different human-review point. Test it against real questions, including the ones where the safest answer is “I don’t know.”',
    evidence: {
      context: 'AI knowledge assistant · Energy compliance, Australia',
      environment: 'A production assistant spanning approximately 80,000 plans, policies and regulatory documents',
      intervention:
        'Led end-to-end delivery — contextual search and answers with source references and confidence scoring, with UAT and validation focused explicitly on accuracy and hallucination risk',
      outcome: 'A production system assessors actually use, with accuracy and escalation treated as delivery requirements, not afterthoughts',
    },
    crossLinks: [],
    relatedSlug: 'ai-that-works',
  },
  {
    slug: 'commercial-promise-drifts-from-delivery-reality',
    tier: 'primary',
    index: '05',
    title: 'When commercial promises and delivery reality drift apart',
    situation:
      'A program is under margin and schedule pressure, and the cause turns out to sit upstream of delivery entirely — in an estimate, a staffing model or a timeline that delivery never had the chance to pressure-test before it was sold.',
    underneath:
      'A proposal, an estimate, a staffing model, a price and a statement of work are, functionally, promises. Execution eventually has to absorb whatever was committed. When the commercial and solutioning teams shape those commitments without delivery in the room, the gap between what was sold and what can actually be run doesn’t show up until someone is already accountable for closing it.',
    view:
      'The useful question is not only whether delivery is under-performing, but whether it inherited a plan it never helped shape. Reviewing solution feasibility, resourcing, pricing, margin assumptions and SLA commitments before they become contractual — and getting delivery to sign off on what it will actually be asked to run — is what keeps winning the work from creating tomorrow’s delivery problem.',
    evidence: {
      context: 'Account growth and commercial ownership · Telecom and enterprise technology',
      environment: 'Presales and delivery ownership across RFP responses in the ~US$50K–US$1M range, roughly 10–15 a year',
      intervention:
        'Solution and cost modelling, delivery reviews, staffing and pricing input ahead of commitment, ongoing account planning',
      outcome: 'One Australian telecom relationship grew from a single platform engagement to four concurrent programs on the strength of aligned commercial and delivery judgement',
    },
    crossLinks: ['data-without-visibility'],
    relatedSlug: 'commercial-command',
  },
  {
    slug: 'governance-without-control',
    tier: 'supporting',
    index: '06',
    title: 'When governance exists but control doesn’t',
    situation:
      'The steering committee meets, the reports are current, and a decision has still been stuck between two teams for three weeks because nobody owns unblocking it.',
    underneath:
      'Governance and reporting are not the same thing. A dashboard that is accurate and trusted can still sit beside an organisation where nobody is named to resolve a cross-team stalemate — which means the information exists, but nothing changes because of it.',
    view:
      'Good governance helps leadership decide, not merely report. The Promise Office view: governance has value when it changes a decision and a follow-through, not when it produces more artefacts to review.',
    evidence: {
      context: 'Project Governance Office · Telecom, Australia',
      environment: 'A ~US$40M managed-services account, ~550 FTE',
      intervention: 'Headed the PGO across managed services and commercial governance, alongside a fintech client’s delivery-maturity and governance-framework assessment',
      outcome: 'A governance model that connected performance, commercials and executive review — not just a reporting calendar',
    },
    crossLinks: ['strategy-has-outrun-execution', 'data-without-visibility'],
    relatedSlug: 'the-delivery-office',
  },
  {
    slug: 'data-without-visibility',
    tier: 'supporting',
    index: '07',
    title: 'When the organisation has data but still cannot see performance',
    situation:
      'Dashboards exist. Scorecards go out weekly. And leadership still can’t say, with confidence, whether performance is actually improving or which lever would move it.',
    underneath:
      'This is a different failure from governance-without-control. There, a decision doesn’t get made despite good information. Here, there often isn’t yet a trustworthy single view to bring to that decision in the first place — SLA, AHT, utilisation, productivity and capacity data exist, but scattered, inconsistently defined, or too delayed to act on.',
    view:
      'Measurement becomes management information only when it changes a decision. A report that nobody uses to decide anything is activity, not insight — the fix is rarely more dashboards, it is fewer, better ones tied to a specific decision.',
    evidence: {
      context: 'Performance governance · UK telecommunications account',
      environment: 'PMO and SLA function across an engagement of approximately 800 FTE',
      intervention:
        'Built the dashboards, scorecards and leadership reporting — SLA, AHT, utilisation, productivity and capacity — from scratch, tied to a weekly customer review cadence',
      outcome: 'A single, trusted performance view used in the reviews it was built for, not just produced alongside them',
    },
    crossLinks: ['governance-without-control'],
  },
  {
    slug: 'friction-destroys-value',
    tier: 'supporting',
    index: '08',
    title: 'When operational friction quietly destroys value',
    situation:
      'Queues, manual re-entry, status-chasing, repeated hand-offs — the kind of friction an organisation has simply learned to tolerate because nobody has costed what it’s actually taking.',
    underneath:
      'Individually small, these frictions compound into real cost: specialists doing administrative work, rework nobody labels as rework, and a workflow whose true shape lives in people’s heads rather than anywhere documented.',
    view:
      'Fix the workflow before automating it. Automating a step that shouldn’t exist just makes the wrong thing happen faster — the sequence is redesign the flow and its ownership, then automate around it.',
    evidence: {
      context: 'Certification workflow · Energy compliance, Australia',
      environment: 'Manual email intake and allocation across roughly 150 certification jobs a day',
      intervention: 'Redesigned the workflow and its ownership, then implemented OCR-assisted intake, automated job creation and skill-based assignment',
      outcome: 'Reported SLA compliance rose from about 65% to about 95% for the operation',
    },
    crossLinks: ['growth-outruns-capability'],
    relatedSlug: 'process-to-platform',
  },
  {
    slug: 'functions-not-outcomes',
    tier: 'supporting',
    index: '09',
    title: 'When organisations optimise functions instead of outcomes',
    situation:
      'Sales hits its numbers. Operations hits its numbers. The customer still experiences a broken journey, because each function improved its own slice while the end-to-end outcome kept slipping through the seams between them.',
    underneath:
      'A customer experiences the whole system, not the org chart behind it — sales, order management, provisioning, operations and billing can each be locally efficient while the horizontal journey they add up to gets worse.',
    view:
      'The question worth asking is whether the department improved, or the outcome did — which means redesigning the process end-to-end, across the teams and systems it actually crosses, rather than optimising one box in the chain.',
    evidence: {
      context: 'Lead-to-Cash and Trouble-to-Resolve redesign · Telecom, New Zealand',
      environment: 'Broadband and fixed-line services, across customer acquisition, order management, fulfilment, provisioning and downstream operations',
      intervention: 'Cross-functional process redesign across business, operations and technology teams',
      outcome: 'A future-state process aligned end-to-end, not function-by-function',
    },
    crossLinks: ['growth-outruns-capability'],
    relatedSlug: 'process-to-platform',
  },
]

export const primarySituations = situations.filter((s) => s.tier === 'primary')
export const supportingSituations = situations.filter((s) => s.tier === 'supporting')

export function getSituation(slug: string) {
  return situations.find((s) => s.slug === slug)
}
