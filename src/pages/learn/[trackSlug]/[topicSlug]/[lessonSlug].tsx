import { useState, useEffect } from 'react'
import NextHead from 'next/head'
import { useRouter } from 'next/router'
import {
  Badge,
  Box,
  Container,
  Heading,
  HStack,
  Stack,
  VStack,
} from '@chakra-ui/react'

import { Layout } from '@/layouts'
import { Hero, Block, PaginationLessons } from '@/components'
import { usePaginationLessons } from '@/hooks'
import dataTracks from '@/data/tracks.json'
import dataTopics from '@/data/topics.json'

/**
 * The full content page of each lesson
 * There are lesson blocks which use different component types such as:
 * text, image, video, link, code, etc
 */

export default function LessonBySlug() {
  const router = useRouter()
  const { trackSlug, topicSlug, lessonSlug } = router.query
  const { track, topic, lesson, prev, next } = usePaginationLessons({
    trackSlug,
    topicSlug,
    lessonSlug,
  })

  return (
    <Layout title={`Loading lesson...`}>
      {track && topic && lesson && (
        <>
          <NextHead>
            <title>{lesson.title} · Lesson · Catamyst</title>
          </NextHead>

          <Hero>
            <Box align="center" py={5}>
              <PaginationLessons
                mode="minimal"
                track={track}
                topic={topic}
                prev={prev}
                next={next}
              >
                <VStack>
                  <Heading as="h1" size="xl" textAlign="center">
                    {lesson.title}
                  </Heading>
                  <HStack>
                    <Badge>Level: {lesson.level}</Badge>
                    <Badge>Type: {lesson.type}</Badge>
                  </HStack>
                </VStack>
              </PaginationLessons>
            </Box>
          </Hero>
          <Container id="content-lesson" width="100%" maxW="1440px" pt={5}>
            <Stack align="center" spacing={10}>
              <Stack align="center" spacing={5}>
                {(lesson?.blocks as any[]).map((block, index) => {
                  return <Block key={index} block={block} />
                })}
              </Stack>
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
      )}
    </Layout>
  )
}
