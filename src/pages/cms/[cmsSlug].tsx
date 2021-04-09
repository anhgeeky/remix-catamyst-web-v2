import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { Heading } from '@chakra-ui/react'

import { Layout } from '@layouts'
import { HeaderTabs } from '@components'
import {
  CMSHero,
  CMSOverview,
  CMSTracks,
  CMSTopics,
  CMSLessons,
} from '@components/cms'
import { useAuthProfile } from '@hooks'

import dataCMSLinks from '@data/cms-links.json'

export default function cmsSlugPage() {
  const router = useRouter()
  const { cmsSlug } = router.query

  const { profile, loading, isAuthorized } = useAuthProfile(`id, role`)

  useEffect(() => {
    if (!loading && !isAuthorized) router.replace('/dashboard/overview')
  }, [isAuthorized])

  /**
   * This pattern is used so the header tabs navigation seamless.
   */
  return (
    <Layout title="Loading CMS... · Catamyst">
      <HeaderTabs links={dataCMSLinks} />
      {!profile && (
        <CMSHero>
          <Heading as="h1" size="xl">
            Loading CMS...
          </Heading>
        </CMSHero>
      )}
      {cmsSlug && isAuthorized && (
        <>
          {cmsSlug === 'overview' && <CMSOverview />}
          {cmsSlug === 'users' && <p>Still in development.</p>}
          {cmsSlug === 'tracks' && <CMSTracks />}
          {cmsSlug === 'topics' && <CMSTopics />}
          {cmsSlug === 'lessons' && <CMSLessons />}
        </>
      )}
    </Layout>
  )
}
