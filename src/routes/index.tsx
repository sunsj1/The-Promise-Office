import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import { HomePage } from '@/pages/Home'
import { paths } from '@/routes/paths'
import { Layout } from '@/widgets/Layout'

const EngagementsPage = lazy(() =>
  import('@/pages/Engagements').then((m) => ({ default: m.EngagementsPage })),
)
const EngagementDetailPage = lazy(() =>
  import('@/pages/EngagementDetail').then((m) => ({ default: m.EngagementDetailPage })),
)
const EvidencePage = lazy(() => import('@/pages/Evidence').then((m) => ({ default: m.EvidencePage })))
const PerspectivePage = lazy(() =>
  import('@/pages/Perspective').then((m) => ({ default: m.PerspectivePage })),
)
const InsightsPage = lazy(() => import('@/pages/Insights').then((m) => ({ default: m.InsightsPage })))
const HealthCheckPage = lazy(() =>
  import('@/pages/HealthCheck').then((m) => ({ default: m.HealthCheckPage })),
)
const ContactPage = lazy(() => import('@/pages/Contact').then((m) => ({ default: m.ContactPage })))
const BookedPage = lazy(() => import('@/pages/Booked').then((m) => ({ default: m.BookedPage })))
const NotFoundPage = lazy(() =>
  import('@/pages/NotFound').then((m) => ({ default: m.NotFoundPage })),
)

export function AppRoutes() {
  return (
    <Suspense fallback={null}>
      <Routes>
        <Route element={<Layout />}>
          <Route path={paths.home} element={<HomePage />} />
          <Route path={paths.engagements} element={<EngagementsPage />} />
          <Route path="/engagements/:slug" element={<EngagementDetailPage />} />
          <Route path={paths.evidence} element={<EvidencePage />} />
          <Route path={paths.perspective} element={<PerspectivePage />} />
          <Route path={paths.insights} element={<InsightsPage />} />
          <Route path={paths.healthCheck} element={<HealthCheckPage />} />
          <Route path={paths.contact} element={<ContactPage />} />
          <Route path={paths.booked} element={<BookedPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Suspense>
  )
}
