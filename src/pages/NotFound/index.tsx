import { navLinks, paths } from '@/routes/paths'
import { Link } from 'react-router-dom'
import { LinkButton } from '@/widgets/Button'
import { Container } from '@/widgets/Container'
import { Eyebrow } from '@/widgets/Eyebrow'
import { Seal } from '@/widgets/Seal'
import { Seo } from '@/widgets/Seo'

export function NotFoundPage() {
  return (
    <>
      <Seo title="Page not found" description="This page does not exist." path="/404" noindex />

      <section className="grid min-h-[80vh] place-items-center py-32">
        <Container>
          <div className="max-w-2xl">
            <Seal className="h-16 w-16" animate />
            <Eyebrow className="mt-9">Error 404</Eyebrow>
            <h1 className="mt-5 text-4xl sm:text-5xl lg:text-[4rem]">
              This one didn’t make it to delivery.
            </h1>
            <p className="mt-6 text-[1.0625rem] text-muted">
              The page you asked for isn’t here. Nothing is hidden — the link is simply out of date.
              Here is where the actual work lives.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <LinkButton to={paths.home} size="lg">
                Back to home
              </LinkButton>
              <LinkButton to={paths.contact} variant="outline" size="lg">
                Request a call
              </LinkButton>
            </div>
            <nav aria-label="Site sections" className="mt-12 border-t border-line pt-7">
              <ul className="flex flex-wrap gap-x-6 gap-y-3">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      to={link.href}
                      className="font-mono text-[0.7rem] tracking-[0.12em] text-muted uppercase transition-colors hover:text-amber"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </Container>
      </section>
    </>
  )
}
