import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import { useToast, Heading, Text, HStack, Button } from '@chakra-ui/react'
import { LayoutDefault } from '@/layouts'

import { signIn } from '@/features/auth/actions'

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
    <LayoutDefault title="Sign in to your Catamyst account">
      <Heading as="h1" size="xl">
        Sign in
      </Heading>
      <Text>Use your Catamyst account</Text>

      <HStack py={5} spacing={2}>
        <Button colorScheme="teal" onClick={handleSignIn}>
          Next
        </Button>
      </HStack>
    </LayoutDefault>
  )
}
