import { useRouter } from 'next/router'

import { Layout } from '@layouts'
import { CMSAll } from '@components/cms'
import { useRedirectSignIn } from '@hooks'

export default function cmsSlugPage() {
  const router = useRouter()
  const { cmsSlug } = router.query
  const state = useRedirectSignIn()

  return (
    <Layout title="Loading CMS... · Catamyst">
      {cmsSlug && <CMSAll cmsSlug={cmsSlug} state={state} />}
    </Layout>
  )
}
