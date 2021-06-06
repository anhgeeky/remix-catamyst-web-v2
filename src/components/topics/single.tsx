import NextHead from 'next/head'
import { Heading, HStack, Stack, Text, Spinner, VStack } from '@chakra-ui/react'

import { Icon, ContentWithSidebar } from '@components'
import { LearnHero } from '@components/learn'
import { TopicIconTitleHeadingOne } from '@components/topics'
import { useTopicBySlug } from '@hooks'

export function TopicSingle({ topicSlug }) {
  const { data: topic, isLoading, isError } = useTopicBySlug(topicSlug)

  if (isLoading) {
    return (
      <LearnHero>
        <VStack py={5} spacing={5}>
          <Spinner />
        </VStack>
      </LearnHero>
    )
  }
  if (!topic) {
    return (
      <>
        <NextHead>
          <title>Topic not found · Catamyst</title>
        </NextHead>
        <LearnHero>
          <VStack py={5} spacing={5}>
            <Heading as="h1" size="xl">
              Sorry, topic is not found
            </Heading>
          </VStack>
        </LearnHero>
      </>
    )
  }
  if (isError) {
    return (
      <>
        <NextHead>
          <title>Topic error · Catamyst</title>
        </NextHead>
        <LearnHero>
          <VStack py={5} spacing={5}>
            <Heading as="h1" size="xl">
              Sorry, topic error
            </Heading>
          </VStack>
        </LearnHero>
      </>
    )
  }
  return (
    <div>
      <NextHead>
        <title>{topic.title} · Catamyst</title>
      </NextHead>

      <TopicHero topic={topic} />

      <ContentWithSidebar>
        <TopicSidebar topic={topic} />
        <Stack spacing={5} width="100%">
          {/* <CollectionTopics topicSlug={topicSlug} sections={topic.sections} /> */}
        </Stack>
      </ContentWithSidebar>
    </div>
  )
}

export function TopicHero({ topic }) {
  return (
    <LearnHero>
      <TopicIconTitleHeadingOne topic={topic} />
      <Text>{topic.description || <i>'No topic description yet.'</i>}</Text>
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
        <Icon name="topics" />
        <span>{topic.total_topics || 0} topics</span>
      </HStack>
      <HStack>
        <Icon name="hours" />
        <span>{topic.total_hours || 0} hours of content</span>
      </HStack>
      <HStack>
        <Icon name="months" />
        <span>
          {topic.total_days || 0} day{topic.total_days !== '1' && 's'} to
          complete
        </span>
      </HStack>
    </Stack>
  )
}
