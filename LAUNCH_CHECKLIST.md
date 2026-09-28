# Launch Checklist — items needing founder input

Everything below is genuinely outstanding — nothing on this list was faked, guessed, or
silently worked around.

- [ ] **Logo asset**: not applicable — the exact approved Threshold Seal kit is already in
      use (`examples/logos/ThresholdSeal-kit`, mirrored into `src/assets/brand` and
      `public/brand`). No placeholder logo exists anywhere. Nothing to confirm here.
- [ ] **Professional portrait**: not applicable — a real, optimized portrait is already live
      (`src/widgets/Portrait`). Nothing to confirm here.
- [ ] **Mountain banner asset** — referenced in the brief as "an approved asset exists and
      will be supplied." Not yet received. Nothing was added in its place.
- [ ] **Domain email** (`rishi@` or `hello@thepromiseoffice.com`) — not changed; site still
      uses the working Gmail address per your explicit instruction.
- [ ] **GA4 Measurement ID** — analytics wiring exists (`src/lib/analytics.ts`) but is fully
      dormant until you supply `VITE_GA_MEASUREMENT_ID` as a Vercel environment variable.
- [ ] **"AI Without the Jargon" product URL** — no purchase link exists anywhere (correct, per
      the brief's "no dead button" rule). Supply a URL if you want a "Get the guide" CTA added.
- [ ] **Claims needing confirmation** — see `CLAIMS_VERIFICATION.md` for the full table;
      highlights: the ~550-FTE PGO figure, the ~400-FTE Philippines Test CoE figure and
      timeline, the ~80,000-file knowledge-assistant scale, the 1–2→10/year bid-pace claim,
      and the education/certification list.
- [ ] **Search Console / Bing Webmaster verification** — not done (needs your account access).
- [ ] **Sitemap submission** post-deploy — see `SEO_QA.md` checklist.
- [ ] **301 redirect verification against production** — `vercel.json` redirects
      (`/engagements*` → `/advisory*`, `/perspective` → `/about`) can only be verified against
      the live Vercel deployment, not locally. Run `curl -I` against production after deploy.
- [ ] **Additional LinkedIn recommendations** for About, if you have more than the 3 already
      used on Home.
- [ ] **Legal entity name**, if any — footer currently reads "Founded by Hrishikesh (Rishi)
      Salunkhe," no suffix, per your instruction not to add one unless confirmed.
- [ ] **Palette sign-off** — Ink/Plum/Amber/Paper/Lilac applied per your five clarifications;
      worth a visual look before this goes live, since it's a real (if deliberately restrained)
      shift from the previous warm-charcoal theme.
- [ ] **Full accessibility/responsive/performance passes** — see the respective `_QA.md` files
      for what was and wasn't independently verified in this environment (no Lighthouse, no
      screen reader, limited breakpoint coverage).

## Confirmed already resolved (no action needed from you)

- Old canonical/OG host mismatch (apex vs `www`) — fixed.
- Evidence page filter tabs not actually filtering — fixed and verified against a production
  build.
- No legacy "Rishi Salunkhe Advisory" branding, RS favicon, or placeholder/lorem/TODO strings
  found anywhere in `src/` (checked via full-repo grep).
- No dead booking button — `BookCallButton`/`bookCallAttrs` always resolves to the real
  Cal.com URL; there's no empty `BOOKING_URL` state to worry about, since booking has always
  been wired directly to Cal.com rather than through a placeholder config variable.
