import { Heading, Text } from '@chakra-ui/react'

import { Layout } from '@layouts'
import { Hero, Content } from '@components'
import { AuthSignUp } from '@components/auth'
import { useRedirectDashboard } from '@hooks'

export default function signUpPage() {
  const { auth, isAuthenticated } = useRedirectDashboard()

  return (
    <Layout title="Create your Catamyst account">
      {!isAuthenticated && (
        <>
          <Hero>
            <Heading as="h1" size="xl">
              Sign up
            </Heading>
            <Text>Create your Catamyst account</Text>
          </Hero>

          <Content>
            <AuthSignUp auth={auth} />
          </Content>
        </>
      )}
    </Layout>
  )
}
