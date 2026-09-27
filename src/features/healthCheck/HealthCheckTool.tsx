import { AnimatePresence, motion } from 'framer-motion'
import { ArrowLeft, Check, ClipboardCopy, Mail, RotateCcw } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { orientationQuestions } from '@/data/diagnostic'
import { site } from '@/data/site'
import {
  applyAnswer,
  computeResult,
  createInitialState,
  getNextQuestion,
  progressCount,
  type DiagnosticResult,
  type EngineState,
  type TrackEvidence,
} from '@/lib/diagnosticEngine'
import { sealEase } from '@/animations/variants'
import { ActionButton, LinkButton } from '@/widgets/Button'
import { cn } from '@/lib/cn'

/** History of {state, question} so "Previous" can step back through an adaptive path. */
type HistoryEntry = { state: EngineState; questionId: string }

function readingBand(e: TrackEvidence): { text: string; tone: 'muted' | 'exposure' | 'solid' } {
  if (e.strength === 'none') return { text: 'Not assessed', tone: 'muted' }
  if (e.strength === 'limited') return { text: 'Limited signal', tone: 'muted' }
  if (e.direction === 'negative') {
    if (e.avg >= 1.3) return { text: 'Material exposure', tone: 'exposure' }
    if (e.avg >= 0.7) return { text: 'Exposure emerging', tone: 'exposure' }
    return { text: 'Worth watching', tone: 'exposure' }
  }
  if (e.direction === 'positive') return { text: e.avg <= -1.3 ? 'Clear strength' : 'Currently solid', tone: 'solid' }
  return { text: 'Mixed signal', tone: 'muted' }
}

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

  const currentQuestion = getNextQuestion(state)
  const finished = !currentQuestion && state.askedIds.length > orientationQuestions.length
  const { answered } = progressCount(state)
  const inOrientation = !!currentQuestion && currentQuestion.track === 'orientation'

  const result = useMemo(() => (finished ? computeResult(state) : null), [finished, state])

  const choose = (optionIndex: number) => {
    if (!currentQuestion) return
    // Guards against a double-click landing during the exit/enter transition,
    // which would otherwise re-submit the same question twice.
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
      `Advisory profile: ${result.pattern}`,
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
        `My Delivery Health Check results — ${result.pattern}`,
      )}&body=${encodeURIComponent(briefText)}`
    : '#'

  return (
    <div className="rounded-3xl border border-line bg-surface p-6 sm:p-9 lg:p-11">
      {!finished ? (
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
              <p className="font-mono text-[0.7rem] tracking-[0.16em] text-amber uppercase">
                Your advisory profile
              </p>
              <h3 className="mt-3 text-2xl sm:text-[1.9rem]">{result.pattern}</h3>
              <p className="mt-4 text-[0.97rem] text-muted">{result.interpretation}</p>

              {/* Primary / secondary / contributing */}
              <div className="mt-8 space-y-4">
                {result.primaryConstraint ? (
                  <div className="rounded-xl border border-amber/30 bg-amber/5 p-5">
                    <p className="font-mono text-[0.66rem] tracking-[0.14em] text-amber uppercase">
                      Primary constraint
                    </p>
                    <p className="mt-1.5 font-display text-lg">{result.primaryConstraint.label}</p>
                  </div>
                ) : null}
                {result.secondaryConstraint ? (
                  <div className="rounded-xl border border-line bg-sunk p-5">
                    <p className="font-mono text-[0.66rem] tracking-[0.14em] text-muted uppercase">
                      Secondary constraint
                    </p>
                    <p className="mt-1.5 font-display text-lg">{result.secondaryConstraint.label}</p>
                  </div>
                ) : null}
                {result.contributingConditions.length ? (
                  <div className="rounded-xl border border-line bg-sunk p-5">
                    <p className="font-mono text-[0.66rem] tracking-[0.14em] text-muted uppercase">
                      Contributing conditions
                    </p>
                    <ul className="mt-2 space-y-1">
                      {result.contributingConditions.map((c) => (
                        <li key={c.track} className="text-[0.93rem]">
                          {c.label}
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
                {result.strengthToPreserve ? (
                  <div className="rounded-xl border border-line bg-surface p-5">
                    <p className="font-mono text-[0.66rem] tracking-[0.14em] text-muted uppercase">
                      Strength to preserve
                    </p>
                    <p className="mt-1.5 text-[0.95rem]">
                      {result.strengthToPreserve.label} — positively tested, not just the absence of a problem.
                    </p>
                  </div>
                ) : null}
              </div>

              {/* Core readings */}
              <div className="mt-9 border-t border-line pt-7">
                <p className="font-mono text-[0.66rem] tracking-[0.14em] text-muted uppercase">
                  Core diagnostic readings
                </p>
                <dl className="mt-4 space-y-3">
                  {result.coreReadings.map((reading) => {
                    const band = readingBand(reading)
                    return (
                      <div key={reading.track} className="flex items-center justify-between gap-4">
                        <dt className="text-[0.93rem]">{reading.label}</dt>
                        <dd
                          className={cn(
                            'shrink-0 font-mono text-[0.68rem] tracking-[0.1em] uppercase',
                            band.tone === 'exposure' && 'text-amber',
                            band.tone === 'solid' && 'text-plum',
                            band.tone === 'muted' && 'text-muted',
                          )}
                        >
                          {band.text}
                        </dd>
                      </div>
                    )
                  })}
                </dl>
              </div>

              {/* Cross-cutting + domain */}
              {result.crossCutting.some((c) => c.strength !== 'none') || result.domainSignals.length ? (
                <div className="mt-7 border-t border-line pt-7">
                  <p className="font-mono text-[0.66rem] tracking-[0.14em] text-muted uppercase">
                    Cross-cutting & domain signals
                  </p>
                  <dl className="mt-4 space-y-3">
                    {[...result.crossCutting, ...result.domainSignals]
                      .filter((r) => r.strength !== 'none')
                      .map((reading) => {
                        const band = readingBand(reading)
                        return (
                          <div key={reading.track} className="flex items-center justify-between gap-4">
                            <dt className="text-[0.93rem]">{reading.label}</dt>
                            <dd
                              className={cn(
                                'shrink-0 font-mono text-[0.68rem] tracking-[0.1em] uppercase',
                                band.tone === 'exposure' && 'text-amber',
                                band.tone === 'solid' && 'text-plum',
                                band.tone === 'muted' && 'text-muted',
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

              {/* Promise Confidence + Diagnostic Confidence */}
              <div className="mt-7 grid gap-4 border-t border-line pt-7 sm:grid-cols-2">
                <div>
                  <p className="font-mono text-[0.66rem] tracking-[0.14em] text-muted uppercase">
                    Promise Confidence
                  </p>
                  <p className="mt-1.5 font-display text-xl">{result.promiseConfidence}</p>
                  <p className="mt-1.5 text-[0.85rem] text-muted">{confidenceCopy[result.promiseConfidence]}</p>
                </div>
                <div>
                  <p className="font-mono text-[0.66rem] tracking-[0.14em] text-muted uppercase">
                    Diagnostic confidence
                  </p>
                  <p className="mt-1.5 font-display text-xl">{result.diagnosticConfidence.band}</p>
                  <p className="mt-1.5 text-[0.85rem] text-muted">{result.diagnosticConfidence.note}</p>
                </div>
              </div>

              {/* One question back + examine next + support */}
              <div className="mt-8 rounded-2xl border border-line bg-sunk p-6">
                <p className="font-mono text-[0.68rem] tracking-[0.16em] text-amber uppercase">
                  One question worth taking back to your team
                </p>
                <p className="mt-2.5 font-display text-lg leading-snug">{result.oneQuestionBack}</p>

                {result.examineNext.length ? (
                  <div className="mt-6 border-t border-line pt-5">
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
                  </div>
                ) : null}

                {result.relevantSupport.length ? (
                  <div className="mt-5 flex flex-wrap gap-2">
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
