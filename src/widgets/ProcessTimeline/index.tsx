import { motion } from 'framer-motion'
import { framework } from '@/data/problems'
import { fadeUp } from '@/animations/variants'
import { RevealGroup } from '@/widgets/Reveal'

/*
  Vertical rhythm: number on the rail, card on the right. Executives can
  scan four steps in under ten seconds.
*/
export function ProcessTimeline() {
  return (
    <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
      <div className="lg:col-span-4 lg:sticky lg:top-28 lg:self-start">
        <p className="font-mono text-[0.75rem] tracking-[0.18em] text-amber uppercase">
          Delivery framework
        </p>
        <h2 className="mt-4 text-3xl sm:text-4xl lg:text-[2.75rem]">
          A delivery rhythm your team can follow.
        </h2>
        <p className="mt-5 max-w-md text-[1.02rem] text-muted">
          A clear sequence keeps the decision, the operating design, the ownership and the handover
          connected. Which step leads depends on the brief.
        </p>
      </div>

      <RevealGroup className="relative lg:col-span-8">
        <span
          aria-hidden
          className="absolute top-3 bottom-3 left-[1.15rem] w-px bg-line lg:left-[1.35rem]"
        />
        <ol className="space-y-4">
          {framework.map((step) => (
            <motion.li key={step.title} variants={fadeUp} className="relative pl-14 lg:pl-16">
              <span className="absolute top-6 left-0 grid h-9 w-9 place-items-center rounded-full border border-line bg-paper font-mono text-[0.75rem] text-ink">
                {step.index}
              </span>
              <article className="rounded-2xl border border-line bg-surface px-6 py-6 sm:px-8 sm:py-7">
                <p className="font-mono text-[0.75rem] tracking-[0.16em] text-amber uppercase">
                  {step.title}
                </p>
                <h3 className="mt-2 font-display text-2xl">{step.lead}</h3>
                <p className="mt-3 text-[0.97rem] text-muted">{step.copy}</p>
              </article>
            </motion.li>
          ))}
        </ol>
      </RevealGroup>
    </div>
  )
}
