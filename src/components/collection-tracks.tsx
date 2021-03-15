import NextLink from 'next/link'
import NextImage from 'next/image'
import { useRouter } from 'next/router'
import {
  Box,
  Button,
  Heading,
  HStack,
  Link,
  Stack,
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
        const trackHref = `/learn/${track.slug}`

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
                  src={track.iconUrl}
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
                  {track.isAvailable && (
                    <NextLink href={trackHref} passHref>
                      <Button
                        as={Link}
                        colorScheme="teal"
                        aria-label={`Choose ${track.title} track`}
                        _hover={{ textDecoration: 'none' }}
                      >
                        Open Track
                      </Button>
                    </NextLink>
                  )}
                  {!track.isAvailable && (
                    <Button
                      disabled
                      colorScheme="teal"
                      aria-label={`${track.title} is coming soon`}
                    >
                      Coming Soon
                    </Button>
                  )}
                </Stack>
              </WrapItem>
            </Wrap>
          </Box>
        )
      })}
    </VStack>
  )
}
