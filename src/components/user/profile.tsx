import { Stack, Avatar, Heading, Text, Box } from '@chakra-ui/react'
import ReactHtmlParser from 'react-html-parser'

import { transformOptions } from '@components/blocks'

/**
 * User profile.
 * user.bioHtml is the same format with BlockTexts.
 */
export function UserProfile({ user }) {
  return (
    <Stack maxW="1200px" align="center">
      <Avatar name={user.name} src={user.avatarUrl} size="xl" />

      <Box textAlign="center">
        <Heading as="h1" size="lg">
          {user.name}
        </Heading>
        <Heading
          as="h2"
          size="sm"
          color="gray.500"
          fontFamily="body"
          fontWeight="normal"
        >
          @{user.handle}
        </Heading>
      </Box>

      <Box>
        <Box maxW={760}>{ReactHtmlParser(user.bioHtml, transformOptions)}</Box>
      </Box>
    </Stack>
  )
}
