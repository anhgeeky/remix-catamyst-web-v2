import NextHead from 'next/head'
import { Stack, Avatar, Heading, Text, Box } from '@chakra-ui/react'
import { Layout } from '@/layouts'
import { Hero, Content } from '@/components'
import users from '@/data/users.json'

export async function getServerSideProps(context) {
  const { handle } = context.params
  const user = users.find((user) => {
    return user.handle === handle
  })
  return {
    props: {
      handle,
      user,
    },
  }
}

export default function UserProfile({ handle, user }) {
  return (
    <Layout title={`Loading user profile...`}>
      {handle && user.handle && (
        <>
          <NextHead>
            <title>
              {user.name} (@{handle}) · Catamyst
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
