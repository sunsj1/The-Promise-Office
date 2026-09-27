import { Container } from '@/widgets/Container'
import { OrbitalModes } from '@/widgets/OrbitalModes'
import { SectionHeader } from '@/widgets/SectionHeader'

export function HomeModes() {
  return (
    <section className="relative isolate overflow-hidden bg-night py-20 text-cream lg:py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            'radial-gradient(50% 45% at 50% 42%, rgba(240,180,60,0.14), transparent 62%), radial-gradient(60% 50% at 90% 90%, rgba(75,46,131,0.3), transparent 65%)',
        }}
      />
      <Container size="wide">
        <SectionHeader
          eyebrow="Ways I work with leadership"
          title="An independent view. Then a practical hand on the wheel."
          copy="Four modes. One practice. Select a node to see how the work enters."
          align="center"
          className="[&_p]:text-[#a39e93] [&_.text-muted]:text-[#a39e93]"
        />
        <div className="mt-8">
          <OrbitalModes />
        </div>
      </Container>
    </section>
  )
}
