import { Helmet } from 'react-helmet-async'
import { site } from '@/data/site'

type SeoProps = {
  title?: string
  description?: string
  path?: string
  /** Article pages emit a different og:type and structured data. */
  type?: 'website' | 'article'
  jsonLd?: Record<string, unknown> | Record<string, unknown>[]
  /** Adds a two-level BreadcrumbList (Home > this label) for the current `path`. */
  breadcrumb?: string
  noindex?: boolean
}

export function Seo({
  title,
  description,
  path = '/',
  type = 'website',
  jsonLd,
  breadcrumb,
  noindex = false,
}: SeoProps) {
  const pageTitle = title ? `${title} — ${site.brand}` : `${site.brand} — ${site.role}`
  const pageDescription = description ?? site.description
  const url = `${site.url}${path}`
  const image = `${site.url}/brand/social-preview-1200x630.png`

  const breadcrumbSchema = breadcrumb
    ? {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: site.url },
          { '@type': 'ListItem', position: 2, name: breadcrumb, item: url },
        ],
      }
    : null

  const schemas = [
    ...(Array.isArray(jsonLd) ? jsonLd : jsonLd ? [jsonLd] : []),
    ...(breadcrumbSchema ? [breadcrumbSchema] : []),
  ]

  return (
    <Helmet>
      <title>{pageTitle}</title>
      <meta name="description" content={pageDescription} />
      <link rel="canonical" href={url} />
      <meta name="robots" content={noindex ? 'noindex, follow' : 'index, follow'} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={site.brand} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDescription} />
      <meta name="twitter:image" content={image} />
      {schemas.map((schema, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <script key={index} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  )
}

export const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Hrishikesh Salunkhe',
  alternateName: 'Rishi Salunkhe',
  jobTitle: 'Delivery & Transformation Advisor',
  email: `mailto:${site.email}`,
  url: site.url,
  address: { '@type': 'PostalAddress', addressLocality: 'Pune', addressCountry: 'IN' },
  description: site.description,
  knowsAbout: [
    'Program recovery',
    'PMO and PGO governance',
    'Managed services',
    'ITSM and ITIL',
    'Process re-engineering',
    'Commercial and P&L governance',
    'AI delivery and enablement',
  ],
  image: `${site.url}/brand/rishi.png`,
  alumniOf: [
    { '@type': 'Organization', name: 'Infosys' },
    { '@type': 'Organization', name: 'Tech Mahindra' },
    { '@type': 'Organization', name: 'Cleverex Technology' },
  ],
}

export const serviceJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: site.brand,
  slogan: site.tagline,
  url: site.url,
  email: `mailto:${site.email}`,
  areaServed: ['India', 'Australia', 'New Zealand', 'United Kingdom', 'Philippines'],
  serviceType: [
    'Delivery advisory',
    'Transformation advisory',
    'Managed services consulting',
    'AI delivery consulting',
  ],
}
