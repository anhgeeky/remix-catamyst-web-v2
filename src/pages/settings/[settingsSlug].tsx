import { useRouter } from 'next/router'

import { Layout } from '@/layouts'
import { SettingsAll } from '@/components/settings'
import { useRedirectSignIn } from '@/hooks'

export default function settingsSlugPage() {
  const router = useRouter()
  const { settingsSlug } = router.query
  const state = useRedirectSignIn()

  return (
    <Layout title="Loading settings... · Catamyst">
      {settingsSlug && (
        <SettingsAll settingsSlug={settingsSlug} state={state} />
      )}
    </Layout>
  )
}
