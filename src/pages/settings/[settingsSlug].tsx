import { useRouter } from 'next/router'

import { Layout } from '@layouts'
import { HeaderTabs } from '@components'
import { CMSStats, CMSTracks, CMSTopics, CMSLessons } from '@components/cms'
import { useRedirectSignIn } from '@hooks'

import dataCMSLinks from '@data/cms-links.json'

export default function settingsSlug() {
  const router = useRouter()
  const { cmsSlug } = router.query
  const { auth, isAuthenticated } = useRedirectSignIn()

  /**
   * This pattern is used so the header tabs navigation seamless.
   */
  return (
    <Layout>
      {cmsSlug && isAuthenticated && auth && (
        <>
          <HeaderTabs links={dataCMSLinks} />
          {cmsSlug === 'overview' && <CMSStats />}
          {cmsSlug === 'tracks' && <CMSTracks />}
          {cmsSlug === 'topics' && <CMSTopics />}
          {cmsSlug === 'lessons' && <CMSLessons />}
        </>
      )}
    </Layout>
  )
}