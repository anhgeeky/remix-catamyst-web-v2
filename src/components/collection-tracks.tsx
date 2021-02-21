import { useRouter } from 'next/router'
import {
  Box,
  Button,
  Heading,
  Stack,
  Text,
  VStack,
  Wrap,
  WrapItem,
  useColorModeValue,
} from '@chakra-ui/react'

export default function CollectionTracks({ data }) {
  const router = useRouter()
  const bg = useColorModeValue('white', 'gray.800')

  return (
    <Stack align="flex-start" spacing={5}>
      {data.map((track, index) => {
        return (
          <Wrap
            key={track.id}
            borderRadius="md"
            boxShadow="base"
            bg={bg}
            p={5}
            spacing={5}
            direction={{ base: 'column', lg: 'row' }}
          >
            <WrapItem as={Stack}>
              <Box
                data-id="placeholder-image"
                borderRadius="md"
                bg="black"
                width="100px"
                height="100px"
              />
            </WrapItem>
            <WrapItem as={Stack}>
              <Heading as="h2" size="xl">
                {track.title}
              </Heading>
              <Text maxW="680px" fontSize={['sm', 'lg']}>
                {track.description}
              </Text>
            </WrapItem>
            <WrapItem as={Stack}>
              <Button
                size="lg"
                colorScheme="teal"
                aria-label={`Join ${track.title} track`}
                onClick={() => router.push(`/tracks/${track.slug}`)}
              >
                Join Track
              </Button>
              <Stack opacity={0.5} fontSize="sm" spacing={0}>
                <Text>Newbie to Advanced</Text>
                <Text>
                  <b>20</b> members joined
                </Text>
                <Text>
                  <b>{track.topics.length}</b> topics
                </Text>
                <Text>
                  <b>120</b> lessons
                </Text>
              </Stack>
            </WrapItem>
          </Wrap>
        )
      })}
    </Stack>
  )
}
