import { useRouter } from 'next/router'
import { Stack, Avatar, Heading, Text, Box } from '@chakra-ui/react'
import { LayoutDefault } from '@/layouts'

export default function UserProfile() {
  const router = useRouter()
  const { handle } = router.query

  const user = {
    handle,
    name: String(handle),
    bio: `Bio of ${handle}.`,
  }

  return (
    <LayoutDefault title={`${user.name} (@${handle}) · Catamyst`}>
      {user.handle && (
        <Stack maxW="600px">
          <Avatar name={user.name} size="xl" />

          <Box>
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
          <Text>{user.bio}</Text>
        </Stack>
      )}
    </LayoutDefault>
  )
}
