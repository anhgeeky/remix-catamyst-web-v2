import { useRouter } from 'next/router'
import {
  Box,
  Button,
  Heading,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'
import { v4 as uuidv4 } from 'uuid'

export default function CollectionTracks({ data }) {
  const router = useRouter()
  const bg = useColorModeValue('white', 'gray.800')

  return (
    <Stack spacing={5} align="flex-start">
      {data.map((track, index) => {
        const uuid = uuidv4()
        return (
          <Stack
            key={uuid}
            borderRadius="md"
            boxShadow="base"
            bg={bg}
            p={5}
            spacing={5}
            align="flex-start"
            direction={{ base: 'column', lg: 'row' }}
          >
            <Box
              data-id="placeholder-image"
              borderRadius="md"
              bg="black"
              width="100px"
              height="100px"
            />
            <Stack>
              <Heading as="h2" size="xl">
                {track.title}
              </Heading>
              <Text maxW="xl" fontSize={['sm', 'md', 'lg']}>
                {track.description}
              </Text>
            </Stack>
            <Button
              size="lg"
              // maxW="360px"
              colorScheme="teal"
              aria-label={`Choose ${track.title} track`}
              onClick={() => router.push(`/tracks/${track.slug}`)}
            >
              Choose Track
            </Button>
          </Stack>
        )
      })}
    </Stack>
  )
}
