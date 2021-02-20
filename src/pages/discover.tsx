import { Heading, Text } from '@chakra-ui/react'
import { LayoutDefault } from '@/layouts'

export default function Discover() {
  return (
    <LayoutDefault title="Discover members and projects on Catamyst">
      <Heading as="h1" size="xl">
        Discover members and projects
      </Heading>
      <Text>
        Connect with learners, developers, and designers on Catamyst. Check out
        their showcase projects!
      </Text>
    </LayoutDefault>
  )
}
