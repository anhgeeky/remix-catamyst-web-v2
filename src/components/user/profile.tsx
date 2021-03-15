import NextImage from 'next/image'
import {
  Flex,
  Stack,
  Avatar,
  Heading,
  Text,
  Box,
  useColorModeValue,
} from '@chakra-ui/react'
import ReactHtmlParser from 'react-html-parser'

import { transformOptions } from '@components/blocks'

/**
 * User profile.
 * user.bioHtml is the same format with BlockTexts.
 */
export function UserProfile({ user }) {
  const defaultCoverUrl = `https://storage.catamyst.com/covers/forest.jpg`

  return (
    <>
      <Flex width="100vw" height="200px" align="center" justify="center">
        <Box
          className="next-image-cover-container"
          maxW="1200px"
          borderBottomLeftRadius="md"
          borderBottomRightRadius="md"
          bg={useColorModeValue('gray.100', 'gray.500')}
        >
          <NextImage
            alt={`Cover picture of ${user.name}`}
            src={user.coverUrl || defaultCoverUrl}
            objectFit="cover"
            layout="fixed"
            width="1200px"
            height="200px"
          />
        </Box>
      </Flex>

      <Flex justify="center" mt={-90}>
        <Stack maxW="760px" align="center" p={5}>
          <Box
            rounded="full"
            p={1}
            zIndex={1}
            bg={useColorModeValue('gray.50', 'gray.900')}
          >
            <Avatar name={user.name} src={user.avatarUrl} size="2xl" />
          </Box>

          <Box id="user-name-handle" textAlign="center">
            <Heading id="user-name" as="h1" size="lg">
              {user.name}
            </Heading>
            <Heading
              id="user-handle"
              as="h2"
              size="sm"
              color="gray.500"
              fontFamily="body"
              fontWeight="normal"
            >
              @{user.handle}
            </Heading>
          </Box>

          <Box id="user-bio" maxW={760}>
            {ReactHtmlParser(user.bioHtml, transformOptions)}
          </Box>
        </Stack>
      </Flex>
    </>
  )
}