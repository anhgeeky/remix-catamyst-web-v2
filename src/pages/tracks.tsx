import { Heading, Text } from '@chakra-ui/react'
import { LayoutDefault } from '@/layouts'

export default function Tracks() {
  return (
    <LayoutDefault title="Tracks">
      <Heading as="h1" size="xl">
        Tracks
      </Heading>
      <Text>Learn with tracks.</Text>
    </LayoutDefault>
  )
}
