import NextLink from 'next/link'
import { Heading, Text, Button } from '@chakra-ui/react'
import { Layout } from '@/layouts'
import { Hero, Content } from '@/components'

export default function SignUp() {
  return (
    <Layout title="Create your Catamyst account">
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
    </Layout>
  )
}
