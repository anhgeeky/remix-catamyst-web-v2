import NextLink from 'next/link'
import {
  Box,
  Heading,
  Stack,
  Flex,
  Link,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'

import { AlertSoon, LessonIcon } from '@components'
import dataLessons from '@data/lessons.json'

export function CollectionLessons({ trackSlug, topicSlug, sections }) {
  const bg = useColorModeValue('white', 'gray.800')

  if (!sections || sections.length === 0) {
    return <AlertSoon text="The lessons in this topic are coming soon!" />
  }
  return (
    <Stack spacing={5} width="100%">
      {sections &&
        sections.map((section, index) => {
          return (
            <Box
              as="section"
              key={index}
              bg={bg}
              rounded="md"
              boxShadow="xs"
              p={5}
            >
              <Stack>
                {section.lessons.map((lessonId, index) => {
                  const lesson = dataLessons.find((lesson, index) => {
                    return lesson.id === lessonId
                  })
                  if (lesson?.isPublished === false) {
                    return null
                  }
                  if (!lesson) {
                    return (
                      <Text key={index}>Lesson {index + 1} is coming soon</Text>
                    )
                  }
                  if (lesson) {
                    const lessonHref = `/learn/${trackSlug}/${topicSlug}/${lesson.slug}`

                    return (
                      <>
                        {index === 0 && (
                          <Heading as="h3" size="md">
                            <Link href={lessonHref}>{section.title}</Link>
                          </Heading>
                        )}
                        <NextLink key={lesson.slug} href={lessonHref} passHref>
                          <Link rounded="md">
                            <Flex align="center" cursor="pointer">
                              <LessonIcon type={lesson.category} />
                              <Text ml={2}>{lesson.title}</Text>
                            </Flex>
                          </Link>
                        </NextLink>
                      </>
                    )
                  }
                  return null
                })}
              </Stack>
            </Box>
          )
        })}
    </Stack>
  )
}