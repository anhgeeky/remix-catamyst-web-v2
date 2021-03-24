import { Heading, Text } from '@chakra-ui/react'

import { Layout } from '@layouts'
import { Hero, Content } from '@components'
import { AuthSignUp } from '@components/auth'
import { useRedirectDashboard } from '@hooks'

export default function signUpPage() {
  const { router, isAuthorized } = useRedirectDashboard()

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
            <AuthSignUp router={router} />
          </Content>
        </>
      )}
    </Layout>
  )
}
