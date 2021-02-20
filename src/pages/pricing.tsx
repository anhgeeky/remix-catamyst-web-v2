import { Heading, Text } from '@chakra-ui/react'
import { LayoutDefault } from '@/layouts'

export default function Pricing() {
  return (
    <LayoutDefault title="Pricing · Catamyst">
      <Heading as="h1" size="xl">
        Pricing
      </Heading>
      <Text>Different plans based on your goals, budget, and timeline.</Text>
    </LayoutDefault>
  )
}
