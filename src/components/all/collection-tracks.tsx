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

export function CollectionTracks({ tracks }) {
  const [isTooSmall] = useMediaQuery('(max-width: 767px)')

  return (
    <VStack spacing={5}>
      <NextImage
        className="invertable next-image"
        key={isTooSmall ? 'mobile' : 'desktop'}
        src={`https://storage.catamyst.com/illustrations/tracks-${
          isTooSmall ? 'mobile' : 'desktop'
        }.png`}
        alt="Cat reading book with floating shapes"
        width={isTooSmall ? 170 : 200}
        height={isTooSmall ? 200 : 190}
      />
      <SimpleGrid
        // width="100%"
        spacing={5}
        minChildWidth={{ base: 280, sm: 420 }}
      >
        {tracks.map((track, index) => {
          return <TrackCard key={track.id} track={track} />
        })}
      </SimpleGrid>
    </VStack>
  )
}

export function TrackCard({ track }) {
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
        <Wrap spacing={5} direction={{ base: 'column', lg: 'row' }}>
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
            <Stack spacing={3}>
              <Heading as="h2" size="lg">
                {track.title}
              </Heading>
              <Text>{track.description}</Text>
              {track.isPublished && <TrackStats track={track} />}
              {!track.isPublished && (
                <AlertSoon>This track is coming soon.</AlertSoon>
              )}
            </Stack>
          </WrapItem>
        </Wrap>
      </Link>
    </NextLink>
  )
}

export function TrackStats({ track }) {
  return (
    <Flex flexWrap="wrap">
      <HStack mr={3} mb={1}>
        <Icon name="topics" />
        <span>{track.topics.length || 0} topics</span>
      </HStack>
      <HStack mr={3} mb={1}>
        <Icon name="lessons" />
        <span>{track.totalLessons || 0} lessons</span>
      </HStack>
      <HStack mr={3} mb={1}>
        <Icon name="hours" />
        <span>{track.totalHours || 0} hours of content</span>
      </HStack>
      <HStack mr={3} mb={1}>
        <Icon name="months" />
        <span>{track.totalMonths || 0} months to complete</span>
      </HStack>
    </Flex>
  )
}
