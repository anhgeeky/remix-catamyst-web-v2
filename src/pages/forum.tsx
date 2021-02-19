import Head from 'next/head'
import { Heading } from '@chakra-ui/react'
import { LayoutDefault } from '@/layouts'

export default function Forum() {
  return (
    <LayoutDefault title="Discussion forum">
      <Heading as="h1" size="xl">
        Forum
      </Heading>
    </LayoutDefault>
  )
}
