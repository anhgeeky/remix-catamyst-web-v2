import NextHead from 'next/head'
import { useRouter } from 'next/router'
import { Heading, Text, Stack } from '@chakra-ui/react'

import { Layout } from '@layouts'
import {
  Hero,
  ContentWithSidebar,
  CollectionLessons,
  PaginationTopics,
} from '@components'
import { usePaginationTopics } from '@hooks'

export function TopicDetails({ trackSlug, topicSlug }) {
  const { track, topic, prev, next } = usePaginationTopics({
    trackSlug,
    topicSlug,
  })

  return (
    <div>
      {(!track || !topic) && (
        <>
          <NextHead>
            <title>Topic not found · Catamyst</title>
          </NextHead>
          <Text>Sorry, topic is not found.</Text>
        </>
      )}
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
    </div>
  )
}

export function TopicHero({ topic }) {
  return (
    <Hero>
      <Heading as="h1" size="xl">
        {topic.iconEmoji} {topic.title}
      </Heading>
      <Text>{topic.description || 'No topic description yet.'}</Text>
    </Hero>
  )
}

export function TopicSidebar({ topic }) {
  return (
    <Stack maxW="280px" width="100%" spacing={0}>
      <Heading as="h2" size="sm">
        About this topic
      </Heading>
      {topic.totalLessons && (
        <Text>
          <b>{topic.totalLessons}</b> lessons
        </Text>
      )}
      {topic.totalHours && (
        <Text>
          <b>{topic.totalHours}</b> hours (estimated)
        </Text>
      )}
    </Stack>
  )
}
