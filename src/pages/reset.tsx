import NextLink from 'next/link'
import { Heading, Text, Input, Button, Link } from '@chakra-ui/react'

import { Layout } from '@layouts'
import { Hero } from '@components'

export default function resetPasswordPage() {
  return (
    <Layout title="Recover your password of Catamyst account">
      <Hero>
        <Heading as="h1" size="xl">
          Recover your password
        </Heading>
        <Text>
          Enter your email and we will send you instructions to setup a new
          password.
        </Text>
        <Input placeholder="yourname@example.com" />
        <Button>Send instructions</Button>
        <Text>This will send a password reset link to your email.</Text>
        <NextLink href="/signin" passHref>
          <Link color="teal.500">Back to sign in</Link>
        </NextLink>
      </Hero>
    </Layout>
  )
}
