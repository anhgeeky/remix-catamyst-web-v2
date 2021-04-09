import NextLink from 'next/link'
import { Heading } from '@chakra-ui/react'

import { Layout } from '@layouts'
import { Hero, Content } from '@components'
import { AuthRecoverPassword } from '@components/auth'

export default function resetPasswordPage() {
  return (
    <Layout title="Recover your password of Catamyst account">
      <Hero>
        <Heading as="h1" size="xl">
          Recover your password
        </Heading>
      </Hero>

      <Content>
        <AuthRecoverPassword />
      </Content>
    </Layout>
  )
}
