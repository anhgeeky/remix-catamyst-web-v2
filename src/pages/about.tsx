import { Heading, Text } from '@chakra-ui/react'
import { Layout } from '@layouts'
import { Hero, Content } from '@components'

export default function About() {
  return (
    <Layout title="About Catamyst">
      <Hero>
        <Heading as="h1" size="xl">
          On helping people with their career
        </Heading>
        <Text>A quick story about Catamyst.</Text>
      </Hero>

      <Content>
        <Text>(Story about us)</Text>
      </Content>
    </Layout>
  )
}
