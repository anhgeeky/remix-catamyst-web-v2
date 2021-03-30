import NextLink from 'next/link'
import { Heading, Link, Button, Text } from '@chakra-ui/react'

import { Layout } from '@layouts'
import { Hero, Content } from '@components'

export default function custom404Page() {
  return (
    <Layout title="Page Not Found · Catamyst">
      <Hero color="red">
        <Heading as="h1" size="xl">
          Sorry, page not found.
        </Heading>
        <Text>
          404 - Client-side error occurred.{' '}
          <Link isExternal href="https://httpstatuses.com/404">
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
