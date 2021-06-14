import { Layout } from '@layouts'
import { CMSAll } from '@components/cms'
import { useRedirectHome } from '@hooks'

export default function cmsSlugPage() {
  const state = useRedirectHome()
  const { cmsSlug } = state.router.query

  return (
    <Layout title="Loading CMS... · Catamyst">
      {cmsSlug && <CMSAll cmsSlug={cmsSlug} state={state} />}
    </Layout>
  )
}
