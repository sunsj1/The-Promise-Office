import { site } from '@/data/site'
import { paths } from '@/routes/paths'
import { LegalLayout } from '@/widgets/LegalLayout'
import { PageHeader } from '@/widgets/PageHeader'
import { Seo } from '@/widgets/Seo'

export function TermsPage() {
  return (
    <>
      <Seo
        title="Terms"
        description="Website terms and disclaimer for The Promise Office."
        path={paths.terms}
        breadcrumb="Terms"
      />

      <PageHeader breadcrumb="Terms" eyebrow="Legal" title="Website terms & disclaimer." />

      <LegalLayout
        other="privacy"
        sections={[
          {
            id: 'about-this-practice',
            title: 'About this practice',
            body: (
              <>
                {site.brand} is an independent advisory practice founded by {site.person}. Nothing
                on this site should be read as implying a specific legal entity, partnership or
                corporate structure beyond what is stated here.
              </>
            ),
          },
          {
            id: 'not-advice-until-agreed-in-writing',
            title: 'Not advice until agreed in writing',
            body: (
              <>
                Content on this site — including the Delivery Health Check, engagement descriptions
                and Promise Notes — is general in nature. It does not constitute legal, financial,
                tax or regulatory advice, and no advisory relationship exists until scope, fees and
                terms are agreed in writing.
              </>
            ),
          },
          {
            id: 'evidence-and-prior-work',
            title: 'Evidence and prior work',
            body: (
              <>
                Case studies, career history and organisation references describe prior employment
                or client-delivery roles. They do not describe contracts held by, or staff of, this
                independent practice, and do not imply that those organisations endorse it. Figures
                are rounded where noted and relate to specific historical engagements; results in
                any new engagement depend on its own context.
              </>
            ),
          },
          {
            id: 'third-party-services',
            title: 'Third-party services',
            body: (
              <>
                Booking is handled by Cal.com, a third-party service, under its own terms. This site
                is not responsible for the availability or content of external sites it links to.
              </>
            ),
          },
          {
            id: 'intellectual-property',
            title: 'Intellectual property',
            body: (
              <>
                The Promise Office name, mark and site content belong to {site.brand}, founded by{' '}
                {site.person}. Organisation names and marks referenced elsewhere on this site belong
                to their respective owners.
              </>
            ),
          },
          {
            id: 'contact',
            title: 'Contact',
            body: <>Questions about these terms can be sent to {site.email}.</>,
          },
        ]}
      />
    </>
  )
}
