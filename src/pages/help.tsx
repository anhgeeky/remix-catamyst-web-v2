import { Heading, Text } from '@chakra-ui/react'
import { LayoutDefault } from '@/layouts'

export default function Help() {
  return (
    <LayoutDefault title="Help Center · Catamyst">
      <Heading as="h1" size="xl">
        Help Center
      </Heading>
      <Text>Support and other helpful information.</Text>
    </LayoutDefault>
  )
}
