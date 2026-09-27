# Claims Verification

Every factual public claim currently on the site, where it appears, what evidence exists in
the repo for it, and whether it needs founder confirmation. No claim was added, removed or
strengthened in this round beyond making the currency explicit on the homepage stat (see
below) and adding the `whatThisProves` framing, which restates existing facts, not new ones.

| Claim | Where | Evidence in repo | Confidence | Needs confirmation? | Notes |
|---|---|---|---|---|---|
| 21+ years in delivery and consulting | Home, About, hero | `career` timeline (2005–present, 3 employers) sums to 21+ years from 2005 | High | No | Arithmetic checks out against the listed dates |
| ~550 FTE managed services program governed | Home stat, Evidence, `the-delivery-office`, GCC page | `pgo-transition` evidence case, `the-delivery-office` basis | Medium | **Yes** | Repeated consistently across the site; no source document in the repo to verify the exact number — please confirm |
| ~US$20M transformation recovered/restarted | Home stat, Evidence (`billing-recovery`) | Evidence case explicitly states "approximately US$20 million" | Medium | **Yes** | Currency was already explicit as USD on the Evidence page; the homepage stat previously showed a bare "$" — now made explicit as "US$" to match. Please confirm USD is correct (not AUD, given the Australian context) |
| 5 markets delivered across | Home stat | `site.markets` = India, Australia, New Zealand, UK, Philippines | High | No | Matches the career timeline and case studies exactly |
| ~400-FTE Test CoE transition (Philippines), go-live in ~4 months | Evidence, GCC page | `pgo-transition` case | Medium | **Yes** | No source document; please confirm the FTE count and timeline |
| ~80,000 source files (knowledge assistant) | Evidence, AI page | `knowledge-assistant` case | Medium | **Yes** | Please confirm this figure is still accurate/current |
| ~65% → ~95% SLA compliance | Evidence, `process-to-platform` basis | `certification-automation` case | Medium | **Yes** | Reported figures, not independently audited — worded as "reported" throughout, which is accurate hedging |
| ~150 certification jobs/day | Evidence | `certification-automation` case | Medium | No | Consistent with the SLA case above |
| Bid pace ~1–2 → ~10 managed-services opportunities/year | Evidence, capability copy | `managed-services-practice` case | Medium | **Yes** | "Reported" — please confirm this is still the right order of magnitude |
| ~US$800,000 generator portal project; ~US$500,000 follow-ons | Evidence | `generator-portal` case | Medium | **Yes** | Currency already explicit as USD |
| ~3,000 generators / ~50,000 tower sites | Evidence | `generator-portal` case | Medium | No | Internally consistent with the case narrative |
| 1 → 4 concurrent programs (account growth) | Evidence | `account-leadership` case | Medium | No | Directional claim, not a hard figure |
| Education: GMP (IIM Bangalore), Bachelor's (Shivaji University), ITIL V3 Foundation, eTOM, Six Sigma Yellow Belt, CSPO, UiPath (RPA) | About | `credentials.education` | Medium | **Yes** | Standard practice to re-verify certification currency/validity before publishing a redesigned site |
| Career dates: Infosys 2005–2011, Tech Mahindra 2011–2021, Cleverex Technology 2021–present | About | `career` | High | No | Internally consistent, no gaps or overlaps |
| "AI Without the Jargon" — title, subtitle, description | Insights | `guide` object | Low | **Yes** | No page count, edition or purchase URL is published (correctly, per the brief — no dead button). Confirm current title/subtitle before this is ever linked externally |
| 3 LinkedIn recommendations (Bakshi, Sriramagiri, Jain) | About | `testimonials` | High | No | Quoted verbatim, not strengthened; used as-is |

## Currency flags

Two figures were already explicit as USD in the source (`billing-recovery`: "approximately
US$20 million"; `generator-portal`: "Approximately US$800,000"). The only ambiguity found was
the **homepage stat card**, which showed a bare "~$20M" — now changed to "~US$20M" to match.
No other currency symbol was silently assumed or converted.

## What this round did NOT do

- Did not invent, round differently, or strengthen any number.
- Did not add a "What this proves" claim that isn't a direct restatement of the case's
  existing `lead`/`facts`/`basis` text.
- Did not claim the GCC or PGO/CoE-transition evidence was a formal GCC consulting engagement
  — every reference uses "experience behind the proposition."
