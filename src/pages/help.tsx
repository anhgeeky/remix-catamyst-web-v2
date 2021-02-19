import Head from 'next/head'
import { Heading } from '@chakra-ui/react'
import { LayoutDefault } from '@/layouts'

export default function Help() {
  return (
    <LayoutDefault title="Help">
      <Heading as="h1" size="xl">
        Help
      </Heading>
    </LayoutDefault>
  )
}
