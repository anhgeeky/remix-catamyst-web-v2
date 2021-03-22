import NextLink from 'next/link'
import NextImage from 'next/image'
import { useRouter } from 'next/router'
import {
  Box,
  Button,
  Heading,
  HStack,
  Link,
  Text,
  Stack,
  VStack,
  Wrap,
  WrapItem,
  useColorModeValue,
} from '@chakra-ui/react'
import { v4 as uuidv4 } from 'uuid'

import { AlertSoon } from '@components'

export function CollectionTracks({ tracks }) {
  const router = useRouter()
  const bg = useColorModeValue('white', 'gray.800')

  return (
    <VStack spacing={5} align="stretch">
      {tracks.map((track, index) => {
        const uuid = uuidv4()
        const trackHref = `/learn/${track.slug}`
        // track.isAvailable

        return (
          <NextLink key={uuid} href={trackHref} passHref>
            <Link
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
                    <Text maxW={550}>{track.description}</Text>
                    {track.isAvailable && (
                      <Text>
                        <span>
                          <b>{track.topics.length}</b>
                          {' topics · '}
                        </span>
                        <span>
                          <b>{track.totalLessons}</b>
                          {' lessons · '}
                        </span>
                        <span>
                          <b>{track.totalHours}</b>
                          {' hours (estimated)'}
                        </span>
                      </Text>
                    )}
                    {!track.isAvailable && (
                      <AlertSoon text="This track is coming soon!" />
                    )}
                  </Stack>
                </WrapItem>
              </Wrap>
            </Link>
          </NextLink>
        )
      })}
    </VStack>
  )
}
