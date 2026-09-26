import { paths } from '@/routes/paths'

export const problems = [
  {
    id: 'slipping',
    label: 'The program is slipping',
    hint: 'Dates move. The status is green. Nobody believes it.',
    href: paths.engagementDetail('red-to-ready-turnaround'),
  },
  {
    id: 'pmo',
    label: 'PMO reports disagree',
    hint: 'Escalations arrive late. Governance feels like overhead.',
    href: paths.engagementDetail('the-delivery-office'),
  },
  {
    id: 'service',
    label: 'Managed services is a slide',
    hint: 'Sales has demand. Operations has no model to run.',
    href: paths.engagementDetail('managed-services-builder'),
  },
  {
    id: 'friction',
    label: 'We are automating a mess',
    hint: 'The platform is live. The old friction came with it.',
    href: paths.engagementDetail('process-to-platform'),
  },
  {
    id: 'margin',
    label: 'Growth is outrunning margin',
    hint: 'Revenue is up. Cost to serve is a guess.',
    href: paths.engagementDetail('commercial-command'),
  },
  {
    id: 'ai',
    label: 'AI is still a demo',
    hint: 'Impressive in the room. Unowned in the operation.',
    href: paths.engagementDetail('ai-that-works'),
  },
] as const

export const framework = [
  {
    index: '01',
    title: 'Diagnose',
    lead: 'Make the truth discussable.',
    copy: 'Independent review of delivery, service, process or commercial health. Decisions and priorities made explicit before anyone adds more reporting.',
  },
  {
    index: '02',
    title: 'Design',
    lead: 'Build something the team can run.',
    copy: 'Operating models, governance functions, managed services propositions and process changes designed for use — not for a deck.',
  },
  {
    index: '03',
    title: 'Lead',
    lead: 'Take the wheel for a critical period.',
    copy: 'Interim program, account or transformation leadership when the work needs experienced ownership, not another observer.',
  },
  {
    index: '04',
    title: 'Enable',
    lead: 'Leave the rhythm behind.',
    copy: 'Coaching, playbooks and role-based AI or delivery workshops so the team can hold the operating system after the mandate ends.',
  },
] as const
