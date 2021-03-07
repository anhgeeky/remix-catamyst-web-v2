import { useRouter } from 'next/router'
import { Layout } from '@layouts'
import { useAuth, useAuthorized } from '@hooks'
import {
  DashboardDiscussions,
  DashboardJobs,
  DashboardMentors,
  DashboardOverview,
  DashboardPosts,
  DashboardProjects,
  DashboardTabs,
  DashboardTracks,
} from '@components/dashboard'
import React from 'react'

export default function DashboardSlug() {
  const router = useRouter()
  const { dashboardSlug } = router.query

  const { auth, isAuthorized } = useAuth()
  useAuthorized(isAuthorized)

  return (
    <Layout>
      {dashboardSlug && isAuthorized && auth && (
        <>
          <DashboardTabs />
          {dashboardSlug === 'overview' && <DashboardOverview auth={auth} />}
          {dashboardSlug === 'tracks' && <DashboardTracks auth={auth} />}
          {dashboardSlug === 'projects' && <DashboardProjects auth={auth} />}
          {dashboardSlug === 'posts' && <DashboardPosts auth={auth} />}
          {dashboardSlug === 'mentors' && <DashboardMentors auth={auth} />}
          {dashboardSlug === 'jobs' && <DashboardJobs auth={auth} />}
          {dashboardSlug === 'discussions' && (
            <DashboardDiscussions auth={auth} />
          )}
        </>
      )}
    </Layout>
  )
}
