# V2 Changelog

Scope: evolve the existing site into the approved V2 architecture (four advisory practices,
GCC and AI as dedicated pages, six substantive cross-cutting capabilities, palette and
canonical fixes). This was an evolution, not a rebuild — existing content, data and working
code were kept wherever they already matched the brief.

## Brand & positioning

- Founder descriptor locked and added to the homepage hero and About page:
  "Hrishikesh (Rishi) Salunkhe · Delivery & Transformation Advisor to IT Services, GCCs &
  Enterprise Leaders."
- Homepage hero H1 ("Make the promise deliverable.") kept verbatim; supporting copy rewritten
  to name delivery, GCC, service capability and AI-to-operations instead of the prior generic
  line.
- Palette: Ink (`#16132B`) is now the dark-theme/dark-panel foundation (previously `#12110e`
  warm charcoal). Deep Plum (`#4B2E83`) reintroduced deliberately as a glow/accent in four
  dark sections (Thesis, Modes, GCC+AI spotlight ×2) — not a global wash. Amber (`#F0B43C`,
  unchanged) stays the only action/outcome accent. Paper set to the exact `#F5F4F8`. Lilac
  (`#B7A6D9`) used sparingly, as a tonal text tint in two dark-panel eyebrows.
- Organisation strip: the continuously animated marquee (`widgets/Marquee`) was replaced with
  a static, restrained "Experience includes" row (`widgets/ExperienceStrip`) — logos in
  grayscale, no motion. Disclaimer retained verbatim.

## Information architecture / routing

- `/engagements` → `/advisory` (hub), `/engagements/:slug` → `/advisory/:slug` (all six),
  `/perspective` → `/about`. Permanent (301) redirects added in `vercel.json`; matching
  client-side `<Navigate>` routes added as a safety net for cached SPA sessions.
  `trailingSlash: false` set for consistency.
- New top-level pages: `/gcc`, `/ai`, `/privacy`, `/terms`.
- Nav is now: Advisory · GCC · AI · Evidence · Insights · About, with "Book a conversation"
  as the persistent CTA. "Contact" moved out of the primary nav into the footer and the CTA
  buttons (it's still a real page at `/contact`).
- Sitemap generator and CI route smoke-test updated to the new URL set.

## Content

- Added `practices` (4) and `capabilities` (6) to `src/data/engagements.ts`. Every signature
  engagement now carries a `practice` field so the Advisory hub can show which of the four
  practices it belongs to. The six capabilities (Process & Operating Model, Practice &
  Capability Building, ITSM & Service Management, Pursuit/RFP & Deal Assurance, Commercial &
  Value Assurance, Governance & Delivery Leadership) are written with full depth — problem,
  what we do, what you receive, experience behind it — built from existing engagement and
  evidence copy, not invented claims.
- Homepage restructured: removed the redundant "choose the first problem" section (it
  duplicated the signature-engagements grid) and replaced it with the four-practice cards;
  added a compact capabilities section and an "AI-enabled GCC" spotlight; hero and hero
  founder line updated.
- GCC page built from real adjacent experience (the ~550-FTE PGO, the ~400-FTE Philippines
  Test CoE transition) with an explicit legal/tax/entity/payroll scope-exclusion statement.
- AI page built from the existing `ai-that-works` engagement and the knowledge-assistant
  evidence case; explicitly scoped as operating-layer advisory, not model engineering.
- Evidence: added a `whatThisProves` field to every case (shown on an expand toggle, not
  crowding the compact card); tags changed from a single value to an array so a case can
  carry more than one; added the "GCC & Capability" filter; the PGO/CoE-transition case is
  now tagged both `managed-services` and `gcc`, explicitly labeled "experience behind the
  proposition," never a formal GCC engagement.
- New Privacy and Terms pages, scoped to what the site actually does (Cal.com booking data,
  optional GA4, client-side-only health check tool). No legal entity suffix used anywhere.

## Fixes

- **Evidence filter tabs did nothing** — all cases stayed visible regardless of the selected
  filter. Root cause: `AnimatePresence mode="popLayout"` around the filtered list was not
  reconciling correctly with this Framer Motion/Suspense combination. Fixed by rendering the
  filtered list directly (a plain fade-in per card) instead of through `AnimatePresence`.
  Verified against a production build, not just the dev server. This bug predated this round
  of work.
- **Canonical host mismatch** — `site.url` was `https://thepromiseoffice.com` (no `www`), but
  the live site 308-redirects the apex to `www`. Every canonical tag, OG URL and sitemap entry
  was therefore pointing at a URL that immediately redirected away from itself. Fixed to
  `https://www.thepromiseoffice.com`.
- Homepage career stat now reads "~US$20M" (was "~$20M" with an ambiguous `$`), matching the
  explicit "US$20 million" wording already used on the Evidence page.

## Not changed (explicit decisions)

- No domain email change (still the working Gmail address).
- GA4 stays dormant — `src/lib/analytics.ts` no-ops until `VITE_GA_MEASUREMENT_ID` is set.
- No legal entity suffix added anywhere.
- Mountain banner: not yet supplied — nothing added or faked in its place.
- Testimonials: kept at the existing three genuine recommendations.
