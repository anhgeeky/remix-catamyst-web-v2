import NextLink from 'next/link'
import NextHead from 'next/head'
import {
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
import { useSWR, fetcherSWR } from '@hooks'

export function CMSLessons({ state }) {
  const { data, error } = useSWR('/api/lessons', fetcherSWR)
  const toast = useToast()

  const handleCreateItem = () => {
    toast({ status: 'success', title: 'Created new lesson!' })
  }

  const handleSearchItems = () => {
    /* Handle function */
  }

  if (error) {
    return (
      <CMSHero>
        <Heading as="h1" size="xl">
          Lessons not found
        </Heading>
        <Text>Lessons are empty.</Text>
      </CMSHero>
    )
  }
  if (!data) {
    return (
      <CMSHero>
        <Heading as="h1" size="xl">
          Lessons CMS
        </Heading>
        <Text>Loading all lessons...</Text>
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
        <Text>All {data.lessons?.length} (300+) lessons.</Text>
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
          <HStack p={3} fontWeight="700">
            <Text flex={1}>ID</Text>
            <Text flex={5}>Title</Text>
            <Text flex={3}>Slug</Text>
            <Text flex={2}>Category</Text>
            <Text flex={2}>Level</Text>
            <Text flex={1} textAlign="center">
              Published
            </Text>
          </HStack>

          {data.lessons.map((lesson, index) => {
            return (
              <NextLink
                key={lesson.slug}
                href={`/cms/lessons/${lesson.id}`}
                passHref
              >
                <a>
                  <HStack
                    p={3}
                    rounded="md"
                    _hover={{ bg: useColorModeValue('teal.100', 'teal.900') }}
                  >
                    <Text flex={1}>{lesson.id}</Text>
                    <Text flex={5}>{lesson.title}</Text>
                    <Text flex={3} as="code" fontSize="xs">
                      {lesson.slug}
                    </Text>
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
