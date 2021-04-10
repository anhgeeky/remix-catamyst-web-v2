import { useEffect } from 'react'
import { useRouter } from 'next/router'

import { Layout } from '@layouts'
import { DashboardAll } from '@components/dashboard'
import { useAuth } from '@hooks'

export default function dashboardSlugPage() {
  const router = useRouter()
  const { dashboardSlug } = router.query
  const { isAuthenticated } = useAuth()

  useEffect(() => {
    if (!isAuthenticated) router.replace('/signin')
  }, [isAuthenticated])

  return (
    <Layout title="Loading dashboard... · Catamyst">
      {isAuthenticated && dashboardSlug && (
        <DashboardAll dashboardSlug={dashboardSlug} />
      )}
    </Layout>
  )
}
