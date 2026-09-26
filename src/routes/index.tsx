import { Route, Routes } from 'react-router-dom'
import { ContactPage } from '@/pages/Contact'
import { EngagementDetailPage } from '@/pages/EngagementDetail'
import { EngagementsPage } from '@/pages/Engagements'
import { EvidencePage } from '@/pages/Evidence'
import { HealthCheckPage } from '@/pages/HealthCheck'
import { HomePage } from '@/pages/Home'
import { InsightsPage } from '@/pages/Insights'
import { NotFoundPage } from '@/pages/NotFound'
import { PerspectivePage } from '@/pages/Perspective'
import { paths } from '@/routes/paths'
import { Layout } from '@/widgets/Layout'

export function AppRoutes() {
  return (
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
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}
