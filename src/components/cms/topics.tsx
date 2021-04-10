import NextHead from 'next/head'
import NextImage from 'next/image'
import NextLink from 'next/link'
import {
  Box,
  Heading,
  HStack,
  Stack,
  StackDivider,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'

import { Content, LearningTag, useToast } from '@components'
import { CMSHero, CMSToolbar } from '@components/cms'
import { useSWR, fetcher } from '@hooks'

export function CMSTopics() {
  const { data, error } = useSWR('/api/topics', fetcher)
  const toast = useToast()

  const handleCreateItem = () => {
    toast({ status: 'success', title: 'Created new topic!' })
  }

  const handleSearchItems = () => {
    // Don't do toast
  }

  if (error) {
    return (
      <CMSHero>
        <Heading as="h1" size="xl">
          Topics not found
        </Heading>
        <Text>Topics are empty.</Text>
      </CMSHero>
    )
  }
  if (!data) {
    return (
      <CMSHero>
        <Heading as="h1" size="xl">
          Topics CMS
        </Heading>
        <Text>Loading all topics...</Text>
      </CMSHero>
    )
  }
  return (
    <>
      <NextHead>
        <title>Topics CMS · Catamyst</title>
      </NextHead>

      <CMSHero>
        <Heading as="h1" size="xl">
          Topics CMS
        </Heading>
        <Text>All {data.topics.length} topics.</Text>
      </CMSHero>

      <Content>
        <CMSToolbar
          labels={{
            create: 'Create new topic',
            search: 'Search for existing topics',
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
            <Text flex={1}>Emoji</Text>
            <Text flex={1}>Icon</Text>
            <Text flex={5}>Title</Text>
            <Text flex={3}>Slug</Text>
            <Text flex={2}>Category</Text>
            <Text flex={1} textAlign="right">
              Sections
            </Text>
            <Text flex={1} textAlign="right">
              Lessons
            </Text>
            <Text flex={1} textAlign="right">
              Hours
            </Text>
          </HStack>

          {data.topics.map((topic) => {
            return (
              <NextLink
                key={topic.slug}
                href={`/cms/topics/${topic.id}`}
                passHref
              >
                <a>
                  <HStack
                    p={3}
                    rounded="md"
                    _hover={{ bg: useColorModeValue('teal.100', 'teal.900') }}
                  >
                    <Text flex={1}>{topic.id}</Text>
                    <Text flex={1}>{topic.iconEmoji || '🐈'}</Text>
                    <Box flex={1} className="next-image-container">
                      <NextImage
                        src="/assets/logos/catamyst-avatar.svg"
                        alt="Icon"
                        aria-label={`Icon of ${topic.title}`}
                        width={30}
                        height={30}
                        layout="fixed"
                      />
                    </Box>
                    <Text flex={5}>{topic.title}</Text>
                    <Text flex={3} as="code" fontSize="xs">
                      {topic.slug}
                    </Text>
                    <Text flex={2}>
                      <LearningTag category={topic.category} />
                    </Text>
                    <Text flex={1} textAlign="right">
                      {topic.sections?.length || '-'}
                    </Text>
                    <Text flex={1} textAlign="right">
                      {topic.totalLessons || '-'}
                    </Text>
                    <Text flex={1} textAlign="right">
                      {topic.totalHours || '-'}
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
