import { useEffect } from 'react'
import { BrowserRouter, useLocation } from 'react-router-dom'
import { trackPageview } from '@/lib/analytics'
import { AppRoutes } from '@/routes'
import { ErrorBoundary } from '@/widgets/ErrorBoundary'

function RoutesWithBoundary() {
  const location = useLocation()

  useEffect(() => {
    trackPageview(location.pathname + location.search)
  }, [location.pathname, location.search])

  return (
    <ErrorBoundary titleAs="h1" resetKey={location.pathname}>
      <AppRoutes />
    </ErrorBoundary>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <RoutesWithBoundary />
    </BrowserRouter>
  )
}
