export const testimonials = [
  {
    text: 'Hrishikesh demonstrates strong leadership and excellent stakeholder management skills while consistently delivering quality outcomes.',
    name: 'Abhay Bakshi',
    relation: 'Worked on the same team',
    year: '2026',
  },
  {
    text: 'As a PGO Lead, he was really good at making sure that things do not fall through the cracks.',
    name: 'Harish Sriramagiri',
    relation: 'Managed Rishi directly',
    year: '2020',
  },
  {
    text: 'His focus is not only to solve the problem at hand, but also to design and implement right processes to fix it permanently.',
    name: 'Ankur Jain',
    relation: 'Managed Rishi directly',
    year: '2020',
  },
] as const

export const career = [
  {
    period: '2021 — present',
    company: 'Cleverex Technology',
    role: 'Customer Delivery & Engagement',
    copy: 'End-to-end programs, account ownership, solution shaping and commercial management across energy, enterprise platforms, AI and workflow automation.',
  },
  {
    period: '2011 — 2021',
    company: 'Tech Mahindra',
    role: 'Program & Delivery Leadership',
    copy: 'Service management, process consulting, transitions, PMO/PGO, large account governance and program recovery across Australia, New Zealand and the Philippines.',
  },
  {
    period: '2005 — 2011',
    company: 'Infosys',
    role: 'Team Lead',
    copy: 'PMO and SLA reporting, performance management, process improvement and transition support in the BT account.',
  },
] as const

export const principles = [
  {
    index: '01',
    title: 'Candour',
    heading: 'A clear view of the situation',
    copy: 'I separate reported status from observable evidence and surface uncomfortable dependencies early enough to act.',
  },
  {
    index: '02',
    title: 'Partnership',
    heading: 'Work with the people doing it',
    copy: 'Good plans require business, technology, operations, suppliers and customer leaders to understand their part in the outcome.',
  },
  {
    index: '03',
    title: 'Ownership',
    heading: 'Stay close to execution',
    copy: 'Governance has value when it changes decisions and follow-through, not when it simply generates more reporting.',
  },
  {
    index: '04',
    title: 'Commercial sense',
    heading: 'See the whole account',
    copy: 'Scope, staffing, service levels, revenue and margin must be considered alongside schedule and quality.',
  },
  {
    index: '05',
    title: 'Pragmatism',
    heading: 'Fit the intervention to the need',
    copy: 'A two-week diagnostic, a capability build and interim program leadership need different depth and cadence.',
  },
  {
    index: '06',
    title: 'Transfer',
    heading: 'Leave capability behind',
    copy: 'The team should retain the roles, measures, templates and decision rhythm after an advisory mandate ends.',
  },
] as const

export const credentials = {
  education: [
    'General Management Program (Executive), IIM Bangalore',
    'Bachelor’s degree, Shivaji University',
    'ITIL V3 Foundation',
    'eTOM',
    'Six Sigma Yellow Belt',
    'Certified Scrum Product Owner (CSPO)',
    'UiPath (RPA)',
  ],
  domains: [
    'Telecom OSS/BSS, fulfilment, assurance and billing',
    'Energy, sustainability and field service operations',
    'Enterprise platforms and system integration',
    'ITSM, managed services and service governance',
    'AI/GenAI knowledge assistants, workflow automation and RPA',
    'Agile, Waterfall and hybrid delivery environments',
  ],
} as const

export const perspectiveHighlights = [
  { value: '21+ years', label: 'Delivery and consulting experience' },
  { value: 'Bid to run', label: 'Commercial shaping through steady-state service' },
  { value: 'Recovery & scale', label: 'Distressed programs, transitions and governance' },
  { value: 'Global', label: 'India, Australia, NZ, Philippines and UK' },
] as const

export const insights = [
  {
    slug: 'green-status-worried-customer',
    index: '01',
    category: 'Delivery leadership',
    title: 'When the status is green and the customer is worried.',
    standfirst: 'A green report can be true about activity and wrong about the outcome.',
    body: [
      'In a troubled program, I start by asking for evidence of the next few decisions: which milestone depends on an unready system, where the acceptance criteria are ambiguous, who can resolve a cross-team blocker, and whether the schedule has room for what testing is finding. The plan is only credible if those answers connect.',
      'Three views are useful. First, the critical path as the delivery teams actually see it. Second, the customer’s experience of progress, including promises made outside the formal plan. Third, the commercial position: scope changes, staffing and the cost of delay. When these views disagree, a better dashboard alone will not restore trust.',
      'A recovery starts with a short, candid diagnosis. Make the unresolved decisions visible, name owners, set a near-term control rhythm and distinguish a new forecast from an aspiration. Sponsors can then decide what to protect, change or stop. That is how a red program earns a believable route back to control.',
    ],
    cta: { label: 'See the Delivery Health Check', to: '/health-check' },
  },
  {
    slug: 'define-the-work-before-the-pilot',
    index: '02',
    category: 'AI delivery',
    title: 'Before funding the AI pilot, define the work it will change.',
    standfirst: 'A compelling demo is a starting point. It does not tell you whether the operation is ready to rely on it.',
    body: [
      'Begin with the task. Who does it today, how often, where do they spend time, and what mistakes matter? Then decide what the AI is allowed to do: find information, draft an answer, recommend an action, or perform a step. Each level needs different controls and human review.',
      'For a knowledge assistant, test against real questions from the users. Include outdated documents, conflicting policies, missing information and cases where the safest answer is “I don’t know.” Ask for source references, a clear escalation path and measures of answer quality as well as time saved. A pilot should expose failure modes before rollout.',
      'Finally, make adoption part of delivery. The team needs to know when to trust, check or reject an output. The sponsor needs a business measure and an owner for the service after launch. Without those, the pilot may be successful as a demonstration and unsuccessful as a way of working.',
    ],
    cta: { label: 'Explore AI delivery', to: '/engagements/ai-that-works' },
  },
] as const

export const guide = {
  kicker: 'A Rishi guide',
  title: 'AI Without the Jargon',
  copy: 'A plain-language guide for people starting their careers and professionals who want to understand AI, LLMs and agents without needing to write code. It builds the judgment to ask better questions of AI tools and their outputs.',
  strap: 'Understand the ideas. Make better decisions.',
} as const
