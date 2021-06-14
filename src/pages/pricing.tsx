import { Heading, Text } from '@chakra-ui/react'

import { Layout } from '@/layouts'
import { Hero, Content } from '@/components'
import { PricingPlans } from '@/components/pricing'

export default function pricingPage() {
  return (
    <Layout title="Pricing for Catamyst's Basic, Pro, and Super plans">
      <Hero>
        <Heading as="h1" size="xl">
          Pricing Plans
        </Heading>
        <Text>Different plans based on your goals, budget, and timeline.</Text>
      </Hero>

      <Content>
        <PricingPlans />
      </Content>
    </Layout>
  )
}
