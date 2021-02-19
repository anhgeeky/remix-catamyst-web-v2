import Head from 'next/head'
import { Heading } from '@chakra-ui/react'
import { LayoutDefault } from '@/layouts'

export default function SignIn() {
  return (
    <LayoutDefault title="Sign in to your Catamyst account">
      <Heading as="h1" size="xl">
        Sign in
      </Heading>
    </LayoutDefault>
  )
}
