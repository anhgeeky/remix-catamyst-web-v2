import NextLink from 'next/link'
import {
  Box,
  Flex,
  Heading,
  Stack,
  HStack,
  useColorModeValue,
} from '@chakra-ui/react'
import slugify from 'slugify'

import { AlertSoon, CategoryBadge } from '@/components'

export default function CollectionTopics({ topics }) {
  const bg = useColorModeValue('white', 'gray.800')

  if (!topics || topics.length === 0) {
    return <AlertSoon text="No topics here yet. Coming soon!" />
  }
  return (
    <Stack spacing={5} width="100%">
      {topics.map((topic, index) => {
        const slug = topic.slug || slugify(topic.title, { lower: true })

        return (
          <NextLink key={topic.id} href={`/topics/${slug}`} passHref>
            <HStack
              bg={bg}
              boxShadow="xs"
              cursor="pointer"
              direction={{ base: 'column', sm: 'row' }}
              justify="space-between"
              p={5}
              rounded="md"
              _hover={{ boxShadow: 'outline' }}
            >
              <Heading as="h3" size="md">
                {topic.iconEmoji} {topic.title}
              </Heading>
              <Box>
                <CategoryBadge category={topic.category} />
              </Box>
            </HStack>
          </NextLink>
        )
      })}
    </Stack>
  )
}
