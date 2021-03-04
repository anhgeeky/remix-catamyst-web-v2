import NextHead from 'next/head'
import { useRouter } from 'next/router'
import { Heading, Text, Stack } from '@chakra-ui/react'

import { Layout } from '@/layouts'
import {
  Hero,
  ContentWithSidebar,
  CollectionLessons,
  PaginationTopics,
} from '@/components'
import { usePaginationTopics } from '@/hooks'

export default function TopicBySlug() {
  const router = useRouter()
  const { trackSlug, topicSlug } = router.query
  const { track, topic, prev, next } = usePaginationTopics({
    trackSlug,
    topicSlug,
  })

  return (
    <Layout title={`Loading topic...`}>
      {track && topic && (
        <>
          <NextHead>
            <title>
              {topic.title} · {trackSlug} · Catamyst
            </title>
          </NextHead>
          <TopicHero topic={topic} />
          <ContentWithSidebar>
            <TopicSidebar topic={topic} />
            <Stack spacing={5} width="100%">
              <CollectionLessons
                trackSlug={trackSlug}
                topicSlug={topicSlug}
                sections={topic.sections}
              />
              <PaginationTopics track={track} prev={prev} next={next} />
            </Stack>
          </ContentWithSidebar>
        </>
      )}
    </Layout>
  )
}

function TopicHero({ topic }) {
  return (
    <Hero>
      <Heading as="h1" size="xl">
        {topic.iconEmoji} {topic.title}
      </Heading>
      <Text>{topic.description || 'No topic description yet.'}</Text>
    </Hero>
  )
}

function TopicSidebar({ topic }) {
  return (
    <Stack maxW="280px" width="100%" spacing={2}>
      <Heading as="h2" size="sm">
        About this topic
      </Heading>
      {topic.count_lessons && (
        <Text>
          <b>{topic.count_lessons}</b> lessons
        </Text>
      )}
      {topic.count_hours && (
        <Text>
          <b>{topic.count_hours}</b> hours (estimated)
        </Text>
      )}
    </Stack>
  )
}
