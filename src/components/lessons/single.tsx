import NextHead from 'next/head'
import {
  Box,
  Container,
  Heading,
  HStack,
  Stack,
  Text,
  Spinner,
  VStack,
} from '@chakra-ui/react'

import { LearningTag, AlertSoon } from '@components'
import { LearnHero } from '@components/learn'
import { Block } from '@components/blocks'
import { useLessonBySlug } from '@hooks'

export function LessonSingle({ lessonSlug }) {
  const { data: lesson, isLoading, isError } = useLessonBySlug(lessonSlug)

  if (isLoading) {
    return (
      <LearnHero>
        <VStack py={5} spacing={5}>
          <Spinner />
        </VStack>
      </LearnHero>
    )
  }
  if (!lesson) {
    return (
      <>
        <NextHead>
          <title>Lesson not found · Catamyst</title>
        </NextHead>
        <LearnHero>
          <VStack py={5} spacing={5}>
            <Heading as="h1" size="xl">
              Sorry, lesson is not found
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
          <title>Lesson error · Catamyst</title>
        </NextHead>
        <LearnHero>
          <VStack py={5} spacing={5}>
            <Heading as="h1" size="xl">
              Sorry, lesson error
            </Heading>
          </VStack>
        </LearnHero>
      </>
    )
  }
  return (
    <>
      <NextHead>
        <title>{lesson.title} · Lesson · Catamyst</title>
      </NextHead>

      <LearnHero>
        <Stack id="lesson-hero" align="center" py={5} spacing={5}>
          <VStack textAlign="center">
            <Heading as="h1" size="xl">
              {lesson.title}
            </Heading>
            <HStack>
              {lesson.category && <LearningTag category={lesson.category} />}
              {lesson.level && <LearningTag category={lesson.level} />}
            </HStack>
          </VStack>
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
        </Stack>
      </Container>
    </>
  )
}
