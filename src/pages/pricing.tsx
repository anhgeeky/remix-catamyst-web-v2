import { Heading, Text } from '@chakra-ui/react'
import { Layout } from '@/layouts'
import { Hero, Content } from '@/components'

export default function Pricing() {
  return (
    <Layout title="Pricing · Catamyst">
      <Hero>
        <Heading as="h1" size="xl">
          Pricing
        </Heading>
        <Text>Different plans based on your goals, budget, and timeline.</Text>
      </Hero>

      <Content>
        <Text>(Pricing plan table)</Text>
      </Content>
    </Layout>
  )
}
