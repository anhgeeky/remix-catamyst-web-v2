import { Heading, Text } from '@chakra-ui/react'
import { LayoutDefault } from '@/layouts'

export default function SignUp() {
  return (
    <LayoutDefault title="Create your Catamyst account">
      <Heading as="h1" size="xl">
        Sign up
      </Heading>
      <Text>Create your Catamyst account</Text>
    </LayoutDefault>
  )
}
