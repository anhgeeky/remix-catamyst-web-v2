import NextHead from 'next/head'
import NextImage from 'next/image'
import NextLink from 'next/link'
import {
  Heading,
  Box,
  HStack,
  Text,
  Stack,
  StackDivider,
  useColorModeValue,
} from '@chakra-ui/react'

import { Content, useToast } from '@components'
import { CMSHero, CMSToolbar } from '@components/cms'
import { useSWR, fetcher } from '@hooks'

export function CMSTracks() {
  const { data, error } = useSWR('/api/tracks', fetcher)
  const toast = useToast()

  const handleCreateItem = () => {
    toast({ status: 'success', title: 'Created new track!' })
  }

  const handleSearchItems = () => {
    // Don't do toast
  }

  if (error) {
    return (
      <CMSHero>
        <Heading as="h1" size="xl">
          Tracks not found
        </Heading>
        <Text>Tracks are empty.</Text>
      </CMSHero>
    )
  }
  if (!data) {
    return (
      <CMSHero>
        <Heading as="h1" size="xl">
          Tracks CMS
        </Heading>
        <Text>Loading all tracks...</Text>
      </CMSHero>
    )
  }
  return (
    <>
      <NextHead>
        <title>Tracks CMS · Catamyst</title>
      </NextHead>

      <CMSHero>
        <Heading as="h1" size="xl">
          Tracks CMS
        </Heading>
        <Text>All {data.tracks?.length} tracks.</Text>
      </CMSHero>

      <Content>
        <CMSToolbar
          labels={{
            create: 'Create new track',
            search: 'Search for existing tracks',
          }}
          actions={{
            handleCreateItem,
            handleSearchItems,
          }}
        />

        <Stack
          divider={
            <StackDivider
              borderColor={useColorModeValue('gray.200', 'gray.700')}
            />
          }
        >
          <HStack p={3} fontWeight="700">
            <Text flex={1}>ID</Text>
            <Text flex={1}>Icon</Text>
            <Text flex={6}>Title</Text>
            <Text flex={2}>Slug</Text>
            <Text flex={1} textAlign="right">
              Topics
            </Text>
            <Text flex={1} textAlign="right">
              Lessons
            </Text>
            <Text flex={1} textAlign="right">
              Hours
            </Text>
          </HStack>

          {data.tracks.map((track) => {
            return (
              <NextLink
                key={track.slug}
                href={`/cms/tracks/${track.id}`}
                passHref
              >
                <a>
                  <HStack
                    p={3}
                    rounded="md"
                    _hover={{ bg: useColorModeValue('teal.100', 'teal.900') }}
                  >
                    <Text flex={1}>{track.id}</Text>
                    <Box flex={1} className="next-image-container">
                      <NextImage
                        src="/assets/logos/catamyst-avatar.svg"
                        alt="Icon"
                        aria-label={`Icon of ${track.title}`}
                        width={30}
                        height={30}
                        layout="fixed"
                      />
                    </Box>
                    <Text flex={6}>{track.title}</Text>
                    <Text flex={2}>{track.slug}</Text>
                    <Text flex={1} textAlign="right">
                      {track.topics?.length}
                    </Text>
                    <Text flex={1} textAlign="right">
                      {track.totalLessons || '-'}
                    </Text>
                    <Text flex={1} textAlign="right">
                      {track.totalHours || '-'}
                    </Text>
                  </HStack>
                </a>
              </NextLink>
            )
          })}
        </Stack>
      </Content>
    </>
  )
}
