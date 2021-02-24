import Head from 'next/head'
import { useRouter } from 'next/router'
import {
  Box,
  Stack,
  HStack,
  Flex,
  Heading,
  Badge,
  Container,
} from '@chakra-ui/react'
import { Layout } from '@/layouts'
import { Hero, LessonBlock } from '@/components'
import dataLessons from '@/data/lessons.json'

/**
 * The full content page of each lesson
 * There are lesson blocks which use different component types such as:
 * text, image, video, link, code, etc
 */

export default function LessonBySlug() {
  const router = useRouter()
  const { slug } = router.query

  const lesson = dataLessons.find((lesson) => {
    return lesson.slug === slug
  })

  return (
    <Layout title={`Loading lesson...`}>
      {slug && lesson && (
        <>
          <Head>
            <title>{lesson.title} · Lesson · Catamyst</title>
          </Head>

          <Hero>
            <Stack align="center">
              <Heading as="h1" size="xl" textAlign="center">
                {lesson.title}
              </Heading>
              <HStack>
                <Badge>Level: {lesson.level}</Badge>
                <Badge>Type: {lesson.type}</Badge>
              </HStack>
            </Stack>
          </Hero>

          <Container maxW="1200px" px={0} py={10}>
            {Array.isArray(lesson.blocks) && (
              <Stack align="center" spacing={5}>
                {(lesson.blocks as any[]).map((block, index) => {
                  return <LessonBlock key={index} block={block} />
                })}
              </Stack>
            )}
          </Container>
        </>
      )}
    </Layout>
  )
}
