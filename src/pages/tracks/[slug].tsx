import Head from 'next/head'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Stack,
  Text,
  Wrap,
  WrapItem,
} from '@chakra-ui/react'
import { Layout } from '@/layouts'
import { Hero, CollectionTopics } from '@/components'
import dataTracks from '@/data/tracks.json'
import dataTopics from '@/data/topics.json'

export default function Track() {
  const router = useRouter()
  const { slug } = router.query
  const [topics, setTopics] = useState([])

  const track = dataTracks.find((track) => {
    return track.slug === slug
  })

  useEffect(() => {
    if (track) {
      const selectedTopics = dataTopics.filter((topic) => {
        return topic
      })
      setTopics(selectedTopics)
    }
  }, [slug])

  return (
    <Layout title={`Loading track...`}>
      {slug && track && topics && (
        <>
          <Head>
            <title>{track.title} Track · Catamyst</title>
          </Head>

          <Hero>
            <Wrap as={Flex} spacing={5}>
              <WrapItem>
                <Box
                  data-id="placeholder-image"
                  borderRadius="md"
                  bg="black"
                  width="100px"
                  height="100px"
                />
              </WrapItem>
              <WrapItem as={Stack}>
                <Heading as="h1" size="lg">
                  {track.title}
                </Heading>
                <Text maxW="680px">{track.description}</Text>
                <Button disabled>You're joined</Button>
              </WrapItem>
            </Wrap>
          </Hero>

          <Container maxW="1200px" pt={5}>
            <CollectionTopics data={topics} />
          </Container>
        </>
      )}
    </Layout>
  )
}
