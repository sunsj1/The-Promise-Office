# SEO QA

## Canonical host

- **Fixed**: `site.url` was `https://thepromiseoffice.com` (no `www`), while the live domain
  308-redirects the apex to `www.thepromiseoffice.com`. Every canonical tag, OG URL and
  sitemap entry was pointing at a URL that immediately redirected away from itself. Now set to
  `https://www.thepromiseoffice.com` everywhere (`site.ts`, sitemap generator, robots.txt).
- `vercel.json` sets `"trailingSlash": false` for a single, consistent URL convention
  site-wide.

## Metadata

- Every page renders through the shared `<Seo>` component: unique `<title>`, meta description,
  canonical link, OG tags, Twitter card, and — new this round — a `BreadcrumbList` JSON-LD for
  every subpage (added via the `breadcrumb` prop).
- `personJsonLd` (Person) and `serviceJsonLd` (ProfessionalService) already existed and are
  wired into Home/About and Advisory/Engagements respectively; GCC and AI pages get their own
  `Service` JSON-LD.
- No fake ratings, reviews, certifications or locations were added to any schema.

## Routing / redirects

- `/engagements` → `/advisory`, `/engagements/:slug` → `/advisory/:slug`, `/perspective` →
  `/about`: permanent (301) redirects in `vercel.json`, verified against `vite preview`
  build for the underlying routes' 200 status, and against the dev build for the
  client-side `<Navigate>` fallback (confirmed `location.pathname` resolves correctly for
  both legacy paths).
- **Post-deploy action needed**: `vercel.json` redirects only take effect on Vercel's edge —
  they cannot be tested locally with `vite preview`. Verify with `curl -I` against production
  after deploy that `/engagements/ai-that-works` returns `301` → `/advisory/ai-that-works`,
  not a client-side-only redirect.

## Sitemap & robots

- `public/sitemap.xml` is regenerated on every `npm run build` (via `scripts/generate-sitemap.mjs`)
  with today's date and the new URL set (17 entries: 11 top-level/utility pages + 6 advisory
  detail pages). No stale hand-written dates.
- `robots.txt` allows all crawling and points at the `www` sitemap URL.

## Internal linking

- Every internal link that referenced `paths.engagements`/`paths.engagementDetail`/
  `paths.perspective` was updated to the new path helpers (`paths.advisory`,
  `paths.advisoryDetail`, `paths.about`) — verified with a full-repo grep, zero remaining
  references outside the legacy-redirect routes themselves.

## Post-deployment checklist (not yet done — requires production access)

- [ ] Submit updated sitemap to Google Search Console and Bing Webmaster Tools.
- [ ] Request re-indexing for `/`, `/advisory`, `/gcc`, `/ai`.
- [ ] Verify the 301s from `/engagements*` and `/perspective` at the edge (see above).
- [ ] Re-run a social-card preview test (e.g. via LinkedIn Post Inspector) for the homepage
      and one advisory page — the OG image itself was not changed this round.
- [ ] Validate structured data with Google's Rich Results Test on `/`, `/gcc`, `/ai`, `/about`.
