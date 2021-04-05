import { Heading, Text } from '@chakra-ui/react'

import { Layout } from '@layouts'
import { Hero, Content } from '@components'
import { AuthSignIn } from '@components/auth'
import { useRedirectDashboard } from '@hooks'

export default function signInPage() {
  const { router, isAuthenticated } = useRedirectDashboard()

  return (
    <Layout title="Sign in to your Catamyst account">
      {!isAuthenticated && (
        <>
          <Hero>
            <Heading as="h1" size="xl">
              Sign in
            </Heading>
            <Text>Use your Catamyst account</Text>
          </Hero>
          <Content>
            <AuthSignIn router={router} />
          </Content>
        </>
      )}
    </Layout>
  )
}
