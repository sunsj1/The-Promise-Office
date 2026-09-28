import { site } from '@/data/site'
import { paths } from '@/routes/paths'
import { Container } from '@/widgets/Container'
import { PageHeader } from '@/widgets/PageHeader'
import { Reveal } from '@/widgets/Reveal'
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

      <PageHeader
        breadcrumb="Terms"
        eyebrow="Legal"
        title="Website terms & disclaimer."
      />

      <section className="py-16 lg:py-20">
        <Container size="prose">
          <Reveal className="space-y-8 text-[1.0125rem] leading-relaxed">
            <div>
              <h2 className="font-display text-xl">About this practice</h2>
              <p className="mt-3 text-muted">
                {site.brand} is the independent advisory practice of {site.person}. Nothing on this
                site should be read as implying a specific legal entity, partnership or corporate
                structure beyond what is stated here.
              </p>
            </div>
            <div>
              <h2 className="font-display text-xl">Not advice until agreed in writing</h2>
              <p className="mt-3 text-muted">
                Content on this site — including the Delivery Health Check, engagement descriptions
                and Promise Notes — is general in nature. It does not constitute legal, financial,
                tax or regulatory advice, and no advisory relationship exists until scope, fees and
                terms are agreed in writing.
              </p>
            </div>
            <div>
              <h2 className="font-display text-xl">Evidence and prior work</h2>
              <p className="mt-3 text-muted">
                Case studies, career history and organisation references describe prior employment or
                client-delivery roles. They do not describe contracts held by, or staff of, this
                independent practice, and do not imply that those organisations endorse it. Figures
                are rounded where noted and relate to specific historical engagements; results in any
                new engagement depend on its own context.
              </p>
            </div>
            <div>
              <h2 className="font-display text-xl">Third-party services</h2>
              <p className="mt-3 text-muted">
                Booking is handled by Cal.com, a third-party service, under its own terms. This site
                is not responsible for the availability or content of external sites it links to.
              </p>
            </div>
            <div>
              <h2 className="font-display text-xl">Intellectual property</h2>
              <p className="mt-3 text-muted">
                The Promise Office name, mark and site content belong to {site.person}. Organisation
                names and marks referenced elsewhere on this site belong to their respective owners.
              </p>
            </div>
            <div>
              <h2 className="font-display text-xl">Contact</h2>
              <p className="mt-3 text-muted">Questions about these terms can be sent to {site.email}.</p>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  )
}
