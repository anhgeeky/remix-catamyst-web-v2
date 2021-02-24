import Head from 'next/head'
import { useRouter } from 'next/router'
import { Stack, Avatar, Heading, Text, Box } from '@chakra-ui/react'
import { Layout } from '@/layouts'
import { Hero, Content } from '@/components'
import users from '@/data/users.json'

export async function getServerSideProps(context) {
  return {
    props: {}, // will be passed to the page component as props
  }
}

export default function UserProfile() {
  const router = useRouter()
  const { handle } = router.query

  const user = users.find((user, index) => {
    return user.handle === handle
  })

  return (
    <Layout title={`Loading user profile...`}>
      {user.handle && (
        <>
          <Head>
            <title>
              {user.name} (@{handle}) · Catamyst
            </title>
          </Head>

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
