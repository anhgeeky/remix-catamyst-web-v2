import { Layout } from '@layouts'
import { useRedirectHome } from '@hooks'
import { supabase } from '@lib'

/**
 * The CMS has different pattern with regular dashboard.
 * `/cms/[cmsSlug]` to handle tabs and index of collections.
 * `/cms/tracks/[trackId]` to handle editing the track by id.
 * `/cms/topics/[topicId]` to handle editing the topic by id.
 * `/cms/lessons/[trackId]` to handle editing the lesson by id.
 */
export default function cmsPage({ user }) {
  const { auth } = useRedirectHome()

  return (
    <Layout title="Loading CMS... · Catamyst">
      {auth.isLoading && <p>Loading CMS...</p>}
    </Layout>
  )
}

export async function getServerSideProps({ req }) {
  const { user } = await supabase.auth.api.getUserByCookie(req)
  if (user?.user_metadata.access === 'cms') {
    return { props: { user } }
  } else {
    return { props: {}, redirect: { destination: '/about', permanent: false } }
  }
}
