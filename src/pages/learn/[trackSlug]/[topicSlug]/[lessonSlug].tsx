import NextHead from 'next/head'
import { useRouter } from 'next/router'
import {
  Box,
  Container,
  Heading,
  HStack,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react'

import { Layout } from '@layouts'
import { Hero, LearningTag, PaginationLessons, AlertSoon } from '@components'
import { Block } from '@components/blocks'
import { usePaginationLessons } from '@hooks'

/**
 * The full content page of each lesson
 * There are lesson blocks which use different component types such as:
 * text, image, video, link, code, etc
 */

export default function lessonSlugPage() {
  const router = useRouter()
  const { trackSlug, topicSlug, lessonSlug } = router.query
  const { track, topic, lesson, prev, next } = usePaginationLessons({
    trackSlug,
    topicSlug,
    lessonSlug,
  })

  /**
   * Also handle when there is no `blocks`
   */
  return (
    <Layout title={`Loading lesson... · Catamyst`}>
      {(!track || !topic || !lesson) && (
        <>
          <NextHead>
            <title>Lesson not found · Catamyst</title>
          </NextHead>
          <Text>Sorry, lesson is not found.</Text>
        </>
      )}

      {track && topic && lesson && (
        <>
          <NextHead>
            <title>{lesson.title} · Lesson · Catamyst</title>
          </NextHead>

          <Hero>
            <Box id="lesson-hero" align="center" py={5}>
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
                    {lesson.category && (
                      <LearningTag category={lesson.category} />
                    )}
                    {lesson.level && <LearningTag category={lesson.level} />}
                  </HStack>
                </VStack>
              </PaginationLessons>
            </Box>
          </Hero>

          <Container
            id="lesson-content"
            width="100%"
            maxW="1500px"
            pt={5}
            px={0}
          >
            <Stack align="center" spacing={10}>
              {lesson.isPublished !== false && (
                <Stack
                  id="lesson-blocks"
                  align="center"
                  width="100%"
                  spacing={5}
                >
                  {/* No maxW in Stack, ImageBlock could be full width */}
                  {lesson?.blocks &&
                    (lesson.blocks as any[]).map((block, index) => {
                      return <Block key={index} block={block} />
                    })}
                  {(!lesson?.blocks || lesson.blocks.length === 0) && (
                    <Box width="100%" maxW={760} px={5}>
                      <AlertSoon />
                    </Box>
                  )}
                </Stack>
              )}
              {lesson.isPublished === false && (
                <Stack
                  id="lesson-blocks"
                  align="center"
                  width="100%"
                  spacing={5}
                >
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
      )}
    </Layout>
  )
}
