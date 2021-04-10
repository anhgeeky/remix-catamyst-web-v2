import { useRouter } from 'next/router'

import { Layout } from '@layouts'
import { SettingsAll } from '@components/settings'
import { useRedirectSignIn } from '@hooks'
import { supabase } from '@lib'

export default function settingsSlugPage() {
  const router = useRouter()
  const { settingsSlug } = router.query
  const state = useRedirectSignIn(
    `mode,role,id,handle,name,nickname,plan,is_public,is_verified,avatar_url,cover_url,headline,bio_html,country,location,website_url,work,socials,pro,super,created_at,updated_at`
  )

  return (
    <Layout title="Loading settings... · Catamyst">
      {settingsSlug &&
        state.user &&
        !state.isError &&
        !state.isLoading &&
        state.profile && (
          <SettingsAll settingsSlug={settingsSlug} state={state} />
        )}
    </Layout>
  )
}
