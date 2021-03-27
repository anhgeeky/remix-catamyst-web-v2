import { useState } from 'react'
import NextImage from 'next/image'
import NextLink from 'next/link'
import {
  Avatar,
  Box,
  Heading,
  HStack,
  Link,
  SimpleGrid,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'

import { ForumToolbar } from '@components/forum'
import { dataForumSections } from '@data'

export function ForumSections() {
  const sections = dataForumSections.filter((section) => section.isPublished)
  const [layout, setLayout] = useState('grid') // grid | row

  const handleToggleLayout = (layout) => {
    setLayout(layout)
  }

  return (
    <Stack spacing={5}>
      <ForumToolbar
        state={{ layout, sections }}
        actions={{ handleToggleLayout }}
      />

      {layout === 'grid' && <ForumSectionsGrid sections={sections} />}
      {layout === 'row' && <ForumSectionsRow sections={sections} />}
    </Stack>
  )
}

export function ForumSectionsGrid({ sections }) {
  return (
    <SimpleGrid spacing={3} width="100%" minChildWidth={280}>
      {sections.map((section, index) => {
        return (
          <NextLink key={index} href={`/forum/${section.slug}`} passHref>
            <Box
              as={Link}
              rounded="sm"
              boxShadow="base"
              bg={useColorModeValue('white', 'gray.800')}
              _hover={{ boxShadow: 'outline', textDecoration: 'none' }}
            >
              <Box
                height="50px"
                borderTopRadius="sm"
                bg={section.color || 'gray.500'}
                bgGradient={section.gradient}
              />
              <Stack px={3} pb={3} mt="-25px" align="flex-start">
                <ForumSectionLogo section={section} size={50} fontSize="md" />
                <Heading as="h1" size="md">
                  {section.title}
                </Heading>
                <Text fontSize="xs">{section.description}</Text>
                <Text>{section.discussions.length} discussions</Text>
              </Stack>
            </Box>
          </NextLink>
        )
      })}
    </SimpleGrid>
  )
}

export function ForumSectionsRow({ sections }) {
  return (
    <Stack spacing={3}>
      {sections.map((section, index) => {
        return (
          <NextLink key={index} href={`/forum/${section.slug}`} passHref>
            <HStack
              as={Link}
              rounded="sm"
              boxShadow="base"
              bg={useColorModeValue('white', 'gray.800')}
              _hover={{ boxShadow: 'outline', textDecoration: 'none' }}
            >
              <ForumSectionLogo section={section} size={50} fontSize="md" />
              <Heading as="h1" size="md">
                {section.title}
              </Heading>
              <Text>{section.discussions.length} discussions</Text>
            </HStack>
          </NextLink>
        )
      })}
    </Stack>
  )
}

export function ForumSectionLogo({
  section,
  size = 100 || '100px',
  fontSize = 'xl',
}) {
  if (!section.logoUrl) {
    return (
      <Box bg={useColorModeValue('white', 'gray.800')} p={1} rounded="sm">
        <Avatar
          bg={section.color || 'gray.500'}
          name={section.title}
          width={size}
          height={size}
          size={fontSize}
          rounded="sm"
        />
      </Box>
    )
  }
  if (section.logoUrl) {
    return (
      <Box
        className="next-image-container"
        bg={useColorModeValue('white', 'gray.800')}
        p={1}
      >
        <NextImage
          className="next-image"
          src={section.logoUrl}
          width={size}
          height={size}
          layout="fixed"
        />
      </Box>
    )
  }
  return null
}