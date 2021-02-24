import NextLink from 'next/link'
import { Heading, Link, Button } from '@chakra-ui/react'
import { Layout } from '@/layouts'
import { Hero, Content } from '@/components'

export default function Forum() {
  return (
    <Layout title="Page Not Found · Catamyst">
      <Hero color="red">
        <Heading as="h1" size="xl">
          Sorry, page not found
        </Heading>
      </Hero>

      <Content>
        <Link as={NextLink} href="/">
          <Button>Back to home</Button>
        </Link>
      </Content>
    </Layout>
  )
}
