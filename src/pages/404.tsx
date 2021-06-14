// import Error from 'next/error'
import { Heading, Link, ButtonGroup, Text } from '@chakra-ui/react'

import { Layout } from '@layouts'
import { Hero, Content, LinkButton } from '@components'

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
      <Content display="flex" justifyContent="center">
        <ButtonGroup>
          <LinkButton href="/">Back to Home</LinkButton>
        </ButtonGroup>
      </Content>
    </Layout>
  )
}
