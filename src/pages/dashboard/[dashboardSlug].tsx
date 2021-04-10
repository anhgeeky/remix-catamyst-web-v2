import { useRouter } from 'next/router'

import { Layout } from '@layouts'
import { DashboardAll } from '@components/dashboard'
import { useRedirectSignIn } from '@hooks'

export default function dashboardSlugPage() {
  const router = useRouter()
  const { dashboardSlug } = router.query
  const state = useRedirectSignIn()

  return (
    <Layout title="Loading dashboard... · Catamyst">
      {dashboardSlug && !state.isError && !state.isLoading && state.profile && (
        <DashboardAll dashboardSlug={dashboardSlug} state={state} />
      )}
    </Layout>
  )
}
