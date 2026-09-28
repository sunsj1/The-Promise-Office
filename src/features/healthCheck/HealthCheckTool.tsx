import { AnimatePresence, motion } from 'framer-motion'
import { ArrowLeft, Check, ChevronDown, ClipboardCopy, Mail, RotateCcw } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { orientationQuestions } from '@/data/diagnostic'
import { site } from '@/data/site'
import {
  applyAnswer,
  computeResult,
  createInitialState,
  getNextQuestion,
  getPhaseLabel,
  progressCount,
  simpleReadingLabel,
  type DiagnosticResult,
  type EngineState,
} from '@/lib/diagnosticEngine'
import { sealEase } from '@/animations/variants'
import { ActionButton, LinkButton } from '@/widgets/Button'
import { cn } from '@/lib/cn'

/** History of {state, question} so "Previous" can step back through an adaptive path. */
type HistoryEntry = { state: EngineState; questionId: string }

const confidenceCopy: Record<DiagnosticResult['promiseConfidence'], string> = {
  Exposed:
    'Several signals point the same way. An independent reading of what is true would be the fastest route to a plan.',
  Developing: 'A real constraint has emerged, alongside areas that are working well enough to leave alone.',
  Controlled: 'Nothing here looks urgent, though coverage of this assessment was limited — worth revisiting with more context.',
  'Confidence Zone':
    'Enough clarity, control and ownership to make and keep an important commitment without disproportionate risk.',
}

export function HealthCheckTool() {
  const [state, setState] = useState<EngineState>(() => createInitialState())
  const [history, setHistory] = useState<HistoryEntry[]>([])
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [copied, setCopied] = useState(false)
  const [detailOpen, setDetailOpen] = useState(false)

  const currentQuestion = getNextQuestion(state)
  const finished = !currentQuestion && state.askedIds.length > orientationQuestions.length
  const { answered } = progressCount(state)
  const inOrientation = !!currentQuestion && currentQuestion.track === 'orientation'
  const phase = getPhaseLabel(state, currentQuestion)

  const result = useMemo(() => (finished ? computeResult(state) : null), [finished, state])

  const choose = (optionIndex: number) => {
    if (!currentQuestion) return
    if (state.askedIds.includes(currentQuestion.id)) return
    setHistory((h) => [...h, { state, questionId: currentQuestion.id }])
    setState((prev) => applyAnswer(prev, currentQuestion, optionIndex))
  }

  const goBack = () => {
    setHistory((h) => {
      if (h.length === 0) return h
      const last = h[h.length - 1]
      setState(last.state)
      return h.slice(0, -1)
    })
  }

  const restart = () => {
    setState(createInitialState())
    setHistory([])
    setCopied(false)
    setDetailOpen(false)
  }

  const briefText = useMemo(() => {
    if (!result) return ''
    return [
      'Hi Rishi,',
      '',
      'I ran the Delivery Health Check.',
      '',
      `Name: ${name.trim() || '—'}`,
      `Email: ${email.trim() || '—'}`,
      `Main issue: ${result.heroStatement}`,
      `Primary constraint: ${result.primaryConstraint?.label ?? 'Not clearly separated yet'}`,
      `Promise Confidence: ${result.promiseConfidence}`,
      '',
      'Happy to walk through the context on a call.',
    ].join('\n')
  }, [result, name, email])

  const copyBrief = async () => {
    try {
      await navigator.clipboard.writeText(briefText)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2200)
    } catch {
      setCopied(false)
    }
  }

  const mailtoHref = result
    ? `mailto:${site.email}?subject=${encodeURIComponent(
        `My Delivery Health Check results — ${result.heroStatement}`,
      )}&body=${encodeURIComponent(briefText)}`
    : '#'

  return (
    <div className="rounded-3xl border border-line bg-surface p-6 sm:p-9 lg:p-11">
      {!finished ? (
        <div>
          <div className="flex items-center justify-between gap-6">
            <div className="h-1 flex-1 overflow-hidden rounded-full bg-line">
              <motion.div
                className="h-full rounded-full bg-amber"
                animate={{ width: `${Math.min((answered / 12) * 100, 96)}%` }}
                transition={{ duration: 0.3, ease: sealEase }}
              />
            </div>
            <p className="shrink-0 font-mono text-[0.7rem] tracking-[0.12em] text-muted uppercase">
              {inOrientation ? 'Orientation' : `Question ${answered + 1}`}
            </p>
          </div>
          <p className="mt-3 font-mono text-[0.66rem] tracking-[0.1em] text-muted uppercase">
            {phase} · Usually 8–15 questions · about 5 minutes
          </p>
        </div>
      ) : null}

      <div className="mt-8">
        <AnimatePresence mode="wait">
          {!finished && currentQuestion ? (
            <motion.div
              key={currentQuestion.id}
              initial={{ opacity: 0, x: 18 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -18 }}
              transition={{ duration: 0.3, ease: sealEase }}
              className="mx-auto max-w-xl"
            >
              <p className="font-mono text-[0.7rem] tracking-[0.16em] text-amber uppercase">
                {inOrientation ? 'Getting oriented' : 'Diagnostic'}
              </p>
              <h3 className="mt-3 text-2xl sm:text-[1.75rem]">{currentQuestion.text}</h3>

              <ul className="mt-7 space-y-2.5">
                {currentQuestion.options.map((option, optionIndex) => (
                  <li key={option.label}>
                    <button
                      type="button"
                      onClick={() => choose(optionIndex)}
                      className="w-full rounded-xl border border-line bg-sunk px-5 py-4 text-left text-[0.97rem] transition-all duration-200 hover:border-amber hover:bg-surface"
                    >
                      {option.label}
                    </button>
                  </li>
                ))}
              </ul>

              {history.length > 0 ? (
                <button
                  type="button"
                  onClick={goBack}
                  className="mt-6 inline-flex items-center gap-2 font-mono text-[0.72rem] tracking-[0.12em] text-muted uppercase transition-colors hover:text-amber"
                >
                  <ArrowLeft size={13} aria-hidden /> Previous
                </button>
              ) : null}
            </motion.div>
          ) : result ? (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: sealEase }}
              className="mx-auto max-w-2xl"
            >
              {/* YOUR ASSESSMENT */}
              <p className="font-mono text-[0.7rem] tracking-[0.16em] text-amber uppercase">
                Your assessment
              </p>
              <h3 className="mt-3 text-2xl sm:text-[1.9rem] leading-snug">{result.heroStatement}</h3>
              <p className="mt-3 text-[0.95rem] text-muted italic">“{result.pattern}”</p>

              {/* AT A GLANCE */}
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <div className="rounded-xl border border-amber/30 bg-amber/5 p-5">
                  <p className="font-mono text-[0.64rem] tracking-[0.14em] text-amber uppercase">
                    Primary issue
                  </p>
                  <p className="mt-1.5 font-display text-lg">
                    {result.primaryConstraint?.label ?? 'No single dominant issue'}
                  </p>
                </div>
                <div className="rounded-xl border border-line bg-sunk p-5">
                  <p className="font-mono text-[0.64rem] tracking-[0.14em] text-muted uppercase">
                    What is working
                  </p>
                  <p className="mt-1.5 font-display text-lg">
                    {result.strengthToPreserve?.label ?? 'Not yet clearly established'}
                  </p>
                </div>
                <div className="rounded-xl border border-line bg-sunk p-5">
                  <p className="font-mono text-[0.64rem] tracking-[0.14em] text-muted uppercase">
                    Diagnostic confidence
                  </p>
                  <p className="mt-1.5 font-display text-lg">{result.diagnosticConfidence.band}</p>
                </div>
                <div className="rounded-xl border border-line bg-sunk p-5">
                  <p className="font-mono text-[0.64rem] tracking-[0.14em] text-muted uppercase">
                    Current position
                  </p>
                  <p className="mt-1.5 font-display text-lg">{result.promiseConfidence}</p>
                </div>
              </div>
              <p className="mt-3 text-[0.88rem] text-muted">{confidenceCopy[result.promiseConfidence]}</p>

              {/* WHY WE THINK THIS */}
              {result.whyWeThinkThis.length ? (
                <div className="mt-9 border-t border-line pt-7">
                  <p className="font-mono text-[0.66rem] tracking-[0.14em] text-muted uppercase">
                    Why we think this
                  </p>
                  <ul className="mt-4 space-y-2.5">
                    {result.whyWeThinkThis.map((note) => (
                      <li key={note} className="flex gap-3 text-[0.97rem]">
                        <span aria-hidden className="mt-2 h-1 w-1 shrink-0 rounded-full bg-amber" />
                        {note}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}

              {/* WHERE THE PRESSURE SITS */}
              {result.materialReadings.length ? (
                <div className="mt-7 border-t border-line pt-7">
                  <p className="font-mono text-[0.66rem] tracking-[0.14em] text-muted uppercase">
                    Where the pressure sits
                  </p>
                  <dl className="mt-4 space-y-3">
                    {result.materialReadings.map((reading) => {
                      const band = simpleReadingLabel(reading)
                      return (
                        <div key={reading.track} className="flex items-center justify-between gap-4">
                          <dt className="text-[0.93rem]">{reading.label}</dt>
                          <dd
                            className={cn(
                              'shrink-0 rounded-full px-2.5 py-0.5 font-mono text-[0.64rem] tracking-[0.08em] uppercase',
                              band.tone === 'exposure' && 'bg-amber/10 text-amber',
                              band.tone === 'solid' && 'bg-plum/10 text-plum',
                            )}
                          >
                            {band.text}
                          </dd>
                        </div>
                      )
                    })}
                  </dl>
                </div>
              ) : null}

              {/* WHAT THIS CAN LEAD TO */}
              {result.consequences.length ? (
                <div className="mt-7 border-t border-line pt-7">
                  <p className="font-mono text-[0.66rem] tracking-[0.14em] text-muted uppercase">
                    What this can lead to
                  </p>
                  <div className="mt-4 space-y-4">
                    {result.consequences.map((c) => (
                      <div key={c.title}>
                        <p className="font-display text-base">{c.title}</p>
                        <p className="mt-1 text-[0.9rem] text-muted">{c.body}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}

              {/* PATH TO THE CONFIDENCE ZONE */}
              {result.pathToConfidenceZone ? (
                <div className="mt-7 rounded-2xl border border-line bg-sunk p-6">
                  <p className="font-mono text-[0.66rem] tracking-[0.14em] text-muted uppercase">
                    Path to the Confidence Zone
                  </p>
                  <div className="mt-4 space-y-4">
                    <div>
                      <p className="font-mono text-[0.6rem] tracking-[0.12em] text-muted uppercase">
                        Current position
                      </p>
                      <p className="mt-1 text-[0.93rem]">{result.pathToConfidenceZone.currentPosition}</p>
                    </div>
                    <div className="text-amber" aria-hidden>
                      ↓
                    </div>
                    <div>
                      <p className="font-mono text-[0.6rem] tracking-[0.12em] text-muted uppercase">
                        Priority interventions
                      </p>
                      <ul className="mt-1.5 space-y-1.5">
                        {result.pathToConfidenceZone.interventions.map((item) => (
                          <li key={item} className="flex gap-2.5 text-[0.93rem]">
                            <Check size={14} className="mt-1 shrink-0 text-amber" aria-hidden />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="text-amber" aria-hidden>
                      ↓
                    </div>
                    <div>
                      <p className="font-mono text-[0.6rem] tracking-[0.12em] text-amber uppercase">
                        Confidence Zone
                      </p>
                      <p className="mt-1 text-[0.93rem]">{result.pathToConfidenceZone.confidenceZone}</p>
                    </div>
                  </div>
                </div>
              ) : null}

              {/* ONE QUESTION */}
              <div className="mt-8 rounded-2xl border border-amber/30 bg-amber/5 p-6">
                <p className="font-mono text-[0.68rem] tracking-[0.16em] text-amber uppercase">
                  One question worth taking back to your team
                </p>
                <p className="mt-2.5 font-display text-xl leading-snug">{result.oneQuestionBack}</p>
              </div>

              {/* WHAT WE WOULD EXAMINE NEXT + SUPPORT */}
              {result.examineNext.length ? (
                <div className="mt-7 border-t border-line pt-7">
                  <p className="font-mono text-[0.66rem] tracking-[0.14em] text-muted uppercase">
                    What we would examine next
                  </p>
                  <ul className="mt-2.5 space-y-1.5">
                    {result.examineNext.map((item) => (
                      <li key={item} className="flex gap-2.5 text-[0.93rem]">
                        <Check size={14} className="mt-1 shrink-0 text-amber" aria-hidden />
                        {item}
                      </li>
                    ))}
                  </ul>
                  {result.relevantSupport.length ? (
                    <div className="mt-5 flex flex-wrap gap-2">
                      <p className="w-full font-mono text-[0.64rem] tracking-[0.12em] text-muted uppercase">
                        Relevant Promise Office support
                      </p>
                      {result.relevantSupport.map((s) => (
                        <Link
                          key={s.to}
                          to={s.to}
                          className="rounded-full border border-line bg-surface px-3.5 py-1.5 font-mono text-[0.66rem] tracking-[0.1em] text-muted uppercase transition-colors hover:border-amber hover:text-amber"
                        >
                          {s.label}
                        </Link>
                      ))}
                    </div>
                  ) : null}
                </div>
              ) : null}

              {/* EXPLORE THE DETAILED DIAGNOSTIC */}
              <div className="mt-7 border-t border-line pt-5">
                <button
                  type="button"
                  onClick={() => setDetailOpen((v) => !v)}
                  aria-expanded={detailOpen}
                  className="flex w-full items-center justify-between gap-2 font-mono text-[0.68rem] tracking-[0.12em] text-muted uppercase transition-colors hover:text-amber"
                >
                  Explore the detailed diagnostic
                  <ChevronDown
                    size={14}
                    aria-hidden
                    className={cn('transition-transform duration-300', detailOpen && 'rotate-180')}
                  />
                </button>
                {detailOpen ? (
                  <div className="mt-6 space-y-6">
                    <div>
                      <p className="font-mono text-[0.62rem] tracking-[0.14em] text-muted uppercase">
                        Core diagnostic readings
                      </p>
                      <dl className="mt-3 space-y-2.5">
                        {result.coreReadings.map((reading) => {
                          const band = simpleReadingLabel(reading)
                          return (
                            <div key={reading.track} className="flex items-center justify-between gap-4">
                              <dt className="text-[0.88rem] text-muted">{reading.label}</dt>
                              <dd className="shrink-0 font-mono text-[0.62rem] tracking-[0.08em] text-muted uppercase">
                                {band.text}
                              </dd>
                            </div>
                          )
                        })}
                      </dl>
                    </div>
                    {[...result.crossCutting, ...result.domainSignals].length ? (
                      <div>
                        <p className="font-mono text-[0.62rem] tracking-[0.14em] text-muted uppercase">
                          Cross-cutting & domain signals
                        </p>
                        <dl className="mt-3 space-y-2.5">
                          {[...result.crossCutting, ...result.domainSignals].map((reading) => {
                            const band = simpleReadingLabel(reading)
                            return (
                              <div key={reading.track} className="flex items-center justify-between gap-4">
                                <dt className="text-[0.88rem] text-muted">{reading.label}</dt>
                                <dd className="shrink-0 font-mono text-[0.62rem] tracking-[0.08em] text-muted uppercase">
                                  {band.text}
                                </dd>
                              </div>
                            )
                          })}
                        </dl>
                      </div>
                    ) : null}
                    <p className="text-[0.85rem] text-muted">{result.diagnosticConfidence.note}</p>
                  </div>
                ) : null}
              </div>

              {/* Hand-off: prepares an email, stores nothing. */}
              <div className="mt-8 rounded-2xl bg-sunk p-6">
                <p className="font-display text-lg">Send this reading to Rishi</p>
                <p className="mt-1.5 text-[0.93rem] text-muted">
                  Add your details and we will prepare an email for you to review and send. Nothing is
                  stored or submitted by this site — your answers stay in this browser tab only.
                </p>
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  <input
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    placeholder="Your name"
                    aria-label="Your name"
                    className="rounded-xl border border-line bg-surface px-4 py-3 text-[0.95rem] outline-none transition-colors focus:border-amber"
                  />
                  <input
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    type="email"
                    placeholder="Your email"
                    aria-label="Your email"
                    className="rounded-xl border border-line bg-surface px-4 py-3 text-[0.95rem] outline-none transition-colors focus:border-amber"
                  />
                </div>
                <div className="mt-4 flex flex-wrap gap-2.5">
                  <LinkButton to={mailtoHref} external variant="amber" arrow={false}>
                    <span className="inline-flex items-center gap-2">
                      <Mail size={15} aria-hidden /> Open email app
                    </span>
                  </LinkButton>
                  <ActionButton onClick={copyBrief} variant="outline">
                    <span className="inline-flex items-center gap-2">
                      {copied ? <Check size={15} aria-hidden /> : <ClipboardCopy size={15} aria-hidden />}
                      {copied ? 'Copied' : 'Copy brief'}
                    </span>
                  </ActionButton>
                  <ActionButton onClick={restart} variant="ghost">
                    <span className="inline-flex items-center gap-2">
                      <RotateCcw size={14} aria-hidden /> Start again
                    </span>
                  </ActionButton>
                </div>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </div>
  )
}
