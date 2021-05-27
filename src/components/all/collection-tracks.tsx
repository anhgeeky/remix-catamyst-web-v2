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
  Box,
  chakra,
  WrapItem,
  SimpleGrid,
  Flex,
  useColorModeValue,
  useMediaQuery,
} from '@chakra-ui/react'

import { Icon, AlertSoon } from '@components'
import { dataTracks } from '@data'

export function CollectionTracks({ tracks = dataTracks }) {
  const [isTooSmall] = useMediaQuery('(max-width: 767px)')

  return (
    <VStack spacing={5}>
      <SimpleGrid spacing={5} minChildWidth={{ base: 280, sm: 420 }}>
        {tracks.map((track, index) => {
          return <TrackCard key={track.slug} track={track} />
        })}
      </SimpleGrid>
    </VStack>
  )
}

export function TrackCard({ track }) {
  const isWebApp = track.slug === 'web-app'
  const trackIcon = `https://ik.imagekit.io/catamyst/tracks/${track.slug}.png`
  const trackIconWebApp = useColorModeValue(
    `https://ik.imagekit.io/catamyst/tracks/${track.slug}.png`,
    `https://ik.imagekit.io/catamyst/tracks/${track.slug}-dark.png`
  )

  return (
    <NextLink href={`/learn/${track.slug}`} passHref>
      <Link
        p={5}
        rounded="md"
        boxShadow="xs"
        bg={useColorModeValue('white', 'gray.800')}
        direction={{ base: 'column', sm: 'row' }}
        _hover={{
          boxShadow: 'outline',
          textDecoration: 'none',
        }}
      >
        <Stack spacing={5}>
          <Flex justify="center">
            <NextImage
              src={isWebApp ? trackIconWebApp : trackIcon}
              alt={`Icon of ${track.title}`}
              width={200}
              height={200}
              layout="fixed"
            />
          </Flex>
          <Stack spacing={3}>
            <Heading as="h2" size="lg" textAlign="center">
              {track.title}
            </Heading>
            <Text>{track.description}</Text>
            {track.is_published && <TrackStats track={track} />}
            {!track.is_published && (
              <AlertSoon>This track is still in progress.</AlertSoon>
            )}
          </Stack>
        </Stack>
      </Link>
    </NextLink>
  )
}

export function TrackStats({ track }) {
  return (
    <Flex flexWrap="wrap">
      <HStack mr={3} mb={1}>
        <Icon name="topics" />
        <span>{track.topics?.length || 0} topics</span>
      </HStack>
      <HStack mr={3} mb={1}>
        <Icon name="lessons" />
        <span>{track.total_lessons || 0} lessons</span>
      </HStack>
      <HStack mr={3} mb={1}>
        <Icon name="hours" />
        <span>{track.total_hours || 0} hours of content</span>
      </HStack>
      <HStack mr={3} mb={1}>
        <Icon name="months" />
        <span>{track.totalMonths || 0} months to complete</span>
      </HStack>
    </Flex>
  )
}
