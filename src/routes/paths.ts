export const paths = {
  home: '/',
  advisory: '/advisory',
  advisoryDetail: (slug: string) => `/advisory/${slug}`,
  gcc: '/gcc',
  ai: '/ai',
  evidence: '/evidence',
  about: '/about',
  insights: '/insights',
  healthCheck: '/health-check',
  contact: '/contact',
  booked: '/booked',
  privacy: '/privacy',
  terms: '/terms',
  // Legacy paths — kept only as redirect targets (see routes/index.tsx and vercel.json).
  legacyEngagements: '/engagements',
  legacyEngagementDetail: (slug: string) => `/engagements/${slug}`,
  legacyPerspective: '/perspective',
} as const

export const navLinks = [
  { label: 'Advisory', href: paths.advisory },
  { label: 'GCC', href: paths.gcc },
  { label: 'AI', href: paths.ai },
  { label: 'Evidence', href: paths.evidence },
  { label: 'Insights', href: paths.insights },
  { label: 'About', href: paths.about },
] as const
