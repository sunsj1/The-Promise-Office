import { atlasPicker } from '@/data/pagePickers'
import { PagePicker } from '@/widgets/Graphics/PagePicker'
import { AtlasEmbed } from '@/features/atlas/AtlasEmbed'
import { paths } from '@/routes/paths'
import { Container } from '@/widgets/Container'
import { CtaBand } from '@/widgets/CtaBand'
import { PageHeader } from '@/widgets/PageHeader'
import { Reveal } from '@/widgets/Reveal'
import { Seo } from '@/widgets/Seo'

export function AtlasPage() {
  return (
    <>
      <Seo
        title="The Living IT Atlas"
        description="An interactive map of 328 IT technologies across the five stages of delivery, with end-to-end journeys and role roadmaps for planning how an idea becomes a running service."
        path={paths.atlas}
        breadcrumb="Atlas"
      />

      <PageHeader
        points={['328 technologies', 'Five stages', 'Journeys and roadmaps']}
        graphic={<PagePicker config={atlasPicker} />}
        breadcrumb="Atlas"
        eyebrow="Technology map"
        title="The Living IT Atlas: how an idea becomes a running service."
        copy="328 technologies on one map, laid out as the five stages of delivery. Open any category, follow an end-to-end journey, or describe your own and see the path drawn."
      />

      <section className="py-10 lg:py-14">
        <Container size="wide">
          <Reveal>
            <div className="overflow-hidden rounded-3xl border border-line bg-night text-cream">
              <AtlasEmbed />
            </div>
            <p className="mt-5 max-w-2xl font-mono text-[0.68rem] leading-relaxed tracking-[0.08em] text-muted">
              A classification for exploring the landscape, not a ranking or a recommendation.
              Product names belong to their respective owners.
            </p>
          </Reveal>
        </Container>
      </section>

      <CtaBand
        eyebrow="From map to plan"
        title="Know the tools. Need the path?"
        copy="Technology choices are the easy part. Tell us what you are trying to deliver and we will show you where programs like it usually go wrong, and what to decide first."
        secondaryLabel="Run the health check"
        secondaryTo={paths.healthCheck}
      />
    </>
  )
}
