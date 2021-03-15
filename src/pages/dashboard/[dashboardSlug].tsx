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
  const { auth, isAuthorized } = useRedirectSignIn()

  /**
   * This pattern is used so the header tabs navigation seamless
   */
  return (
    <Layout>
      {dashboardSlug && isAuthorized && auth && (
        <>
          <HeaderTabs links={dataDashboardLinks} />
          {dashboardSlug === 'overview' && <DashboardOverview auth={auth} />}
          {dashboardSlug === 'tracks' && <DashboardTracks auth={auth} />}
          {dashboardSlug === 'projects' && <DashboardProjects auth={auth} />}
          {dashboardSlug === 'posts' && <DashboardPosts auth={auth} />}
          {dashboardSlug === 'mentors' && <DashboardMentors auth={auth} />}
          {dashboardSlug === 'jobs' && <DashboardJobs auth={auth} />}
          {dashboardSlug === 'discussions' && (
            <DashboardDiscussions auth={auth} />
          )}
          {dashboardSlug === 'certificates' && (
            <DashboardCertificates auth={auth} />
          )}
        </>
      )}
    </Layout>
  )
}
