# The Promise Office

Rishi Salunkhe's delivery & transformation advisory site. React, Vite, TypeScript, Tailwind CSS, React Router, and Motion. Deployed on Vercel as a client-rendered SPA (`vercel.json` carries the routing fallback).

## Scripts

```bash
npm run dev
npm run build     # regenerates public/sitemap.xml, then type-checks and builds
npm run preview
npm run lint
```

## Environment variables

- `VITE_GA_MEASUREMENT_ID` (optional) — set in Vercel project settings to turn on GA4 pageview and conversion tracking (`src/lib/analytics.ts`). Analytics stays fully off until this is set.

## Structure

```
src/
  assets/        Logo, org marks, and the hero portrait (webp + png)
  animations/    Motion variants and easing
  data/          Site, project, and studio content
  pages/         One folder per route
  routes/        Paths and router (lazy-loaded per route, except Home)
  widgets/       Shared layout, SEO, cards, motion, error states
  lib/           Utilities (theme, Cal.com embed, analytics)
scripts/
  generate-sitemap.mjs   Regenerates public/sitemap.xml with today's date; runs before every build
```

## Content

Copy and case studies live in `src/data`. Update them there when the underlying story changes.
