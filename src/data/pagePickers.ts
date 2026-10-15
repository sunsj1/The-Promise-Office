import { aboutPrinciples } from '@/data/about'
import { coreDimensions } from '@/data/diagnostic'
import { getEngagement } from '@/data/engagements'
import { lensStages } from '@/data/lens'
import { insights } from '@/data/perspective'
import { primarySituations } from '@/data/situations'
import { paths } from '@/routes/paths'

/**
 * Content for the interactive masthead graphic on each page. Every picker is a
 * "pick your situation, see how we help" explorer; `track` (optional) is a small
 * rail whose highlighted stages show where the help applies.
 */
export type PickerOption = {
  id: string
  label: string
  summary: string
  how?: string[]
  /** Indices into `track` that light up for this option. */
  focus?: number[]
  link?: { label: string; to: string; hash?: boolean }
}

export type PickerConfig = {
  prompt: string
  resultLabel: string
  track?: string[]
  trackLabel?: string
  variant?: 'rail' | 'flow'
  options: PickerOption[]
}

function mandate(slug: string, label: string, focus: number[]): PickerOption {
  const e = getEngagement(slug)
  return {
    id: slug,
    label,
    summary: e?.entryProblem ?? '',
    how: e?.whatWeDo.slice(0, 3),
    focus,
    link: { label: e ? `See ${e.title}` : 'See the mandate', to: paths.advisoryDetail(slug) },
  }
}

const lensTrack = lensStages.map((s) => s.name)

export const gccPicker: PickerConfig = {
  prompt: 'Pick the pain point closest to yours',
  resultLabel: 'How we help',
  trackLabel: 'Where in the GCC lifecycle',
  track: ['Define', 'Transition', 'Stabilise', 'Scale', 'Transform'],
  options: [
    {
      id: 'tasks',
      label: 'We run tasks, not outcomes',
      summary: 'The centre executes well but does not yet own results for the enterprise.',
      how: [
        'Clarify mandate and decision rights',
        'Move from capacity measures to outcome measures',
        'Build the path from execution to enterprise ownership',
      ],
      focus: [3, 4],
    },
    {
      id: 'vendor',
      label: 'Taking work back from a vendor feels risky',
      summary: 'Knowledge, services and accountability have to move without losing control.',
      how: [
        'Vendor-to-GCC transition plan and office',
        'Service management held steady through the handover',
        'Clear accountability on both sides of the move',
      ],
      focus: [1],
    },
    {
      id: 'mandate',
      label: 'Nobody is sure who decides what',
      summary: 'Mandate, scope and ownership were never fixed before the centre started hiring.',
      how: [
        'Define mandate, scope, ownership and success measures',
        'Governance and decision rights',
        'Agreed before anyone is hired or transitioned',
      ],
      focus: [0],
    },
    {
      id: 'service',
      label: 'Service quality is uneven',
      summary: 'There is capacity, but no operating rhythm the centre can run on day to day.',
      how: [
        'Operating rhythm and service measures',
        'Governance the centre runs on every day',
        'Service management and performance',
      ],
      focus: [2],
    },
    {
      id: 'heroes',
      label: 'Growth depends on a few heroes',
      summary: 'Scale is arriving faster than leadership depth and repeatable practice.',
      how: [
        'Capability ramp-up',
        'Leadership capability and repeatability',
        'Growth that no longer depends on individual heroics',
      ],
      focus: [3],
    },
    {
      id: 'ai',
      label: 'AI is consumed, not owned',
      summary: 'The centre uses AI tools but does not yet run an AI-enabled operation.',
      how: [
        'Use-case portfolio and AI operating model',
        'Governance, decision rights and enablement',
        'Benefits measurement',
      ],
      focus: [4],
    },
  ],
}

export const aiPicker: PickerConfig = {
  prompt: 'Pick an AI use case',
  resultLabel: 'What it takes to run it',
  trackLabel: 'Where the work sits',
  track: ['Value', 'Workflow', 'Controls', 'Production', 'Adoption'],
  variant: 'flow',
  options: [
    {
      id: 'agent',
      label: 'AI agent',
      summary: 'Software that takes actions, not just gives answers.',
      how: [
        'Where should the agent act, and what can it decide?',
        'When must a human intervene?',
        'What evidence is retained?',
      ],
      focus: [1, 2, 3],
    },
    {
      id: 'knowledge',
      label: 'Knowledge assistant',
      summary: 'Retrieval-grounded answers from your own documents.',
      how: [
        'Test against real questions from the users',
        'Handle outdated, conflicting and missing sources',
        'Grounding, monitoring and a fallback',
      ],
      focus: [1, 3],
    },
    {
      id: 'workflow',
      label: 'Workflow automation',
      summary: 'Intake, classification and routing of everyday work.',
      how: [
        'Map the current and the future workflow',
        'Separate the human decisions from the AI contribution',
        'System integration, ownership and controls',
      ],
      focus: [1, 2],
    },
    {
      id: 'decision',
      label: 'Decision support',
      summary: 'AI that informs a decision a person still owns.',
      how: [
        'Success measures, accuracy and evaluation',
        'Human oversight and risk ownership',
        'Value tracking after launch',
      ],
      focus: [0, 2],
    },
    {
      id: 'copilot',
      label: 'Team copilots',
      summary: 'AI assistance built into how a role works every day.',
      how: [
        'Role-based workflows',
        'Prompt and workflow playbooks',
        'Training and adoption measures',
      ],
      focus: [4],
    },
  ],
}

export const advisoryPicker: PickerConfig = {
  prompt: 'Pick the situation closest to yours',
  resultLabel: 'What we do',
  trackLabel: 'Where the Promise Lens looks',
  track: lensTrack,
  options: [
    mandate('red-to-ready-turnaround', 'A program is slipping', [3, 4]),
    mandate('the-delivery-office', 'No delivery control tower', [3, 4]),
    mandate('managed-services-builder', 'A managed service to build', [2, 4]),
    mandate('process-to-platform', 'Process before platform', [2, 3]),
    mandate('commercial-command', 'Commercials and delivery drift apart', [1, 5]),
    mandate('ai-that-works', 'AI that has to work in operations', [0, 4]),
  ],
}

export const contactPicker: PickerConfig = {
  prompt: 'What are you bringing to the call?',
  resultLabel: 'What the call looks at',
  options: [
    mandate('red-to-ready-turnaround', 'Program recovery', []),
    mandate('the-delivery-office', 'PMO / delivery office setup', []),
    mandate('managed-services-builder', 'Managed services practice', []),
    mandate('commercial-command', 'Commercial or deal assurance', []),
    mandate('ai-that-works', 'AI delivery or training', []),
  ],
}

export const evidencePicker: PickerConfig = {
  prompt: 'Pick a recurring situation',
  resultLabel: 'What often sits underneath',
  options: primarySituations.map((s) => ({
    id: s.slug,
    label: s.title.replace(/^When /, ''),
    summary: s.underneath,
    link: { label: 'Jump to this situation', to: `#${s.slug}`, hash: true },
  })),
}

export const insightsPicker: PickerConfig = {
  prompt: 'Pick an argument',
  resultLabel: 'In brief',
  options: insights.map((a) => ({
    id: a.slug,
    label: a.title,
    summary: a.standfirst,
    link: { label: a.cta.label, to: a.cta.to },
  })),
}

export const aboutPicker: PickerConfig = {
  prompt: 'Pick a working principle',
  resultLabel: 'In practice',
  options: aboutPrinciples.map((p) => ({
    id: p.index,
    label: p.title,
    summary: p.heading,
    how: [p.copy],
  })),
}

const dimensionQuestion: Record<string, string> = {
  'value-priorities': 'Are we working on the right things, in the right order?',
  economics: 'Where is value leaking between the promise and the numbers?',
  execution: 'Is the change actually landing in the operation?',
  governance: 'Do decisions get made, owned and followed through?',
  'operating-model': 'Can the organisation carry what it has committed to?',
}

export const healthCheckPicker: PickerConfig = {
  prompt: 'What the check examines',
  resultLabel: 'The question it asks',
  options: coreDimensions.map((d) => ({
    id: d.key,
    label: d.label,
    summary: dimensionQuestion[d.key] ?? '',
  })),
}

const atlasStages = [
  { verb: 'Plan', name: 'Business & Enterprise', tagline: 'Decide, design and work together' },
  { verb: 'Build', name: 'Build', tagline: 'Write the product' },
  { verb: 'Know', name: 'Data & AI', tagline: 'Store, move and learn from data' },
  { verb: 'Run', name: 'Platform & Cloud', tagline: 'Where software lives and scales' },
  { verb: 'Deliver', name: 'Delivery & Reliability', tagline: 'Ship safely, keep it healthy' },
] as const

export const atlasPicker: PickerConfig = {
  prompt: 'Pick a stage of delivery',
  resultLabel: 'On the map',
  trackLabel: 'From idea to running service',
  track: atlasStages.map((s) => s.verb),
  options: atlasStages.map((s, i) => ({
    id: s.verb,
    label: `${s.verb} — ${s.name}`,
    summary: s.tagline,
    focus: [i],
  })),
}
