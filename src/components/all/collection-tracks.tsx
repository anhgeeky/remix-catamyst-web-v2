import NextLink from 'next/link'
import NextImage from 'next/image'
import {
  Heading,
  HStack,
  Link,
  Text,
  Stack,
  VStack,
  Wrap,
  WrapItem,
  useColorModeValue,
  useMediaQuery,
} from '@chakra-ui/react'
import { v4 as uuidv4 } from 'uuid'

import { AlertSoon } from '@components'

export function CollectionTracks({ tracks }) {
  const [isTooSmall] = useMediaQuery('(max-width: 1000px)')

  return (
    <VStack spacing={5}>
      <NextImage
        key={isTooSmall ? 'mobile' : 'desktop'}
        src={`${process.env.NEXT_PUBLIC_STORAGE_URL}/illustrations/tracks-${
          isTooSmall ? 'mobile' : 'desktop'
        }.png`}
        alt="Cat reading book with floating shapes"
        width={isTooSmall ? 170 : 200}
        height={isTooSmall ? 200 : 190}
      />
      <VStack spacing={5} align="stretch">
        {tracks.map((track, index) => {
          const uuid = uuidv4()
          const trackHref = `/learn/${track.slug}`
          // track.isAvailable

          return (
            <NextLink key={uuid} href={trackHref} passHref>
              <Link
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
                            {' hours of content'}
                          </span>
                          <span>
                            <b>{track.totalMonths}</b>
                            {' months (estimated)'}
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
    </VStack>
  )
}
