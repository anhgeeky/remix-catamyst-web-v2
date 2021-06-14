import NextLink from 'next/link'
import { Box, Stack, Link, HStack, useColorModeValue } from '@chakra-ui/react'
import slugify from 'slugify'

import { AlertSoon, LearningTag } from '@components'
import { TopicIconTitleHeadingThree } from '@components/topics'

export function CollectionTopics({ trackSlug, topics }) {
  if (!topics || topics?.length === 0) {
    return (
      <AlertSoon>
        No topics here yet. This track is still in progress.
      </AlertSoon>
    )
  }

  return (
    <Stack spacing={3} width="100%">
      {topics &&
        topics.map((topic) => {
          const topicSlug =
            topic.slug || slugify(topic.title || '', { lower: true })
          const topicHref = `${trackSlug}/${topicSlug}`

          return (
            <NextLink key={topic.id} href={topicHref} passHref>
              <HStack
                as={Link}
                bg={useColorModeValue('white', 'gray.800')}
                boxShadow="xs"
                cursor="pointer"
                direction={{ base: 'column', sm: 'row' }}
                justify="space-between"
                rounded="md"
                p={5}
                _hover={{
                  boxShadow: 'outline',
                  textDecoration: 'none',
                }}
              >
                <TopicIconTitleHeadingThree topic={topic} />
                <Box>
                  <LearningTag category={topic.category} />
                </Box>
              </HStack>
            </NextLink>
          )
        })}
    </Stack>
  )
}
