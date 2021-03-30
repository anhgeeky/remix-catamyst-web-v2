import { useEffect } from 'react'
import { useRouter } from 'next/router'

import { Layout } from '@layouts'
import { useAuth } from '@hooks'

export default function settingsPage() {
  const router = useRouter()
  const { auth, isAuthenticated } = useAuth()

  useEffect(() => {
    if (isAuthenticated) router.replace('/settings/overview')
    else router.replace('/signin')
  }, [isAuthenticated])

  return (
    <Layout title="Loading settings... · Catamyst">
      {auth.isLoading && <p>Loading settings...</p>}
    </Layout>
  )
}
