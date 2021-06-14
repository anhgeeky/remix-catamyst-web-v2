import { Layout } from '@/layouts'
import { DashboardAll } from '@/components/dashboard'
import { useRedirectSignIn } from '@/hooks'

export default function dashboardSlugPage() {
  const state = useRedirectSignIn()
  const { dashboardSlug } = state.router.query

  return (
    <Layout title="Loading dashboard... · Catamyst">
      {dashboardSlug && (
        <DashboardAll dashboardSlug={dashboardSlug} state={state} />
      )}
    </Layout>
  )
}
