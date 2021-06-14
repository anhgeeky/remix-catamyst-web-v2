import { useRouter } from 'next/router'

import { Layout } from '@/layouts'
import { TopicDetails } from '@/components/topics'

export default function topicSlugPage() {
  const router = useRouter()
  const { trackSlug, topicSlug } = router.query

  return (
    <Layout title={`Loading topic... · Catamyst`}>
      {trackSlug && topicSlug && (
        <TopicDetails trackSlug={trackSlug} topicSlug={topicSlug} />
      )}
    </Layout>
  )
}
