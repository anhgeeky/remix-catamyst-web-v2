import { Heading, Text } from '@chakra-ui/react'
import { Layout } from '@layouts'
import { Hero, Content } from '@components'

export default function forumPage() {
  return (
    <Layout title="Community Forum · Catamyst">
      <Hero>
        <Heading as="h1" size="xl">
          Community Forum
        </Heading>
        <Text>Discuss ideas, ask questions, and contribute answers.</Text>
      </Hero>

      <Content>
        <Text>There will be forum discussions here.</Text>
      </Content>
    </Layout>
  )
}
