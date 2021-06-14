import { Layout } from '@/layouts'
import { useRedirectHome } from '@/hooks'

/**
 * The CMS has different pattern with regular dashboard.
 * `/cms/[cmsSlug]` to handle tabs and index of collections.
 * `/cms/tracks/[trackId]` to handle editing the track by id.
 * `/cms/topics/[topicId]` to handle editing the topic by id.
 * `/cms/lessons/[trackId]` to handle editing the lesson by id.
 */
export default function cmsPage() {
  const { auth } = useRedirectHome()

  return (
    <Layout title="Loading CMS... · Catamyst">
      {auth.isLoading && <p>Loading CMS...</p>}
    </Layout>
  )
}
