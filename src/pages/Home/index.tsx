import { CtaBand } from '@/widgets/CtaBand'
import { paths } from '@/routes/paths'
import { personJsonLd, Seo } from '@/widgets/Seo'
import { HomeCredibility } from '@/pages/Home/Credibility'
import { HomeEngagements } from '@/pages/Home/Engagements'
import { HomeFramework } from '@/pages/Home/Framework'
import { HomeHealthCheckTeaser } from '@/pages/Home/HealthCheckTeaser'
import { HomeHero } from '@/pages/Home/Hero'
import { HomeModes } from '@/pages/Home/Modes'
import { HomePersonas } from '@/pages/Home/Personas'
import { HomeProblems } from '@/pages/Home/Problems'
import { HomeProof } from '@/pages/Home/Proof'
import { HomeThesis } from '@/pages/Home/Thesis'

export function HomePage() {
  return (
    <>
      <Seo path="/" jsonLd={personJsonLd} />
      <HomeHero />
      <HomeCredibility />
      <HomeProblems />
      <HomePersonas />
      <HomeThesis />
      <HomeFramework />
      <HomeEngagements />
      <HomeHealthCheckTeaser />
      <HomeModes />
      <HomeProof />
      <CtaBand
        eyebrow="The first conversation"
        title="Tell me where the promise is at risk."
        copy="Share the situation, the decision you need to make and the time pressure. I’ll suggest a useful first step and where my experience fits."
        secondaryLabel="Run the health check"
        secondaryTo={paths.healthCheck}
      />
    </>
  )
}
