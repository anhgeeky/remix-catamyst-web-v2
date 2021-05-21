import NextHead from 'next/head'
import NextImage from 'next/image'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import {
  Box,
  Heading,
  HStack,
  Stack,
  StackDivider,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'

import { Content, LearningTag, useToast } from '@components'
import { CMSHero, CMSToolbar } from '@components/cms'
import { mutateSWR, useTopics, fetcherSWR } from '@hooks'
import { trimId } from '@utils'
import { supabase } from '@lib'

export function CMSTopics({ state }) {
  const toast = useToast()
  const router = useRouter()
  const { data, isLoading, isError } = useTopics()

  /**
   * Request to Supabase because need authorization.
   */
  const handleCreateItem = async () => {
    try {
      const { data, error } = await supabase.from('topics').insert({}).single()
      if (error) throw error

      router.push(`/cms/topics/${data.id}`)
      toast({ status: 'success', title: 'Created new topic!' })
    } catch (error) {
      console.error(error)
      toast({ status: 'error', title: 'Failed to create new topic!' })
    }
  }

  /**
   * Request to API because no authorization.
   * Also mutate data via SWR.
   */
  const handleSearchItems = async (query) => {
    const newData = await fetcherSWR(`/api/topics?q=${query}`)
    mutateSWR('/api/topics', newData, false)
  }

  if (isLoading) {
    return (
      <CMSHero>
        <Heading as="h1" size="xl">
          Topics CMS
        </Heading>
        <Text>Loading all topics...</Text>
      </CMSHero>
    )
  }
  if (!isLoading && isError) {
    return (
      <CMSHero>
        <Heading as="h1" size="xl">
          Topics error
        </Heading>
        <Text>Failed to get all topics.</Text>
      </CMSHero>
    )
  }
  if (!isLoading && !data) {
    return (
      <CMSHero>
        <Heading as="h1" size="xl">
          Topics not found
        </Heading>
        <Text>Topics are empty.</Text>
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
        <Text>All {data.topics?.length} topics.</Text>
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
            <Text flex={1} textAlign="center">
              Pub?
            </Text>
          </HStack>

          {data.topics.map((topic, index) => {
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
                    <Text
                      flex={1}
                      as="code"
                      fontSize="xs"
                      wordBreak="break-all"
                    >
                      {trimId(topic.id)}
                    </Text>
                    <Text flex={1}>{topic.icon_emoji || '🐈'}</Text>
                    <Box flex={1} className="next-image-container">
                      {topic.icon_url && (
                        <NextImage
                          src={topic.icon_url}
                          alt={`Icon of ${topic.title}`}
                          aria-label={`Icon of ${topic.title}`}
                          width={30}
                          height={30}
                          layout="fixed"
                        />
                      )}
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
                      {topic.total_lessons || '-'}
                    </Text>
                    <Text flex={1} textAlign="right">
                      {topic.total_hours || '-'}
                    </Text>
                    <Text flex={1} textAlign="center">
                      {topic.is_published ? (
                        <ViewIcon color="green.500" />
                      ) : (
                        <ViewOffIcon color="red.500" />
                      )}
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
