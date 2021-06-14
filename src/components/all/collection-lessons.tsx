import NextLink from 'next/link'
import {
  chakra,
  Box,
  Heading,
  Stack,
  Flex,
  Link,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'

import { AlertSoon, LessonIcon } from '@components'
import { dataLessons } from '@data'

export function CollectionLessons({ trackSlug, topicSlug, sections }) {
  const bg = useColorModeValue('white', 'gray.800')

  if (!sections || sections?.length === 0) {
    return (
      <AlertSoon>The lessons in this topic are still in progress.</AlertSoon>
    )
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
              <Stack spacing={0}>
                {section.lessons.map((lessonId, index) => {
                  const lesson = dataLessons.find(
                    (lesson) => lesson.id === lessonId
                  )

                  if (lesson?.is_published === false) {
                    return null
                  }

                  if (!lesson) {
                    return <Text key={index}>Lesson {index + 1} is hidden</Text>
                  }

                  if (lesson) {
                    const lessonHref = `/learn/${trackSlug}/${topicSlug}/${lesson.slug}`

                    return (
                      <Box key={lesson.slug}>
                        {index === 0 && (
                          <NextLink href={lessonHref} passHref>
                            <Link display="block" rounded="md">
                              <Heading as="h3" size="md" mb={1} p={1}>
                                {section.title}
                              </Heading>
                            </Link>
                          </NextLink>
                        )}
                        <NextLink href={lessonHref} passHref>
                          <chakra.a display="block" rounded="md">
                            <Flex
                              rounded="md"
                              p={1}
                              align="center"
                              cursor="pointer"
                              _hover={{
                                backgroundColor: useColorModeValue(
                                  'gray.100',
                                  'black'
                                ),
                              }}
                            >
                              <LessonIcon type={lesson.category} />
                              <Text ml={2}>{lesson.title}</Text>
                            </Flex>
                          </chakra.a>
                        </NextLink>
                      </Box>
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
