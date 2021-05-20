import NextHead from 'next/head'
import { useRouter } from 'next/router'
import { Text } from '@chakra-ui/react'

import { Layout } from '@layouts'
import { LessonSingle } from '@components/lessons'

/**
 * The full content page of each lesson
 * There are lesson blocks which use different component types such as:
 * text, image, video, link, code, etc
 */
export default function lessonSlugPage() {
  const router = useRouter()
  const { lessonSlug } = router.query

  return (
    <Layout title={`Loading lesson... · Catamyst`}>
      {lessonSlug && <LessonSingle lessonSlug={lessonSlug} />}
    </Layout>
  )
}
