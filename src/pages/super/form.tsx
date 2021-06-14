import { Heading } from '@chakra-ui/react'

import { Layout } from '@layouts'
import { Hero, Content } from '@components'
import { AuthSuperForm } from '@components/auth'

export default function superFormPage() {
  return (
    <Layout title="Catamyst Super request form">
      <Hero>
        <Heading as="h1" size="xl">
          Catamyst Super form
        </Heading>
      </Hero>
      <Content>
        <AuthSuperForm />
      </Content>
    </Layout>
  )
}
