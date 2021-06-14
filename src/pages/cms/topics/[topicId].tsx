import { useRouter } from 'next/router'

import { Layout } from '@/layouts'
import { TopicEditor } from '@/components/topics'

export default function trackIdPage() {
  const router = useRouter()
  const { topicId } = router.query

  return (
    <Layout title="Loading topic editor... · Catamyst">
      {topicId && <TopicEditor topicId={topicId} />}
    </Layout>
  )
}
