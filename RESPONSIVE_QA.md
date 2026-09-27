# Responsive QA

## Viewports actually tested this round

- **375px** (mobile): homepage (hero, founder descriptor, four-practice cards, mobile nav
  with all 6 items + Health check + CTA), Evidence filters. No horizontal scroll
  (`document.documentElement.scrollWidth === clientWidth === 375`). Mobile nav sheet shows all
  six primary links plus Health check and the full-width CTA, each with a visible tap target
  and a divider line — nothing overlapping or truncated.
- **1024px** (desktop, this pane's default): every new/changed page — Home, Advisory, GCC, AI,
  Evidence, About, Privacy, Terms — checked via rendered text and targeted screenshots.

## Not independently re-tested this round (carried over from the existing, working layout)

- 320, 360, 390, 430, 768, 1280, 1440, 1920px — the layout primitives (`Container`, Tailwind
  responsive classes) were not changed by this round's work except where noted below, so risk
  is low, but these exact breakpoints were not re-screenshotted.
- Case-study filter row wrapping at in-between widths (e.g. 600–767px, where the filter pills
  may wrap awkwardly) — worth a manual check before launch.

## Specifically checked because they're new

- **Four Advisory Practices grid** (`sm:grid-cols-2 lg:grid-cols-4`): 1-column on mobile,
  confirmed via screenshot — no cramped 2-up phones.
- **Capabilities grid** (`sm:grid-cols-2 lg:grid-cols-3`): same pattern, not independently
  screenshotted at 375px this round — same grid classes as the practices grid above, so risk
  is low but not zero.
- **GCC/AI page grids** (lifecycle stages, capability-area pills, AI capability cards): use the
  same responsive grid classes as existing homepage sections; not independently screenshotted
  at every breakpoint.
- **Mobile nav with 6 items** (previously 5): confirmed it still fits without overflow or
  truncation at 375px (see screenshot check above).

## Known pre-existing item, not touched

- The rest of the site's card/section responsive behaviour is unchanged from before this
  round and was already working at the breakpoints tested in earlier passes.
