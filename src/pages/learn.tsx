import { Heading, Text } from '@chakra-ui/react'
import { Layout } from '@/layouts'
import { Hero, Content } from '@/components'

export default function Learn() {
  return (
    <Layout title="Learn coding and design on Catamyst">
      <Hero>
        <Heading as="h1" size="xl">
          Learn coding and design
        </Heading>
        <Text>Tracks with variety of levels, topics, and projects.</Text>
      </Hero>

      <Content>
        <Text>(Collection of tracks)</Text>
        <Text>(Collection of projects)</Text>
      </Content>
    </Layout>
  )
}
