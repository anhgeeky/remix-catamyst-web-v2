import NextHead from 'next/head'
import { useRouter } from 'next/router'
import slugify from 'slugify'
import { Heading, Text, Stack } from '@chakra-ui/react'

import { Layout } from '@/layouts'
import { Hero, ContentWithSidebar, SectionsLessons } from '@/components'
import dataTopics from '@/data/topics.json'

export default function TopicBySlug() {
  const router = useRouter()
  const { trackSlug, topicSlug } = router.query

  const topic = dataTopics.find((topic) => {
    if (topic.slug) {
      return topicSlug === topic.slug
    } else {
      return topicSlug === slugify(topic.title, { lower: true })
    }
  })

  return (
    <Layout title={`Loading topic...`}>
      {topic && (
        <>
          <NextHead>
            <title>
              {topic.title} · {trackSlug} · Catamyst
            </title>
          </NextHead>
          <TopicHero topic={topic} />
          <ContentWithSidebar>
            <TopicSidebar topic={topic} />
            <SectionsLessons
              trackSlug={trackSlug}
              topicSlug={topicSlug}
              sections={topic.sections}
            />
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
      <Text>{topic.description}</Text>
    </Hero>
  )
}

function TopicSidebar({ topic }) {
  return (
    <Stack maxW="280px" width="100%" spacing={2}>
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
