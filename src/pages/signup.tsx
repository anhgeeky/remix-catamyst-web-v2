import Head from 'next/head'
import { Heading } from '@chakra-ui/react'
import { LayoutDefault } from '@/layouts'

export default function SignUp() {
  return (
    <LayoutDefault title="Create your Catamyst account">
      <Heading as="h1" size="xl">
        Sign up
      </Heading>
    </LayoutDefault>
  )
}
