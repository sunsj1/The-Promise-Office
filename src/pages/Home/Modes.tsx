import { Container } from '@/widgets/Container'
import { OrbitalModes } from '@/widgets/OrbitalModes'
import { SectionHeader } from '@/widgets/SectionHeader'

export function HomeModes() {
  return (
    <section className="relative isolate overflow-hidden bg-[#100d1e] py-20 text-[#eeebf6] lg:py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            'radial-gradient(50% 45% at 50% 42%, rgba(109,75,176,0.22), transparent 62%)',
        }}
      />
      <Container size="wide">
        <SectionHeader
          eyebrow="Ways I work with leadership"
          title="An independent view. Then a practical hand on the wheel."
          copy="Four modes. One practice. Select a node to see how the work enters."
          align="center"
          className="[&_p]:text-[#c9c3dc] [&_.text-muted]:text-[#a39db9]"
        />
        <div className="mt-8">
          <OrbitalModes />
        </div>
      </Container>
    </section>
  )
}
