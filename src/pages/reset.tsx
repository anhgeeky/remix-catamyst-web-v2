import { Heading, Text } from '@chakra-ui/react'

import { Layout } from '@layouts'
import { Hero, Content } from '@components'

export default function resetPasswordPage() {
  return (
    <Layout title="Reset your Catamyst account's password">
      <Hero>
        <Heading as="h1" size="xl">
          Reset password
        </Heading>
        <Text>Send a password reset link to your email</Text>
      </Hero>
    </Layout>
  )
}
