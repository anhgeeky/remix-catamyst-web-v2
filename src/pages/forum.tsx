import { Heading, Text } from '@chakra-ui/react'
import { LayoutDefault } from '@/layouts'

export default function Forum() {
  return (
    <LayoutDefault title="Forum · Catamyst">
      <Heading as="h1" size="xl">
        Forum
      </Heading>
      <Text>Discuss ideas, ask questions, and contribute answers.</Text>
    </LayoutDefault>
  )
}
