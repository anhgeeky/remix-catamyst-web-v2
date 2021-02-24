import NextLink from 'next/link'
import {
  Badge,
  Box,
  Flex,
  Heading,
  Stack,
  useColorModeValue,
} from '@chakra-ui/react'
import slugify from 'slugify'

export default function CollectionTopics({ data }) {
  const bg = useColorModeValue('white', 'gray.800')

  return (
    <Stack spacing={5}>
      {data.map((topic, index) => {
        const slug = topic.slug || slugify(topic.title, { lower: true })

        return (
          <NextLink key={topic.id} href={`/topics/${slug}`}>
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
                    topic.category === 'general'
                      ? 'red'
                      : topic.category === 'preparation'
                      ? 'blue'
                      : topic.category === 'frontend'
                      ? 'yellow'
                      : topic.category === 'backend'
                      ? 'green'
                      : 'gray'
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
