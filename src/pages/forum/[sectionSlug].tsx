import { useRouter } from 'next/router'

import { Layout } from '@/layouts'
import { ForumSection } from '@/components/forum'

export default function forumSectionSlug() {
  const router = useRouter()
  const { sectionSlug } = router.query

  return (
    <Layout title="Loading forum section... · Catamyst">
      {sectionSlug && <ForumSection sectionSlug={sectionSlug} />}
    </Layout>
  )
}
