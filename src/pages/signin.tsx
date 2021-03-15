import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import { Heading, Text, Button } from '@chakra-ui/react'

import { Layout } from '@layouts'
import { Hero, Content, useToast } from '@components'
import { signIn } from '@features/auth/actions'
import { useRedirectDashboard } from '@hooks'

export default function signInPage() {
  const { isAuthorized } = useRedirectDashboard()

  const router = useRouter()
  const dispatch = useDispatch()
  const toast = useToast({ duration: 3000, isClosable: true })

  async function handleSignIn() {
    dispatch(signIn())
    await router.replace('/dashboard')
    toast({ title: 'Signed in. Welcome back!', status: 'success' })
  }

  return (
    <Layout title="Sign in to your Catamyst account">
      {!isAuthorized && (
        <>
          <Hero>
            <Heading as="h1" size="xl">
              Sign in
            </Heading>
            <Text>Use your Catamyst account</Text>
          </Hero>

          <Content>
            <Button colorScheme="teal" onClick={handleSignIn}>
              Instant sign in
            </Button>
          </Content>
        </>
      )}
    </Layout>
  )
}
