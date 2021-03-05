import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import {
  useToast,
  Flex,
  Heading,
  Box,
  Text,
  Container,
  Button,
} from '@chakra-ui/react'
import { Layout } from '@layouts'
import { Hero } from '@components'
import { signIn } from '@features/auth/actions'

export default function SignIn() {
  const router = useRouter()
  const dispatch = useDispatch()
  const toast = useToast()

  async function handleSignIn() {
    dispatch(signIn())
    await router.replace('/dashboard')
    toast({
      title: 'Signed in. Welcome back!',
      status: 'success',
      duration: 3000,
      isClosable: true,
      position: 'bottom-left',
    })
  }

  return (
    <Layout title="Sign in to your Catamyst account">
      <Hero>
        <Heading as="h1" size="xl">
          Sign in
        </Heading>
        <Text>Use your Catamyst account</Text>
      </Hero>

      <Container maxW="1200px" pt={5}>
        <Button colorScheme="teal" onClick={handleSignIn}>
          Instant sign in
        </Button>
      </Container>
    </Layout>
  )
}
