import { Heading, Text, Stack, Container } from '@chakra-ui/react'
import { Hero, CollectionTracks } from '@/components'
import { Layout } from '@/layouts'
import dataTracks from '@/data/tracks.json'

export default function Tracks() {
  return (
    <Layout title="Tracks · Catamyst">
      <Hero>
        <Heading as="h1" size="xl">
          Tracks
        </Heading>
      </Hero>

      <Container maxW="1200px" pt={10}>
        <Stack spacing={5}>
          <Heading
            as="h2"
            fontFamily="body"
            opacity={0.5}
            size="sm"
            textTransform="uppercase"
          >
            Available Tracks
          </Heading>
          <CollectionTracks data={dataTracks} />
        </Stack>
      </Container>
    </Layout>
  )
}
