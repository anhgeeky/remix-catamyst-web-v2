import { useRouter } from 'next/router'
import { Text } from '@chakra-ui/react'

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
    `handle, name, nickname, role, mode, plan, is_public, is_verified, avatar_url, created_at, updated_at`
  )

  /**
   * This pattern is used so the header tabs navigation seamless
   */
  return (
    <Layout title="Loading dashboard... · Catamyst">
      <HeaderTabs links={dataDashboardLinks} />
      {!state.profile && <Text>Loading dashboard...</Text>}
      {dashboardSlug && state.profile && (
        <>
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
