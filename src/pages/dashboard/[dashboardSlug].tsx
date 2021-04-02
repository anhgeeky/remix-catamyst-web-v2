import { useRouter } from 'next/router'
import { Layout } from '@layouts'
import { HeaderTabs } from '@components'
import {
  DashboardCertificates,
  DashboardDiscussions,
  DashboardJobs,
  DashboardMentors,
  DashboardOverview,
  DashboardPosts,
  DashboardProjects,
  DashboardTracks,
} from '@components/dashboard'
import { useRedirectSignIn } from '@hooks'

import dataDashboardLinks from '@data/dashboard-links.json'

export default function dashboardSlugPage() {
  const router = useRouter()
  const { dashboardSlug } = router.query
  const state = useRedirectSignIn(
    `id, handle, name, nickname, role, mode, plan, is_public, is_verified, avatar_url, created_at, updated_at`
  )

  /**
   * This pattern is used so the header tabs navigation seamless
   */
  return (
    <Layout title="Loading dashboard... · Catamyst">
      {dashboardSlug && state.profile && (
        <>
          <HeaderTabs links={dataDashboardLinks} />
          {dashboardSlug === 'overview' && <DashboardOverview state={state} />}
          {dashboardSlug === 'tracks' && <DashboardTracks state={state} />}
          {dashboardSlug === 'projects' && <DashboardProjects state={state} />}
          {dashboardSlug === 'posts' && <DashboardPosts state={state} />}
          {dashboardSlug === 'mentors' && <DashboardMentors state={state} />}
          {dashboardSlug === 'jobs' && <DashboardJobs state={state} />}
          {dashboardSlug === 'discussions' && (
            <DashboardDiscussions state={state} />
          )}
          {dashboardSlug === 'certificates' && (
            <DashboardCertificates state={state} />
          )}
        </>
      )}
    </Layout>
  )
}
