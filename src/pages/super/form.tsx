import { Heading, Text } from '@chakra-ui/react'

import { Layout } from '@layouts'
import { Hero, Content } from '@components'
// import { AuthSuperForm } from '@components/auth'

export default function superFormPage() {
  return (
    <Layout title="Catamyst Super request form">
      <Hero>
        <Heading as="h1" size="xl">
          Catamyst Super request form
        </Heading>
        <Text>
          Fill and submit to request for discussion before getting Catamyst
          Super plan.
        </Text>
      </Hero>
      <Content>{/* <AuthSuperForm/> */}</Content>
    </Layout>
  )
}
