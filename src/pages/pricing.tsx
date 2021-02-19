import Head from 'next/head'
import { Heading } from '@chakra-ui/react'
import { LayoutDefault } from '@/layouts'

export default function Pricing() {
  return (
    <LayoutDefault title="Pricing">
      <Heading as="h1" size="xl">
        Pricing
      </Heading>
    </LayoutDefault>
  )
}
