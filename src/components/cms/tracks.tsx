import NextLink from 'next/link'
import NextHead from 'next/head'
import { Content } from '@components'
import { CMSHero } from '@components/cms'
import {
  Heading,
  Box,
  HStack,
  Text,
  Image,
  useColorModeValue,
} from '@chakra-ui/react'
import dataTracks from '@data/tracks.json'

export function CMSTracks() {
  return (
    <>
      <NextHead>
        <title>Tracks · CMS · Catamyst</title>
      </NextHead>

      <CMSHero>
        <Heading as="h1" size="xl">
          Tracks CMS
        </Heading>
        <Text>All {dataTracks.length} tracks.</Text>
      </CMSHero>

      <Content>
        <Box>
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
          {dataTracks.map((track) => {
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
                    <Box flex={1}>
                      <Image
                        src="/assets/logos/catamyst-avatar.svg"
                        aria-label={`Icon of ${track.title}`}
                        alt="Icon"
                        width={30}
                        height={30}
                        layout="fixed"
                      />
                    </Box>
                    <Text flex={6}>{track.title}</Text>
                    <Text flex={2}>{track.slug}</Text>
                    <Text flex={1} textAlign="right">
                      {track.totalTopics || '-'}
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
        </Box>
      </Content>
    </>
  )
}
