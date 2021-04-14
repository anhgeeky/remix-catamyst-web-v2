import { Heading, Text } from '@chakra-ui/react'

import { Layout } from '@layouts'
import { Hero, Content, CollectionTracks } from '@components'

export default function learnPage() {
  return (
    <Layout title="Learn with tracks on Catamyst">
      <Hero>
        <Heading as="h1" size="xl">
          Learn with guided tracks
        </Heading>
        <Text>
          Tracks with variety of levels, topics, lessons, and projects.
        </Text>
      </Hero>
      <Content>
        <CollectionTracks />
      </Content>
    </Layout>
  )
}
