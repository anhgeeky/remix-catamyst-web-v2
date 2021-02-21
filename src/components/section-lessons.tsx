import NextLink from 'next/link'
import {
  Box,
  Heading,
  Stack,
  Flex,
  Link,
  useColorModeValue,
} from '@chakra-ui/react'
import { LessonIcon } from '@/components'
import dataLessons from '@/data/lessons.json'

export default function SectionLessons({ data }) {
  const bg = useColorModeValue('white', 'gray.800')

  return (
    <Stack spacing={5}>
      {data.map((section, index) => {
        return (
          <Box
            key={index}
            bg={bg}
            boxShadow="xs"
            data-id="placeholder-image"
            p={5}
            spacing={5}
          >
            <Heading as="h3" size="md">
              {section.title}
            </Heading>

            <Stack mt={5}>
              {section.lessons.map((lessonId, index) => {
                const selectedLesson = dataLessons.find((lesson, index) => {
                  return lesson.id === lessonId
                })

                if (!selectedLesson) {
                  return <Link key={index}>Missing lesson</Link>
                } else {
                  return (
                    <NextLink
                      key={selectedLesson.slug}
                      href={`/lessons/${selectedLesson.slug}`}
                    >
                      <Flex align="center" cursor="pointer">
                        <LessonIcon type={selectedLesson.type} />
                        <Link ml={2}>{selectedLesson.title}</Link>
                      </Flex>
                    </NextLink>
                  )
                }
              })}
            </Stack>
          </Box>
        )
      })}
    </Stack>
  )
}
