# Accessibility QA

Target: practical WCAG 2.2 AA. This is a review of what already existed plus what changed
this round — not a full formal audit (no automated axe/Lighthouse run was performed in this
environment).

## Already in place (verified by reading the code, retained as-is)

- **Skip link**: `Navbar` renders a "Skip to content" link, visually hidden until focused,
  targeting `#main` on the `<main>` element in `Layout`.
- **Reduced motion**: every animated component (`Reveal`, `RevealGroup`, `Seal`,
  `useCountUp`, `Hero`, `Navbar`) checks `useReducedMotion()` and either disables the motion
  variant or jumps straight to the end state. Global CSS also zeroes animation/transition
  duration under `prefers-reduced-motion: reduce`.
- **Focus states**: `:focus-visible` gets a 2px amber outline with offset, globally, not just
  on specific components.
- **RAG status has text labels, not colour alone**: `verdicts` (`healthCheck.ts`) pairs every
  colour with a label ("Green — steady", "Amber — worth a look", "Red — act now") and a
  sub-line; `RagGauge` takes a `label` prop rendered as text.
- **Landmarks**: `<header>`, `<main id="main">`, `<footer>`, breadcrumb `<nav aria-label="Breadcrumb">`,
  footer `<nav aria-label="Footer">`.
- **Heading hierarchy**: each page has exactly one `<h1>` (in `PageHeader` or the Home hero);
  the new `ErrorState` component defaults to `<h2>` and only renders `<h1>` when used as the
  full-page app-level error boundary — it does not create a second `<h1>` alongside a page's
  own heading.

## Changed this round

- **New pages** (`GCC`, `AI`, `Privacy`, `Terms`) follow the same `PageHeader`/`Seo` pattern as
  every existing page, so they inherit the breadcrumb nav, single-`<h1>`, and skip-link
  behaviour automatically.
- **Evidence filter tabs**: `role="tablist"`/`role="tab"`/`aria-selected` were already present
  and are retained; the underlying filter bug (see CHANGELOG) is fixed, so keyboard/screen-reader
  users now get an experience that actually matches the announced `aria-selected` state (previously
  it silently lied — the DOM said one tab was selected while showing all results).
- **Evidence "What this proves"**: implemented as a real `<button aria-expanded>` disclosure,
  not a hover-only reveal, so it's keyboard- and screen-reader-operable.
- **Reveal widget**: gained an `id` prop (used for the Advisory page's capability anchors) —
  purely additive, no behaviour change for existing callers.

## Not yet done / needs a real audit pass

- [ ] No automated contrast check was run against the new Ink (`#16132B`) dark background
      combined with existing `--muted`/`--line` tokens in dark mode — spot-check text contrast
      on the darker background, particularly `text-muted` on `bg-sunk` in dark theme.
- [ ] No screen-reader walkthrough (VoiceOver/NVDA) was performed on the new pages.
- [ ] The mobile hamburger menu's focus trap (does focus stay inside the open mobile sheet?)
      was not specifically re-tested this round.
- [ ] Accordion component (`widgets/Accordion`, used for FAQs) was not re-audited for native
      semantics vs. this round's changes — it was not touched, so risk is low, but it wasn't
      independently re-verified either.
