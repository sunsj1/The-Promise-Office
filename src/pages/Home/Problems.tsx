import { ProblemChooser } from '@/widgets/ProblemChooser'
import { Container } from '@/widgets/Container'
import { SectionHeader } from '@/widgets/SectionHeader'

export function HomeProblems() {
  return (
    <section className="py-20 lg:py-28">
      <Container size="wide">
        <SectionHeader
          eyebrow="Choose the first problem"
          title="What’s at risk?"
          copy="Busy leaders do not browse a catalogue. Tap the situation that is already in the room. Each path opens a mandate with a defined entry problem and a concrete output."
        />
        <div className="mt-12">
          <ProblemChooser />
        </div>
      </Container>
    </section>
  )
}
