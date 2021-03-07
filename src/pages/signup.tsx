import NextLink from 'next/link'
import { Heading, Text, Button } from '@chakra-ui/react'
import { Layout } from '@layouts'
import { Hero, Content } from '@components'
import { useRedirectDashboard } from '@hooks'

export default function SignUp() {
  const { isAuthorized } = useRedirectDashboard()

  return (
    <Layout title="Create your Catamyst account">
      {!isAuthorized && (
        <>
          <Hero>
            <Heading as="h1" size="xl">
              Sign up
            </Heading>
            <Text>Create your Catamyst account</Text>
          </Hero>

          <Content>
            <Text>(Sign up form)</Text>
            <NextLink href="/signin">
              <Button>Sign in instead</Button>
            </NextLink>
          </Content>
        </>
      )}
    </Layout>
  )
}
