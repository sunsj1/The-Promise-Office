import { Container } from '@/widgets/Container'
import { ProcessTimeline } from '@/widgets/ProcessTimeline'

export function HomeFramework() {
  return (
    <section className="border-t border-line py-14 lg:py-20">
      <Container size="wide">
        <ProcessTimeline />
      </Container>
    </section>
  )
}
