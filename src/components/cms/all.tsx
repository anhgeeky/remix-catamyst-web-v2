import { Heading } from '@chakra-ui/react'

import { HeaderTabs } from '@components'
import {
  CMSHero,
  CMSOverview,
  CMSUsers,
  CMSTracks,
  CMSTopics,
  CMSLessons,
} from '@components/cms'
import { dataCMSLinks } from '@data'

/**
 * Only these CMS data needs access token:
 * overview -> /api/cms/stats
 * users -> /api/users
 * profiles -> /api/profiles
 * lessons -> /api/lessons
 */
export function CMSAll({ cmsSlug, state }) {
  return (
    <>
      <HeaderTabs links={dataCMSLinks} />

      {state.isLoading && (
        <CMSHero>
          <Heading as="h1" size="xl">
            Loading CMS...
          </Heading>
        </CMSHero>
      )}

      {!state.isLoading && state.isError && (
        <CMSHero>
          <Heading as="h1" size="xl">
            Failed to load CMS. Please refresh to try again.
          </Heading>
        </CMSHero>
      )}

      {!state.isLoading && state.user && state.profile && (
        <>
          {cmsSlug === 'overview' && <CMSOverview state={state} />}
          {cmsSlug === 'users' && <CMSUsers state={state} />}
          {cmsSlug === 'tracks' && <CMSTracks />}
          {cmsSlug === 'topics' && <CMSTopics />}
          {cmsSlug === 'lessons' && <CMSLessons state={state} />}
        </>
      )}
    </>
  )
}
