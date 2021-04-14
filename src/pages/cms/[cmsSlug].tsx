import { useRouter } from 'next/router'

import { Layout } from '@layouts'
import { CMSAll } from '@components/cms'
import { useRedirectSignIn } from '@hooks'
import { supabase } from '@lib'

export default function cmsSlugPage({ user }) {
  const router = useRouter()
  const { cmsSlug } = router.query
  const state = useRedirectSignIn()

  return (
    <Layout title="Loading CMS... · Catamyst">
      {cmsSlug && <CMSAll cmsSlug={cmsSlug} state={state} />}
    </Layout>
  )
}

export async function getServerSideProps({ req }) {
  const { user } = await supabase.auth.api.getUserByCookie(req)
  if (user && user?.user_metadata.access === 'cms') {
    // console.info({ user })
    return { props: { user } }
  } else {
    return { props: {}, redirect: { destination: '/about', permanent: false } }
  }
}
