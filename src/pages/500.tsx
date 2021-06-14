import NextLink from 'next/link'
import { Heading, Link, Button, Text } from '@chakra-ui/react'

import { Layout } from '@/layouts'
import { Hero, Content } from '@/components'

export default function custom500page() {
  return (
    <Layout title="Error · Catamyst">
      <Hero color="red">
        <Heading as="h1" size="xl">
          Sorry, something went wrong from our side.
        </Heading>
        <Text>
          500 - Server-side error occurred.{' '}
          <Link isExternal href="https://httpstatuses.com/500">
            Read more
          </Link>
          .
        </Text>
      </Hero>

      <Content>
        <NextLink href="/">
          <Button as={Link}>Back to home</Button>
        </NextLink>
      </Content>
    </Layout>
  )
}
