import { useEffect } from 'react'
import { useRouter } from 'next/router'

import { Layout } from '@layouts'
import { useAuth } from '@hooks'
import { SettingsGumroad } from '@components/settings'

export default function settingsPage() {
  const router = useRouter()
  const { auth, isAuthenticated } = useAuth()

  useEffect(() => {
    if (isAuthenticated) router.replace('/settings/overview')
    else router.replace('/signin')
  }, [isAuthenticated])

  return (
    <Layout title="Loading settings... · Catamyst">
      <SettingsGumroad />
      {auth.isLoading && <p>Loading settings...</p>}
    </Layout>
  )
}
