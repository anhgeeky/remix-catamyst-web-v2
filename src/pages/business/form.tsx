import { Heading } from '@chakra-ui/react'

import { Layout } from '@/layouts'
import { Hero, Content } from '@/components'
import { AuthBusinessForm } from '@/components/auth'

export default function businessFormPage() {
  return (
    <Layout title="Catamyst Business request form">
      <Hero>
        <Heading as="h1" size="xl">
          Catamyst Business form
        </Heading>
      </Hero>
      <Content>
        <AuthBusinessForm />
      </Content>
    </Layout>
  )
}
