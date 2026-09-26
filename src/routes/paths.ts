export const paths = {
  home: '/',
  engagements: '/engagements',
  engagementDetail: (slug: string) => `/engagements/${slug}`,
  evidence: '/evidence',
  perspective: '/perspective',
  insights: '/insights',
  healthCheck: '/health-check',
  contact: '/contact',
} as const

export const navLinks = [
  { label: 'Engagements', href: paths.engagements },
  { label: 'Evidence', href: paths.evidence },
  { label: 'Perspective', href: paths.perspective },
  { label: 'Insights', href: paths.insights },
  { label: 'Contact', href: paths.contact },
] as const
