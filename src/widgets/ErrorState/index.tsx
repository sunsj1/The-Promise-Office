import { paths } from '@/routes/paths'
import { ActionButton, LinkButton } from '@/widgets/Button'
import { Container } from '@/widgets/Container'
import { Eyebrow } from '@/widgets/Eyebrow'
import { Seal } from '@/widgets/Seal'

type ErrorStateProps = {
  /** Use `h1` when this replaces an entire page; `h2` when it stands in for one section. */
  titleAs?: 'h1' | 'h2'
  onRetry?: () => void
  className?: string
}

/** Shown in place of a page, feature or section that failed to render. */
export function ErrorState({ titleAs: Title = 'h2', onRetry, className }: ErrorStateProps) {
  return (
    <section className={className ?? 'grid min-h-[60vh] place-items-center py-16'}>
      <Container>
        <div className="max-w-xl">
          <Seal className="h-16 w-16" animate />
          <Eyebrow className="mt-9">Something stalled</Eyebrow>
          <Title className="mt-5 text-3xl leading-[1.1] sm:text-4xl lg:text-[3rem]">
            Well, this wasn’t in the delivery plan.
          </Title>
          <p className="mt-6 text-[1.0625rem] text-muted">
            One of our digital gears has decided to take an unscheduled tea break. We’re sorry for
            the interruption. Give it another try, or head back to the home page while we get
            things moving again.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <ActionButton size="lg" onClick={onRetry ?? (() => window.location.reload())}>
              Try again
            </ActionButton>
            <LinkButton to={paths.home} variant="outline" size="lg" arrow={false}>
              Go home
            </LinkButton>
          </div>
        </div>
      </Container>
    </section>
  )
}
