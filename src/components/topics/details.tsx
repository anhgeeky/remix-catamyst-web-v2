import NextHead from 'next/head'
import { Heading, HStack, Stack, Text } from '@chakra-ui/react'

import {
  BreadcrumbLinkButtons,
  Icon,
  ContentWithSidebar,
  CollectionLessons,
  PaginationTopics,
} from '@components'
import { LearnHero } from '@components/learn'
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
              {topic.title} · {track.title} · Catamyst
            </title>
          </NextHead>

          <TopicHero track={track} topic={topic} />

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

export function TopicHero({ track, topic }) {
  return (
    <LearnHero>
      <BreadcrumbLinkButtons
        breadcrumbs={[
          { href: `/learn`, title: 'Learn' },
          { href: `/learn/web`, title: 'Web' },
        ]}
      />
      <Heading as="h1" size="xl">
        {topic.iconEmoji} {topic.title}
      </Heading>
      <Text>{topic.description || 'No topic description yet.'}</Text>
    </LearnHero>
  )
}

export function TopicSidebar({ topic }) {
  return (
    <Stack maxW="280px" width="100%" spacing={1}>
      <Heading as="h2" size="sm">
        About this topic
      </Heading>
      <HStack>
        <Icon name="levels" />
        <Text>
          {topic.levels.map((level, index) => {
            if (index === topic.levels?.length - 1) {
              return <span key={index}>{level}</span>
            } else {
              return <span key={index}>{level}, </span>
            }
          })}
        </Text>
      </HStack>
      <HStack>
        <Icon name="lessons" />
        <span>{topic.totalLessons || 0} lessons</span>
      </HStack>
      <HStack>
        <Icon name="hours" />
        <span>{topic.totalHours || 0} hours of content</span>
      </HStack>
      <HStack>
        <Icon name="months" />
        <span>
          {topic.totalDays || 0} day{topic.totalDays !== '1' && 's'} to complete
        </span>
      </HStack>
    </Stack>
  )
}
