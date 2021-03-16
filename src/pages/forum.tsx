import { Heading, Text } from '@chakra-ui/react'
import { Layout } from '@layouts'
import { Hero, Content } from '@components'

export default function forumPage() {
  return (
    <Layout title="Forum · Catamyst">
      <Hero>
        <Heading as="h1" size="xl">
          Forum
        </Heading>
        <Text>Discuss ideas, ask questions, and contribute answers.</Text>
      </Hero>

      <Content>
        <Text>Forum is coming soon!</Text>
      </Content>
    </Layout>
  )
}
