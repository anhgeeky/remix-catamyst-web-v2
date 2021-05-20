import NextHead from 'next/head'
import { useRouter } from 'next/router'
import { Text } from '@chakra-ui/react'

import { Layout } from '@layouts'
import { LessonDetails } from '@components/lessons'

/**
 * The full content page of each lesson
 * There are lesson blocks which use different component types such as:
 * text, image, video, link, code, etc
 */

export default function lessonSlugPage() {
  const router = useRouter()
  const { trackSlug, topicSlug, lessonSlug } = router.query

  return (
    <Layout title={`Loading lesson... · Catamyst`}>
      {(!trackSlug || !topicSlug || !lessonSlug) && (
        <>
          <NextHead>
            <title>Lesson not found · Catamyst</title>
          </NextHead>
          <Text>Sorry, lesson is not found.</Text>
        </>
      )}

      {trackSlug && topicSlug && lessonSlug && (
        <LessonDetails
          trackSlug={trackSlug}
          topicSlug={topicSlug}
          lessonSlug={lessonSlug}
        />
      )}
    </Layout>
  )
}
