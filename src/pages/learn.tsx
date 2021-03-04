import { Heading, Text } from '@chakra-ui/react'
import { Layout } from '@/layouts'
import { Hero, Content, CollectionTracks } from '@/components'
import dataTracks from '@/data/tracks.json'

export default function Learn() {
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
        <CollectionTracks tracks={dataTracks} />
      </Content>
    </Layout>
  )
}
