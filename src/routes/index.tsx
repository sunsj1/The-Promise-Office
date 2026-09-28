import { lazy, Suspense } from 'react'
import { Navigate, Route, Routes, useParams } from 'react-router-dom'
import { HomePage } from '@/pages/Home'
import { paths } from '@/routes/paths'
import { Layout } from '@/widgets/Layout'

const AdvisoryPage = lazy(() => import('@/pages/Advisory').then((m) => ({ default: m.AdvisoryPage })))
const AdvisoryDetailPage = lazy(() =>
  import('@/pages/AdvisoryDetail').then((m) => ({ default: m.AdvisoryDetailPage })),
)
const GCCPage = lazy(() => import('@/pages/GCC').then((m) => ({ default: m.GCCPage })))
const AIPage = lazy(() => import('@/pages/AI').then((m) => ({ default: m.AIPage })))
const EvidencePage = lazy(() => import('@/pages/Evidence').then((m) => ({ default: m.EvidencePage })))
const AboutPage = lazy(() => import('@/pages/About').then((m) => ({ default: m.AboutPage })))
const InsightsPage = lazy(() => import('@/pages/Insights').then((m) => ({ default: m.InsightsPage })))
const HealthCheckPage = lazy(() =>
  import('@/pages/HealthCheck').then((m) => ({ default: m.HealthCheckPage })),
)
const ContactPage = lazy(() => import('@/pages/Contact').then((m) => ({ default: m.ContactPage })))
const BookedPage = lazy(() => import('@/pages/Booked').then((m) => ({ default: m.BookedPage })))
const PrivacyPage = lazy(() => import('@/pages/Privacy').then((m) => ({ default: m.PrivacyPage })))
const TermsPage = lazy(() => import('@/pages/Terms').then((m) => ({ default: m.TermsPage })))
const NotFoundPage = lazy(() =>
  import('@/pages/NotFound').then((m) => ({ default: m.NotFoundPage })),
)

/** Client-side safety net — vercel.json already 301s these at the edge. */
function LegacyEngagementDetailRedirect() {
  const { slug } = useParams()
  return <Navigate to={paths.advisoryDetail(slug ?? '')} replace />
}

export function AppRoutes() {
  return (
    <Suspense fallback={null}>
      <Routes>
        <Route element={<Layout />}>
          <Route path={paths.home} element={<HomePage />} />
          <Route path={paths.advisory} element={<AdvisoryPage />} />
          <Route path="/advisory/:slug" element={<AdvisoryDetailPage />} />
          <Route path={paths.gcc} element={<GCCPage />} />
          <Route path={paths.ai} element={<AIPage />} />
          <Route path={paths.evidence} element={<EvidencePage />} />
          <Route path={paths.about} element={<AboutPage />} />
          <Route path={paths.insights} element={<InsightsPage />} />
          <Route path={paths.healthCheck} element={<HealthCheckPage />} />
          <Route path={paths.contact} element={<ContactPage />} />
          <Route path={paths.booked} element={<BookedPage />} />
          <Route path={paths.privacy} element={<PrivacyPage />} />
          <Route path={paths.terms} element={<TermsPage />} />

          {/* Legacy v1 routes — permanent redirects */}
          <Route path={paths.legacyPerspective} element={<Navigate to={paths.about} replace />} />
          <Route path={paths.legacyEngagements} element={<Navigate to={paths.advisory} replace />} />
          <Route path="/engagements/:slug" element={<LegacyEngagementDetailRedirect />} />

          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Suspense>
  )
}
