import Head from 'next/head'
import { useRouter } from 'next/router'
import slugify from 'slugify'
import { Heading, Text, Stack } from '@chakra-ui/react'
import { useSelector } from 'react-redux'

import { Layout } from '@/layouts'
import { Hero, ContentWithSidebar, SectionsLessons } from '@/components'
import dataTopics from '@/data/topics.json'

export default function TopicBySlug() {
  const router = useRouter()
  const { slug } = router.query

  const topic = dataTopics.find((topic) => {
    if (topic.slug) {
      return slug === topic.slug
    } else {
      return slug === slugify(topic.title, { lower: true })
    }
  })

  return (
    <Layout title={`Loading topic...`}>
      {slug && topic && (
        <>
          <Head>
            <title>{topic.title} · Topic · Catamyst</title>
          </Head>
          <TopicHero topic={topic} />
          <ContentWithSidebar>
            <TopicSidebar topic={topic} />
            <SectionsLessons sections={topic.sections} />
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
      <Heading as="h2" size="sm">
        Topic contains:
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
