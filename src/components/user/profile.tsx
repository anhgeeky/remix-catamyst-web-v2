import NextImage from 'next/image'
import {
  Flex,
  Stack,
  Avatar,
  Heading,
  Text,
  Image,
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
  const defaultCoverUrl = `${process.env.NEXT_PUBLIC_STORAGE_URL}/covers/grass.jpg`

  return (
    <>
      <Flex justify="center" px={1}>
        <Box
          className="next-image-cover-container"
          maxW="1200px"
          overflow="auto"
          borderBottomLeftRadius="md"
          borderBottomRightRadius="md"
          bg={useColorModeValue('gray.100', 'gray.500')}
        >
          <NextImage
            alt={`Cover picture of ${user.name}`}
            src={user.coverUrl || defaultCoverUrl}
            layout="fixed"
            objectFit="cover"
            width={1200}
            height={200}
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
