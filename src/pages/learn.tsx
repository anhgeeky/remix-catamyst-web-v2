import Head from 'next/head'
import { Heading } from '@chakra-ui/react'
import { LayoutDefault } from '@/layouts'

export default function Learn() {
  return (
    <LayoutDefault title="Learn on Catamyst">
      <Heading as="h1" size="xl">
        Learn
      </Heading>
    </LayoutDefault>
  )
}
