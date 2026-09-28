import { CtaBand } from '@/widgets/CtaBand'
import { paths } from '@/routes/paths'
import { personJsonLd, Seo } from '@/widgets/Seo'
import { HomeCapabilities } from '@/pages/Home/Capabilities'
import { HomeEngagements } from '@/pages/Home/Engagements'
import { HomeFramework } from '@/pages/Home/Framework'
import { HomeGccAiSpotlight } from '@/pages/Home/GccAiSpotlight'
import { HomeHealthCheckTeaser } from '@/pages/Home/HealthCheckTeaser'
import { HomeHero } from '@/pages/Home/Hero'
import { HomePersonas } from '@/pages/Home/Personas'
import { HomePractices } from '@/pages/Home/Practices'
import { HomeProof } from '@/pages/Home/Proof'
import { HomePromiseLens } from '@/pages/Home/PromiseLens'
import { HomeThesis } from '@/pages/Home/Thesis'

export function HomePage() {
  return (
    <>
      <Seo path="/" jsonLd={personJsonLd} />
      <HomeHero />
      <HomePractices />
      <HomePersonas />
      <HomeThesis />
      <HomePromiseLens />
      <HomeCapabilities />
      <HomeFramework />
      <HomeEngagements />
      <HomeGccAiSpotlight />
      <HomeHealthCheckTeaser />
      <HomeProof />
      <CtaBand
        eyebrow="The first conversation"
        title="Tell us where the promise is at risk."
        copy="Share the situation, the decision you need to make and the time pressure. We’ll suggest a useful first step and where our experience fits."
        secondaryLabel="Run the health check"
        secondaryTo={paths.healthCheck}
      />
    </>
  )
}
