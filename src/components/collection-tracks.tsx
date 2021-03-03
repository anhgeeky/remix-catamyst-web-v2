import NextImage from 'next/image'
import { useRouter } from 'next/router'
import {
  Box,
  Button,
  Heading,
  Stack,
  HStack,
  Flex,
  Text,
  VStack,
  Wrap,
  WrapItem,
  useColorModeValue,
} from '@chakra-ui/react'
import { v4 as uuidv4 } from 'uuid'

export default function CollectionTracks({ tracks }) {
  const router = useRouter()
  const bg = useColorModeValue('white', 'gray.800')

  return (
    <VStack spacing={5} align="stretch">
      {tracks.map((track, index) => {
        const uuid = uuidv4()
        return (
          <Box key={uuid} rounded="md" boxShadow="base" bg={bg} p={5}>
            <Wrap
              as={HStack}
              spacing={5}
              direction={{ base: 'column', lg: 'row' }}
            >
              <WrapItem>
                <NextImage
                  alt={`Icon of ${track.title}`}
                  src="/assets/logos/catamyst-avatar.png"
                  width={100}
                  height={100}
                  layout="fixed"
                />
              </WrapItem>
              <WrapItem>
                <Stack align="flex-start">
                  <Heading as="h2" size="xl">
                    {track.title}
                  </Heading>
                  <Button
                    size="lg"
                    colorScheme="teal"
                    aria-label={`Choose ${track.title} track`}
                    onClick={() => router.push(`/tracks/${track.slug}`)}
                  >
                    Choose Track
                  </Button>
                </Stack>
              </WrapItem>
            </Wrap>
          </Box>
        )
      })}
    </VStack>
  )
}
