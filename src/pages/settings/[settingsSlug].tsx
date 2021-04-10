import { useEffect } from 'react'
import { useRouter } from 'next/router'

import { Layout } from '@layouts'
import { SettingsAll } from '@components/settings'
import { useAuth } from '@hooks'

export default function settingsSlugPage() {
  const router = useRouter()
  const { settingsSlug } = router.query
  const { isAuthenticated } = useAuth()

  useEffect(() => {
    if (!isAuthenticated) router.replace('/signin')
  }, [isAuthenticated])

  return (
    <Layout title="Loading settings... · Catamyst">
      {isAuthenticated && settingsSlug && (
        <SettingsAll settingsSlug={settingsSlug} />
      )}
    </Layout>
  )
}
