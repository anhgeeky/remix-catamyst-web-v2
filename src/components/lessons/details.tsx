import NextHead from 'next/head'
import {
  Box,
  Container,
  Heading,
  HStack,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react'

import {
  BreadcrumbLinkButtons,
  LearningTag,
  PaginationLessons,
  AlertSoon,
} from '@/components'
import { LearnHero } from '@/components/learn'
import { Block } from '@/components/blocks'
import { usePaginationLessons } from '@/hooks'

export function LessonDetails({ trackSlug, topicSlug, lessonSlug }) {
  const { track, topic, lesson, prev, next } = usePaginationLessons({
    trackSlug,
    topicSlug,
    lessonSlug,
  })

  if (!lesson) {
    return null
  }
  return (
    <>
      <NextHead>
        <title>{lesson?.title} · Lesson · Catamyst</title>
      </NextHead>

      <LearnHero>
        <Stack id="lesson-hero" align="center" py={5} spacing={5}>
          <BreadcrumbLinkButtons
            breadcrumbs={[
              { href: `/learn`, title: 'Learn' },
              { href: `/learn/web`, title: 'Web' },
              { href: `/learn/web/getting-started`, title: 'Getting started' },
            ]}
          />
          <PaginationLessons
            mode="minimal"
            track={track}
            topic={topic}
            prev={prev}
            next={next}
          >
            <VStack textAlign="center">
              <Heading as="h1" size="xl">
                {lesson.title}
              </Heading>
              <HStack>
                {lesson.category && <LearningTag category={lesson.category} />}
                {lesson.level && <LearningTag category={lesson.level} />}
              </HStack>
            </VStack>
          </PaginationLessons>
          {lesson.description && <Text>{lesson.description}</Text>}
        </Stack>
      </LearnHero>

      <Container id="lesson-content" width="100%" maxW="1500px" pt={5} px={0}>
        <Stack align="center" spacing={10}>
          {lesson.is_published !== false && (
            <Stack id="lesson-blocks" align="center" width="100%" spacing={5}>
              {/* No maxW in Stack, ImageBlock could be full width */}
              {lesson?.blocks &&
                (lesson.blocks as any[]).map((block, index) => {
                  return <Block key={index} block={block} />
                })}
              {(!lesson?.blocks || lesson.blocks?.length === 0) && (
                <Box width="100%" maxW={760} px={5}>
                  <AlertSoon />
                </Box>
              )}
            </Stack>
          )}
          {lesson.is_published === false && (
            <Stack id="lesson-blocks" align="center" width="100%" spacing={5}>
              <AlertSoon />
            </Stack>
          )}
          <PaginationLessons
            mode="full"
            track={track}
            topic={topic}
            prev={prev}
            next={next}
          />
        </Stack>
      </Container>
    </>
  )
}
