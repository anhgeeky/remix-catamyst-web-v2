import Head from 'next/head'
import { useRouter } from 'next/router'
import {
  Badge,
  Box,
  Container,
  Flex,
  Heading,
  HStack,
  Stack,
  VStack,
} from '@chakra-ui/react'
import { Layout } from '@/layouts'
import { Hero, Content, LessonBlock, PaginationLessons } from '@/components'
import dataLessons from '@/data/lessons.json'
import React from 'react'

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
          <LessonHero lesson={lesson} />
          <Container width="100%" maxW="1440px" px={0} py={5}>
            {Array.isArray(lesson.blocks) && (
              <Stack align="center" spacing={5}>
                {(lesson.blocks as any[]).map((block, index) => {
                  return <LessonBlock key={index} block={block} />
                })}
                <PaginationLessons mode="full" />
              </Stack>
            )}
          </Container>
        </>
      )}
    </Layout>
  )
}

function LessonHero({ lesson }) {
  return (
    <Hero>
      <Box align="center" py={5}>
        <PaginationLessons mode="minimal">
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
  )
}
