import NextLink from 'next/link'
import NextHead from 'next/head'
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  InputGroup,
  Stack,
  StackDivider,
  Text,
  InputLeftElement,
  VisuallyHidden,
  useColorModeValue,
} from '@chakra-ui/react'
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'

import { Icon, Content, CategoryBadge, useToast } from '@components'
import { CMSHero } from '@components/cms'

import dataLessons from '@data/lessons.json'

export function CMSLessons() {
  const toast = useToast()

  const handleAddNewLesson = () => {
    toast({ status: 'success', title: 'Created new lesson!' })
  }

  return (
    <>
      <NextHead>
        <title>Lessons · CMS · Catamyst</title>
      </NextHead>

      <CMSHero>
        <Heading as="h1" size="xl">
          Lessons CMS
        </Heading>
        <Text>All {dataLessons.length} (300+) lessons.</Text>
      </CMSHero>

      <Content>
        <Stack direction="row">
          <Box>
            <VisuallyHidden>
              <FormLabel>Add new lesson</FormLabel>
            </VisuallyHidden>
            <Button
              colorScheme="teal"
              leftIcon={<Icon name="add" />}
              onClick={handleAddNewLesson}
            >
              Create new lesson
            </Button>
          </Box>
          <Box width="100%">
            <VisuallyHidden>
              <FormLabel>Search lesson by name</FormLabel>
            </VisuallyHidden>
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                children={<Icon name="search" />}
              />
              <Input type="text" placeholder="Search for existing lessons..." />
            </InputGroup>
          </Box>
        </Stack>

        <Stack
          mt={5}
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
          {dataLessons.map((lesson) => {
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
                      <CategoryBadge category={lesson.category} />
                    </Text>
                    <Text flex={2}>
                      <CategoryBadge category={lesson.level} />
                    </Text>
                    <Text flex={1} textAlign="center">
                      {lesson.isPublished ? (
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
