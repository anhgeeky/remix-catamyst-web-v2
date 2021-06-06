import NextHead from 'next/head'
import { useRouter } from 'next/router'
import { Text } from '@chakra-ui/react'

import { Layout } from '@layouts'
import { TopicSingle } from '@components/topics'

/**
 * Topic content page with sections that contain topics
 */
export default function topicSlugPage() {
  const router = useRouter()
  const { topicSlug } = router.query

  return (
    <Layout title={`Loading topic... · Catamyst`}>
      {topicSlug && <TopicSingle topicSlug={topicSlug} />}
    </Layout>
  )
}
