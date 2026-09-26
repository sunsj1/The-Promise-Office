import { AnimatePresence, motion } from 'framer-motion'
import { ArrowLeft, Check, ClipboardCopy, Mail, RotateCcw } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  questions,
  recommendations,
  riskLines,
  verdictFor,
  verdicts,
  type Category,
} from '@/data/healthCheck'
import { site } from '@/data/site'
import { paths } from '@/routes/paths'
import { sealEase } from '@/animations/variants'
import { ActionButton, LinkButton } from '@/widgets/Button'
import { RagGauge } from '@/widgets/RagGauge'
import { cn } from '@/lib/cn'

type Answers = (0 | 1 | 2 | null)[]

const MAX_PER_QUESTION = 2

export function HealthCheckTool() {
  const [answers, setAnswers] = useState<Answers>(() => questions.map(() => null))
  const [index, setIndex] = useState(0)
  const [finished, setFinished] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [copied, setCopied] = useState(false)

  const answered = answers.filter((value) => value !== null) as number[]
  const runningSum = answered.reduce((total, value) => total + value, 0)
  const runningMax = answered.length * MAX_PER_QUESTION
  const runningVerdict = answered.length ? verdictFor(runningSum, runningMax) : null

  const result = useMemo(() => {
    if (!finished) return null

    const values = answers as number[]
    const sum = values.reduce((total, value) => total + value, 0)
    const max = questions.length * MAX_PER_QUESTION
    const verdict = verdictFor(sum, max)

    // Average each category so a two-question category is not double weighted.
    const byCategory = new Map<Category, { sum: number; count: number }>()
    questions.forEach((question, position) => {
      const entry = byCategory.get(question.category) ?? { sum: 0, count: 0 }
      entry.sum += values[position]
      entry.count += 1
      byCategory.set(question.category, entry)
    })

    const ranked = [...byCategory.entries()]
      .map(([category, entry]) => ({ category, average: entry.sum / entry.count }))
      .sort((a, b) => b.average - a.average)

    const signals = ranked.filter((entry) => entry.average > 0).slice(0, 2)
    const top = signals.length ? signals : [ranked[0]]

    return { sum, max, verdict, top, recommendation: recommendations[top[0].category] }
  }, [finished, answers])

  const choose = (weight: 0 | 1 | 2) => {
    const next = [...answers]
    next[index] = weight
    setAnswers(next)

    if (index + 1 < questions.length) {
      window.setTimeout(() => setIndex(index + 1), 180)
    } else {
      window.setTimeout(() => setFinished(true), 240)
    }
  }

  const restart = () => {
    setAnswers(questions.map(() => null))
    setIndex(0)
    setFinished(false)
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
      `Overall reading: ${verdicts[result.verdict].label}`,
      `Top signals: ${result.top.map((entry) => entry.category).join(', ')}`,
      `Suggested starting point: ${result.recommendation.name}`,
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
        `My Delivery Health Check results — ${verdicts[result.verdict].label.split(' — ')[0]}`,
      )}&body=${encodeURIComponent(briefText)}`
    : '#'

  return (
    <div className="rounded-3xl border border-line bg-surface p-6 sm:p-9 lg:p-11">
      {/* Progress */}
      <div className="flex items-center justify-between gap-6">
        <ol className="flex flex-1 gap-1.5" aria-label="Question progress">
          {questions.map((question, position) => (
            <li
              key={question.text}
              aria-current={!finished && position === index ? 'step' : undefined}
              className={cn(
                'h-1 flex-1 rounded-full transition-colors duration-300',
                answers[position] !== null
                  ? 'bg-amber'
                  : !finished && position === index
                    ? 'bg-plum dark:bg-lavender'
                    : 'bg-line',
              )}
            />
          ))}
        </ol>
        <p className="shrink-0 font-mono text-[0.7rem] tracking-[0.12em] text-muted uppercase">
          {finished ? 'Result' : `${index + 1} / ${questions.length}`}
        </p>
      </div>

      <div className="mt-8 grid gap-10 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-4">
          <RagGauge
            ratio={runningMax ? runningSum / runningMax : 0}
            verdict={finished && result ? result.verdict : runningVerdict}
            label={
              answered.length
                ? `Reading so far: ${
                    verdicts[(finished && result ? result.verdict : runningVerdict) ?? 'green'].label.split(' — ')[0]
                  } · ${answered.length} of ${questions.length} answered`
                : 'Answer the first question to see your reading build.'
            }
          />
        </div>

        <div className="lg:col-span-8">
          <AnimatePresence mode="wait">
            {!finished ? (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 18 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -18 }}
                transition={{ duration: 0.3, ease: sealEase }}
              >
                <p className="font-mono text-[0.7rem] tracking-[0.16em] text-amber uppercase">
                  {questions[index].category}
                </p>
                <h3 className="mt-3 text-2xl sm:text-[1.75rem]">{questions[index].text}</h3>

                <ul className="mt-7 space-y-2.5">
                  {questions[index].answers.map((answer) => (
                    <li key={answer.label}>
                      <button
                        type="button"
                        onClick={() => choose(answer.weight)}
                        className={cn(
                          'w-full rounded-xl border border-line bg-sunk px-5 py-4 text-left text-[0.97rem] transition-all duration-200',
                          'hover:border-plum hover:bg-surface dark:hover:border-amber',
                          answers[index] === answer.weight && 'border-amber bg-surface',
                        )}
                      >
                        {answer.label}
                      </button>
                    </li>
                  ))}
                </ul>

                {index > 0 ? (
                  <button
                    type="button"
                    onClick={() => setIndex(index - 1)}
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
              >
                <p className="font-mono text-[0.7rem] tracking-[0.16em] text-amber uppercase">
                  Your reading
                </p>
                <h3 className="mt-3 text-2xl sm:text-[1.9rem]">{verdicts[result.verdict].label}</h3>
                <p className="mt-3 max-w-xl text-[0.97rem] text-muted">
                  {verdicts[result.verdict].sub}
                </p>

                <ul className="mt-7 space-y-3">
                  {result.top.map((entry, position) => (
                    <li key={entry.category} className="flex gap-4 rounded-xl bg-sunk px-5 py-4">
                      <span className="pt-0.5 font-mono text-[0.72rem] text-amber">
                        0{position + 1}
                      </span>
                      <div>
                        <p className="font-display text-base font-semibold">{entry.category}</p>
                        <p className="mt-0.5 text-[0.93rem] text-muted">
                          {riskLines[entry.category]}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>

                <div className="mt-8 rounded-2xl border border-line p-6">
                  <p className="font-mono text-[0.7rem] tracking-[0.16em] text-muted uppercase">
                    Suggested starting point · {result.recommendation.need}
                  </p>
                  <h4 className="mt-3 font-display text-xl">{result.recommendation.name}</h4>
                  <p className="mt-2 text-[0.95rem] text-muted">{result.recommendation.blurb}</p>
                  <ul className="mt-4 space-y-2">
                    {result.recommendation.bullets.map((bullet) => (
                      <li key={bullet} className="flex gap-3 text-[0.93rem]">
                        <Check size={15} className="mt-1 shrink-0 text-amber" aria-hidden />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                  <Link
                    to={paths.engagementDetail(result.recommendation.slug)}
                    className="mt-5 inline-flex items-center gap-2 font-mono text-[0.72rem] tracking-[0.12em] text-amber uppercase hover:underline"
                  >
                    Read the mandate →
                  </Link>
                </div>

                {/* Hand-off: prepares an email, stores nothing. */}
                <div className="mt-8 rounded-2xl bg-sunk p-6">
                  <p className="font-display text-lg">Send this reading to Rishi</p>
                  <p className="mt-1.5 text-[0.93rem] text-muted">
                    Add your details and we will prepare an email for you to review and send. Nothing
                    is stored or submitted by this site.
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
    </div>
  )
}
