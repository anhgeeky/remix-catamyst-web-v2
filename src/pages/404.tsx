import NextLink from 'next/link'
import { Heading, Link, Button } from '@chakra-ui/react'
import { LayoutDefault } from '@/layouts'

export default function Forum() {
  return (
    <LayoutDefault title="Page Not Found · Catamyst">
      <Heading as="h1" size="xl">
        Sorry, page not found
      </Heading>
      <Link as={NextLink} href="/">
        <Button>Back to home</Button>
      </Link>
    </LayoutDefault>
  )
}
