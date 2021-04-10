import { useEffect } from 'react'
import { useRouter } from 'next/router'

import { Layout } from '@layouts'
import { useProfile } from '@hooks'

/**
 * The CMS has different pattern with regular dashboard.
 * `/cms/[cmsSlug]` to handle tabs and index of collections.
 * `/cms/tracks/[trackId]` to handle editing the track by id.
 * `/cms/topics/[topicId]` to handle editing the topic by id.
 * `/cms/lessons/[trackId]` to handle editing the lesson by id.
 */
export default function cmsPage() {
  const router = useRouter()
  const { auth, isAuthorized } = useProfile()

  /**
   * To access CMS, user must both authenticated and authorized to do so.
   */
  useEffect(() => {
    if (isAuthorized) router.replace('/cms/overview')
    else router.replace('/signin')
  }, [isAuthorized])

  return (
    <Layout title="Loading CMS... · Catamyst">
      {auth.isLoading && <p>Loading CMS...</p>}
    </Layout>
  )
}
