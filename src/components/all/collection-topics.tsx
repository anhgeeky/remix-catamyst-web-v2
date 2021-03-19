import NextLink from 'next/link'
import {
  Box,
  Heading,
  Stack,
  Link,
  HStack,
  useColorModeValue,
} from '@chakra-ui/react'
import slugify from 'slugify'

import { AlertSoon, LearningTag } from '@components'

export function CollectionTopics({ trackSlug, topics }) {
  const bg = useColorModeValue('white', 'gray.800')

  if (!topics || topics.length === 0) {
    return <AlertSoon text="No topics here yet. Coming soon!" />
  }
  return (
    <Stack spacing={5} width="100%">
      {topics &&
        topics.map((topic) => {
          const topicSlug =
            topic.slug || slugify(topic.title || '', { lower: true })
          const topicHref = `${trackSlug}/${topicSlug}`

          return (
            <NextLink key={topic.id} href={topicHref} passHref>
              <HStack
                as={Link}
                bg={bg}
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
                <Heading as="h3" size="md">
                  {topic.iconEmoji || '🐈'} {topic.title}
                </Heading>
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
