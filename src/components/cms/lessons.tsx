import NextLink from 'next/link'
import NextHead from 'next/head'
import { useRouter } from 'next/router'
import {
  Heading,
  HStack,
  Stack,
  StackDivider,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'

import { Content, LearningTag, useToast } from '@/components'
import { CMSHero, CMSToolbar } from '@/components/cms'
import { mutateSWR, useLessons, fetcherSWR } from '@/hooks'
import { trimId } from '@/utils'
import { supabase } from '@/lib'

export function CMSLessons({ state }) {
  const toast = useToast()
  const router = useRouter()
  const { data, isLoading, isError } = useLessons(state.session?.access_token)

  /**
   * Request to Supabase because need authorization.
   */
  const handleCreateItem = async () => {
    try {
      const { data, error } = await supabase.from('lessons').insert({}).single()
      if (error) throw error

      router.push(`/cms/lessons/${data.id}`)
      toast({ status: 'success', title: 'Created new lesson!' })
    } catch (error) {
      console.error(error)
      toast({ status: 'error', title: 'Failed to create new lesson!' })
    }
  }

  /**
   * Request to API because no authorization.
   * Also mutate data via SWR.
   */
  const handleSearchItems = async (query) => {
    const newData = await fetcherSWR(`/api/lessons?q=${query}`)
    mutateSWR('/api/lessons', newData, false)
  }

  if (isLoading) {
    return (
      <CMSHero>
        <Heading as="h1" size="xl">
          Lessons CMS
        </Heading>
        <Text>Loading all lessons...</Text>
      </CMSHero>
    )
  }
  if (!isLoading && isError) {
    return (
      <CMSHero>
        <Heading as="h1" size="xl">
          Lessons error
        </Heading>
        <Text>Failed to get all lessons.</Text>
      </CMSHero>
    )
  }
  if (!isLoading && !data) {
    return (
      <CMSHero>
        <Heading as="h1" size="xl">
          Lessons not found
        </Heading>
        <Text>Lessons are empty.</Text>
      </CMSHero>
    )
  }
  return (
    <>
      <NextHead>
        <title>Lessons CMS · Catamyst</title>
      </NextHead>

      <CMSHero>
        <Heading as="h1" size="xl">
          Lessons CMS
        </Heading>
        <Text>All {data.lessons?.length} lessons in a table.</Text>
      </CMSHero>

      <Content>
        <CMSToolbar
          labels={{
            create: 'Create new lesson',
            search: 'Search for existing lessons',
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
          <HStack spacing={3} p={3} fontWeight="700">
            <Text flex={1}>ID</Text>
            <Text flex={4}>Slug</Text>
            <Text flex={5}>Title</Text>
            <Text flex={2}>Category</Text>
            <Text flex={2}>Level</Text>
            <Text flex={1} textAlign="center">
              Published
            </Text>
          </HStack>

          {data.lessons &&
            data.lessons.map((lesson) => {
              return (
                <NextLink
                  key={lesson.slug}
                  href={`/cms/lessons/${lesson.id}`}
                  passHref
                >
                  <a>
                    <HStack
                      spacing={3}
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
                        {trimId(lesson.id)}
                      </Text>
                      <Text flex={4} as="code" fontSize="xs">
                        {lesson.slug}
                      </Text>
                      <Text flex={5}>{lesson.title}</Text>
                      <Text flex={2}>
                        <LearningTag category={lesson.category} />
                      </Text>
                      <Text flex={2}>
                        <LearningTag category={lesson.level} />
                      </Text>
                      <Text flex={1} textAlign="center">
                        {lesson.is_published ? (
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
