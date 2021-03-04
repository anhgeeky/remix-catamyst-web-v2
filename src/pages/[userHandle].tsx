import NextHead from 'next/head'
import { useRouter } from 'next/router'
import { Stack, Avatar, Heading, Text, Box } from '@chakra-ui/react'
import { Layout } from '@/layouts'
import { Content } from '@/components'

import dataUsers from '@/data/users.json'

export default function UserProfile() {
  const router = useRouter()
  const { userHandle } = router.query
  const user = dataUsers.find((user) => user.handle === userHandle)

  return (
    <Layout title={`Loading user profile...`}>
      {user && (
        <>
          <NextHead>
            <title>
              {user.name} (@{user.handle}) · Catamyst
            </title>
          </NextHead>

          <Content>
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
          </Content>
        </>
      )}
    </Layout>
  )
}
