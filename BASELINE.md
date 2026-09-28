# Baseline — confirmed 2026-09-28

This commit is the confirmed source of truth for `main` and for what's
deployed at https://www.thepromiseoffice.com, as of 2026-09-28.

## Why this file exists

`main` and the `v2` branch had drifted apart and, separately, what Vercel
was actually serving in production drifted from both of them at different
points on 2026-09-28 — production was observed showing this V2 build during
one check, then reverted to the pre-V2 build (matching `main` before today)
a few hours later, with no confirmed cause. To stop guessing, `main` was
reset to be content-identical to `v2`'s commit `d7c071f` ("Checkpoint: V2
release corrections pending visual QA") and re-verified live. This is that
verification record.

**Go-forward rule: treat `main` as the only branch that matters.** `v2`
still exists on the remote and is one commit ahead (`a7b3e3e`, a duplicate
`#managed-services` anchor-id fix, plus a merge of old `main` into `v2`) —
it was **not** pulled into this baseline, so that anchor-id fix is not yet
on `main`. Decide whether to cherry-pick it or retire the `v2` branch
outright; until then, don't develop against `v2`.

## What was verified live (browser, cache-busted, post-deploy)

- `/` — title reads "The Promise Office — Delivery, GCC, Transformation &
  AI Advisory" (confirms the V2 branding, not the old "Rishi Salunkhe —
  Delivery & Transformation Advisory" title).
- `/advisory` — loads (new IA hub page).
- `/privacy` — loads (previously missing entirely from what was live).

Not re-verified live in this pass: the 301 redirects
(`/engagements→/advisory`, `/perspective→/about`), the adaptive Health
Check flow, Cal.com booking, or anything in the existing `*_QA.md` files
below — see those files for what their own authors already checked and
didn't.

## Known gaps at this baseline (not fixed here — see note below)

- **Security headers regression**: `vercel.json` on the old `main` (commit
  `cf298b5`) had a CSP / `X-Content-Type-Options` / `Referrer-Policy` /
  `Permissions-Policy` block. This baseline's `vercel.json` does not carry
  it — it was written independently on the `v2` branch and never merged
  with that change. Currently **no security headers are deployed**.
- **Soft-404s**: `vercel.json`'s rewrite is still a catch-all
  (`"/(.*)"  → /index.html`) with no explicit route allowlist, so a
  nonexistent URL returns HTTP 200 with the SPA's own 404 page instead of
  a real 404 status.
- Everything already tracked in `LAUNCH_CHECKLIST.md`, `CLAIMS_VERIFICATION.md`,
  `ACCESSIBILITY_QA.md`, `PERFORMANCE_QA.md`, `RESPONSIVE_QA.md`,
  `SEO_QA.md`, and `CHANGELOG.md` — all still apply and are unchanged by
  this baseline; read those before assuming something here is done.

Nothing above was fixed as part of establishing this baseline — this pass
was deliberately verification-and-documentation only, not another round of
code changes, after two back-to-back reverts today.

## Environment note

`npm install` could not be run to verify a local build or typecheck in
this sandbox (registry.npmjs.org returns 403 for at least one package
version here, unrelated to this codebase). Verification above is live-URL
only. Run a real local build before trusting anything not listed as
verified here.
