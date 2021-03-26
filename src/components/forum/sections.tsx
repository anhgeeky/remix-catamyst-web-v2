import NextImage from 'next/image'
import NextLink from 'next/link'
import {
  Box,
  Stack,
  Avatar,
  SimpleGrid,
  Link,
  Heading,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'

import { ForumToolbar } from '@components/forum'
import { dataForumSections } from '@data'

export function ForumSections() {
  return (
    <Stack>
      <ForumToolbar></ForumToolbar>

      <SimpleGrid spacing={3} width="100%" minChildWidth={280}>
        {dataForumSections
          .filter((section) => section.isPublished)
          .map((section, index) => {
            return (
              <NextLink href={`/forum/${section.slug}`} passHref>
                <Box
                  as={Link}
                  rounded="sm"
                  boxShadow="base"
                  bg={useColorModeValue('white', 'gray.800')}
                  _hover={{ boxShadow: 'outline', textDecoration: 'none' }}
                >
                  <Box
                    bg={section.coverColor || 'gray.500'}
                    height="50px"
                    borderTopRadius="sm"
                  />
                  <Stack px={3} pb={3} mt="-25px" align="flex-start">
                    <ForumSectionLogo
                      section={section}
                      size={50}
                      fontSize="md"
                    />
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
