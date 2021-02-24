import NextLink from 'next/link'
import {
  Badge,
  Box,
  Flex,
  Heading,
  HStack,
  Stack,
  useColorModeValue,
} from '@chakra-ui/react'
import React from 'react'

export default function CollectionTopics({ data }) {
  const bg = useColorModeValue('white', 'gray.800')

  return (
    <Stack spacing={5}>
      {data.map((topic, index) => {
        return (
          <NextLink key={topic.id} href={`/topics/${topic.slug}`}>
            <Flex
              bg={bg}
              boxShadow="xs"
              cursor="pointer"
              direction={{ base: 'column', md: 'row' }}
              justify="space-between"
              p={5}
              _hover={{ boxShadow: 'outline' }}
            >
              <Heading as="h3" size="md">
                {topic.iconEmoji} {topic.title}
              </Heading>
              <Box>
                <Badge
                  colorScheme={
                    topic.category === 'frontend' ? 'yellow' : 'gray'
                  }
                >
                  {topic.category}
                </Badge>
              </Box>
            </Flex>
          </NextLink>
        )
      })}
    </Stack>
  )
}
