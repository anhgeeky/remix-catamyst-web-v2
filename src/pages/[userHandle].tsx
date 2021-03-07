import NextHead from 'next/head'
import { useRouter } from 'next/router'
import { Stack, Avatar, Heading, Text, Box } from '@chakra-ui/react'
import { Layout } from '@layouts'
import { Content } from '@components'

import dataUsers from '@data/users.json'

export default function UserProfile() {
  const router = useRouter()
  const { userHandle } = router.query
  const user = dataUsers.find((user) => user.handle === userHandle)

  return (
    <Layout title={`Loading user profile... · Catamyst`}>
      {!user && (
        <div>
          <h1>@{userHandle}</h1>
          <p>This account doesn’t exist.</p>
        </div>
      )}
      {user && (
        <>
          <NextHead>
            <title>
              {user.name} (@{user.handle}) · Catamyst
            </title>
          </NextHead>

          <Content>
            <Stack maxW="1200px" align="center">
              <Avatar name={user.name} size="xl" />

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
              <Text>{user.bio}</Text>
            </Stack>
          </Content>
        </>
      )}
    </Layout>
  )
}
