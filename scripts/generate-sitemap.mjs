// Regenerates public/sitemap.xml, stamping every entry with today's date so
// it can't silently go stale. Plain JS (no TS import) so it runs on whatever
// Node version the build host has, with no extra flags. If a route or
// engagement slug is added, add it here too.
import { writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const SITE_URL = 'https://www.thepromiseoffice.com'
const today = new Date().toISOString().slice(0, 10)

const entries = [
  { loc: '/', priority: '1.0' },
  { loc: '/advisory', priority: '0.9' },
  { loc: '/gcc', priority: '0.9' },
  { loc: '/ai', priority: '0.9' },
  { loc: '/evidence', priority: '0.8' },
  { loc: '/about', priority: '0.8' },
  { loc: '/insights', priority: '0.8' },
  { loc: '/health-check', priority: '0.8' },
  { loc: '/contact', priority: '0.8' },
  { loc: '/privacy', priority: '0.3' },
  { loc: '/terms', priority: '0.3' },
  { loc: '/advisory/red-to-ready-turnaround', priority: '0.6' },
  { loc: '/advisory/the-delivery-office', priority: '0.6' },
  { loc: '/advisory/managed-services-builder', priority: '0.6' },
  { loc: '/advisory/process-to-platform', priority: '0.6' },
  { loc: '/advisory/commercial-command', priority: '0.6' },
  { loc: '/advisory/ai-that-works', priority: '0.6' },
]

const urlset = entries
  .map(
    ({ loc, priority }) => `  <url>
    <loc>${SITE_URL}${loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${priority}</priority>
  </url>`,
  )
  .join('\n')

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlset}
</urlset>
`

const outPath = path.resolve(fileURLToPath(import.meta.url), '../../public/sitemap.xml')
writeFileSync(outPath, xml)
console.log(`Wrote ${entries.length} URLs to public/sitemap.xml (lastmod ${today})`)
