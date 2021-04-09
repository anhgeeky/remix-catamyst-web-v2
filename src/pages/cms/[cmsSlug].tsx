import { useRouter } from 'next/router'
import { Text } from '@chakra-ui/react'

import { Layout } from '@layouts'
import { HeaderTabs } from '@components'
import { CMSOverview, CMSTracks, CMSTopics, CMSLessons } from '@components/cms'
import { useRedirectSignIn } from '@hooks'

import dataCMSLinks from '@data/cms-links.json'

export default function cmsSlugPage() {
  const router = useRouter()
  const { cmsSlug } = router.query
  const { auth, isAuthenticated } = useRedirectSignIn()

  /**
   * This pattern is used so the header tabs navigation seamless.
   */
  return (
    <Layout title="Loading CMS... · Catamyst">
      {!auth && <Text>Loading CMS...</Text>}
      {cmsSlug && isAuthenticated && (
        <>
          <HeaderTabs links={dataCMSLinks} />
          {cmsSlug === 'overview' && <CMSOverview />}
          {cmsSlug === 'tracks' && <CMSTracks />}
          {cmsSlug === 'topics' && <CMSTopics />}
          {cmsSlug === 'lessons' && <CMSLessons />}
        </>
      )}
    </Layout>
  )
}
