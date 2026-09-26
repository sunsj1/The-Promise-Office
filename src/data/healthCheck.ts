export type Category =
  | 'Schedule & delivery control'
  | 'Governance & reporting'
  | 'Managed services & SLAs'
  | 'Commercial & margin'
  | 'AI & automation'

export type Question = {
  category: Category
  text: string
  answers: { label: string; weight: 0 | 1 | 2 }[]
}

export const questions: Question[] = [
  {
    category: 'Schedule & delivery control',
    text: 'How often do delivery dates move without a documented reason?',
    answers: [
      { label: 'Rarely — and when they do, the reason is clear', weight: 0 },
      { label: 'Sometimes, and the reason is usually vague', weight: 1 },
      { label: 'Frequently, and nobody quite agrees why', weight: 2 },
    ],
  },
  {
    category: 'Schedule & delivery control',
    text: 'When did a customer’s PM last escalate above your delivery lead?',
    answers: [
      { label: 'Hasn’t happened — we handle it at our level', weight: 0 },
      { label: 'Once or twice, resolved quickly', weight: 1 },
      { label: 'It’s becoming routine', weight: 2 },
    ],
  },
  {
    category: 'Governance & reporting',
    text: 'Can your leadership see one true status for every active program right now?',
    answers: [
      { label: 'Yes — one dashboard, and people trust it', weight: 0 },
      { label: 'Several reports that mostly agree', weight: 1 },
      { label: 'Reports disagree depending who you ask', weight: 2 },
    ],
  },
  {
    category: 'Governance & reporting',
    text: 'When a decision is stuck between two teams, who owns getting it unstuck?',
    answers: [
      { label: 'There’s always a named owner', weight: 0 },
      { label: 'Usually, after some chasing', weight: 1 },
      { label: 'Often nobody does', weight: 2 },
    ],
  },
  {
    category: 'Managed services & SLAs',
    text: 'Do your SLA numbers match what the customer actually feels?',
    answers: [
      { label: 'Yes, SLA and experience agree', weight: 0 },
      { label: 'Mostly, with some gaps', weight: 1 },
      { label: 'SLA reads green, the customer isn’t happy', weight: 2 },
    ],
  },
  {
    category: 'Managed services & SLAs',
    text: 'Does a new managed-services bid start from a repeatable model, or from a blank page?',
    answers: [
      { label: 'A repeatable model and pricing', weight: 0 },
      { label: 'Some reuse, a lot of rework', weight: 1 },
      { label: 'From scratch, most times', weight: 2 },
    ],
  },
  {
    category: 'Commercial & margin',
    text: 'Do you know this month’s margin on each active account?',
    answers: [
      { label: 'Yes — reviewed monthly, by account', weight: 0 },
      { label: 'Roughly, not in detail', weight: 1 },
      { label: 'Not really — surprises turn up at quarter-end', weight: 2 },
    ],
  },
  {
    category: 'AI & automation',
    text: 'Have your AI pilots reached production, or stayed demos?',
    answers: [
      { label: 'In production, with real adoption', weight: 0 },
      { label: 'One or two are live', weight: 1 },
      { label: 'Impressive demos, nothing live yet', weight: 2 },
    ],
  },
]

export const riskLines: Record<Category, string> = {
  'Schedule & delivery control': 'Dates and escalations are already showing strain.',
  'Governance & reporting': 'Status and ownership aren’t consistent across the portfolio.',
  'Managed services & SLAs': 'Your SLA numbers and the customer’s experience are drifting apart.',
  'Commercial & margin': 'Margin visibility is thinner than it should be.',
  'AI & automation': 'AI work isn’t converting from demo to production.',
}

export type Recommendation = {
  name: string
  need: string
  blurb: string
  bullets: string[]
  slug: string
}

export const recommendations: Record<Category, Recommendation> = {
  'Schedule & delivery control': {
    name: 'Red-to-Ready Turnaround',
    need: 'Program recovery',
    slug: 'red-to-ready-turnaround',
    blurb:
      'An independent read of what’s true, then a hand on the wheel until the program is back under control.',
    bullets: [
      'A RAG view across scope, schedule, commercials, people and service',
      'A reset plan with named owners and exit criteria',
      'An executive cadence you can trust',
    ],
  },
  'Governance & reporting': {
    name: 'The Delivery Office',
    need: 'PMO / PGO setup',
    slug: 'the-delivery-office',
    blurb:
      'A PMO/PGO that gives leadership one true status, with escalation paths that catch problems early.',
    bullets: [
      'A governance charter, RACI and stage gates',
      'Dashboards and a reporting calendar people trust',
      'A coached PMO lead who can run it',
    ],
  },
  'Managed services & SLAs': {
    name: 'Managed Services Builder',
    need: 'Managed services setup',
    slug: 'managed-services-builder',
    blurb:
      'A repeatable service catalogue, SLA model and pricing approach, so every bid isn’t a blank page.',
    bullets: [
      'A managed services blueprint and transition toolkit',
      'SLA/KPI design tied to what customers actually feel',
      'Reusable pricing and proposal collateral',
    ],
  },
  'Commercial & margin': {
    name: 'Commercial Command',
    need: 'P&L / commercial governance',
    slug: 'commercial-command',
    blurb: 'A clear commercial baseline by account, so margin stops being a quarter-end surprise.',
    bullets: [
      'A commercial baseline and leakage register',
      'Pricing and staffing options, modelled',
      'A monthly financial review rhythm',
    ],
  },
  'AI & automation': {
    name: 'AI That Works',
    need: 'AI delivery',
    slug: 'ai-that-works',
    blurb: 'Use-case discovery through to production — with the validation a demo never gets.',
    bullets: [
      'A ranked, feasible AI use-case portfolio',
      'A pilot charter with real success measures',
      'A system in production, not a slide',
    ],
  },
}

export type Verdict = 'green' | 'amber' | 'red'

export const verdicts: Record<Verdict, { label: string; sub: string }> = {
  green: {
    label: 'Green — steady',
    sub: 'Nothing here looks urgent. Worth revisiting in a quarter, or before the next big commitment.',
  },
  amber: {
    label: 'Amber — worth a look',
    sub: 'There are early signals worth testing before they become escalations. A short diagnostic would settle it.',
  },
  red: {
    label: 'Red — act now',
    sub: 'Several signals point the same way. An independent reading of what is true is the fastest route back to control.',
  },
}

export function verdictFor(sum: number, max: number): Verdict {
  const pct = sum / max
  if (pct < 0.3) return 'green'
  if (pct < 0.6) return 'amber'
  return 'red'
}
