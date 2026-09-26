export type Persona = {
  id: string
  audience: string
  who: string
  pain: string
  entry: string
}

export const personas: Persona[] = [
  {
    id: 'it-services',
    audience: 'IT services firms',
    who: 'Founders and delivery heads',
    pain: 'You are winning work faster than your delivery model can absorb it. Margins are unclear, escalations reach you late, and every bid starts from a blank page.',
    entry: 'managed-services-builder',
  },
  {
    id: 'gcc',
    audience: 'GCCs & enterprise IT',
    who: 'Centre leaders and CIO teams',
    pain: 'You are scaling an India capability centre, moving work from vendors, or trying to make PMO reporting something leadership can act on.',
    entry: 'the-delivery-office',
  },
  {
    id: 'sponsors',
    audience: 'Transformation sponsors',
    who: 'Executives with a program at risk',
    pain: 'A critical program keeps moving its dates. You need an independent view of what is true, followed by practical recovery ownership.',
    entry: 'red-to-ready-turnaround',
  },
]

export const modes = [
  {
    id: 'diagnose',
    title: 'Diagnose',
    copy: 'Independent review of delivery, service, process or commercial health; decisions and priorities made explicit.',
  },
  {
    id: 'design',
    title: 'Design',
    copy: 'Operating models, governance functions, managed services propositions and process changes built for use.',
  },
  {
    id: 'lead',
    title: 'Lead',
    copy: 'Interim program, account or transformation leadership when critical work needs experienced ownership.',
  },
  {
    id: 'enable',
    title: 'Enable',
    copy: 'Coaching, playbooks and role-based AI or delivery workshops that build capability inside the team.',
  },
] as const

export const engagementShapes = [
  {
    index: '01',
    title: 'Independent diagnostic',
    meta: 'Fixed scope · typically 2–3 weeks',
    items: ['Delivery Health Check', 'Deal Delivery Assurance', 'AI use-case assessment'],
  },
  {
    index: '02',
    title: 'Design & build',
    meta: 'Project scope · duration agreed together',
    items: [
      'PMO/PGO or managed services setup',
      'ITSM reset or process redesign',
      'AI pilot and adoption',
    ],
  },
  {
    index: '03',
    title: 'Interim leadership',
    meta: 'Time-bound mandate · agreed cadence',
    items: ['Program recovery lead', 'Fractional Head of Delivery', 'Transition office lead'],
  },
] as const
