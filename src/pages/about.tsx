import { Heading, Text } from '@chakra-ui/react'
import { LayoutDefault } from '@/layouts'

export default function About() {
  return (
    <LayoutDefault title="About Catamyst">
      <Heading as="h1" size="xl">
        On helping people with their career
      </Heading>
      <Text>A quick story about Catamyst.</Text>
    </LayoutDefault>
  )
}
