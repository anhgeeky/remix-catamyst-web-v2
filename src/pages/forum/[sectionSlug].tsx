import { useRouter } from 'next/router'

import { Layout } from '@layouts'

export default function forumSectionSlug() {
  const router = useRouter()
  const { sectionSlug } = router.query

  return (
    <Layout title="Loading forum section...">
      {sectionSlug && <h1>{sectionSlug}</h1>}
    </Layout>
  )
}
