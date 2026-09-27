# Performance QA

## Already done (earlier in this engagement, retained)

- Hero portrait re-encoded: 1MB PNG → 55KB WebP + 229KB PNG fallback via `<picture>`,
  `fetchPriority="high"` since it's the LCP element. **Not lazy-loaded** (per the brief: never
  lazy-load the actual LCP image).
- Vodafone org logo: 1191×1191 130KB → 256×256 12KB (was 37× oversized for its ~32px display
  height).
- All non-home routes are `React.lazy()`-loaded; Home stays eager since it's the majority
  landing page.
- `scripts/generate-sitemap.mjs` runs as a `prebuild` step — no manual step to forget.

## Current build output (latest, this round)

```
dist/assets/index-*.js       326.83 kB │ gzip: 102.70 kB   (eager: Home + shared)
dist/assets/Seo-*.js         237.39 kB │ gzip:  85.72 kB   (shared chunk incl. @calcom/embed-react)
dist/assets/Advisory-*.js     13.60 kB │ gzip:   3.80 kB   (lazy)
dist/assets/HealthCheck-*.js  15.75 kB │ gzip:   5.77 kB   (lazy)
dist/assets/GCC-*.js           7.17 kB │ gzip:   2.58 kB   (lazy, new)
dist/assets/AI-*.js            5.85 kB │ gzip:   2.16 kB   (lazy, new)
dist/assets/About-*.js         9.18 kB │ gzip:   2.95 kB   (lazy)
dist/assets/Privacy-*.js       2.62 kB │ gzip:   1.10 kB   (lazy, new)
dist/assets/Terms-*.js         2.91 kB │ gzip:   1.15 kB   (lazy, new)
… (Evidence, Contact, Insights, Booked, AdvisoryDetail, NotFound: 1–5 kB each)
```

## Known remaining risk — not fixed this round

- The chunk Vite names `Seo-*.js` (237KB / 86KB gzip) is a **shared** chunk, not actually the
  Seo widget — Rollup's automatic chunking grouped `@calcom/embed-react`'s shared internals
  here because `lib/cal.ts` (which every page touches via `Navbar`/`Footer`/`Button`) imports
  from it. This means the Cal.com embed's JS loads on **every** page, including ones that never
  show the embed. Fixing this would mean lazy-loading `getCalApi`/`CalBoot` itself, deferred
  until a "Request a call" control is actually interacted with — a real optimization opportunity,
  out of scope for this round because it touches the booking-flow code path and needs its own
  testing pass.
- No Lighthouse/PageSpeed run was performed in this environment (no real browser network
  throttling available here) — Core Web Vitals numbers are estimated from bundle size only,
  not measured.
- New pages (GCC, AI) reuse existing widgets and add no new heavy dependencies, so they don't
  change the above risk.

## Fonts, images, layout shift

- No new fonts introduced. `<picture>`/`width`/`height` set on the hero image (unchanged this
  round). New pages use only existing widgets (`SpotlightCard`, `Container`, `PageHeader`,
  `Reveal`) — no new image assets added.
