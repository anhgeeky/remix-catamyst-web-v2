import { Heading } from '@chakra-ui/react'

import { HeaderTabs } from '@components'
import {
  DashboardHero,
  DashboardCertificates,
  DashboardDiscussions,
  DashboardJobs,
  DashboardMentors,
  DashboardOverview,
  DashboardPosts,
  DashboardProjects,
  DashboardTracks,
} from '@components/dashboard'
import { useProfile } from '@hooks'

import dataDashboardLinks from '@data/dashboard-links.json'

export function DashboardAll({ dashboardSlug }) {
  const state = useProfile(
    `handle, name, nickname, role, mode, plan, is_public, is_verified, avatar_url, created_at, updated_at`
  )

  if (state.isError) {
    return (
      <DashboardHero>
        <Heading as="h1" size="xl">
          Failed to load dashboard
        </Heading>
      </DashboardHero>
    )
  }
  if (!state.profile) {
    return (
      <DashboardHero>
        <Heading as="h1" size="xl">
          Loading dashboard...
        </Heading>
      </DashboardHero>
    )
  }
  /**
   * This pattern is used so the header tabs navigation seamless
   */
  return (
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
  )
}
