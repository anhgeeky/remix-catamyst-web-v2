import { useEffect } from 'react'
import { useRouter } from 'next/router'

import { Layout } from '@/layouts'
import { useAuth } from '@/hooks'

export default function dashboardPage() {
  const router = useRouter()
  const { auth, isAuthenticated } = useAuth()

  useEffect(() => {
    if (isAuthenticated) router.replace('/dashboard/overview')
    else router.replace('/signin')
  }, [isAuthenticated])

  return (
    <Layout title="Loading dashboard... · Catamyst">
      {auth.isLoading && <p>Loading dashboard...</p>}
    </Layout>
  )
}
