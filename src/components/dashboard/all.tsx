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

import dataDashboardLinks from '@data/dashboard-links.json'

export function DashboardAll({ dashboardSlug, state }) {
  /**
   * This pattern is used so the header tabs navigation seamless.
   * Conditions are inside because there is HeaderTabs on each.
   */
  return (
    <>
      <HeaderTabs links={dataDashboardLinks} />

      {state.isLoading && (
        <DashboardHero>
          <Heading as="h1" size="xl">
            Loading dashboard...
          </Heading>
        </DashboardHero>
      )}

      {!state.isLoading && state.isError && (
        <DashboardHero>
          <Heading as="h1" size="xl">
            Failed to load dashboard
          </Heading>
        </DashboardHero>
      )}

      {!state.isLoading && state.profile && (
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
    </>
  )
}
