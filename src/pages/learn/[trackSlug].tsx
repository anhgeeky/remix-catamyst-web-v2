import NextHead from 'next/head'
import NextImage from 'next/image'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { Flex, Heading, Stack, Text, Wrap, WrapItem } from '@chakra-ui/react'

import { Layout } from '@layouts'
import { Hero, ContentWithSidebar, CollectionTopics } from '@components'
import dataTracks from '@data/tracks.json'
import dataTopics from '@data/topics.json'

export default function TrackBySlug() {
  const router = useRouter()
  const [topics, setTopics] = useState([])

  const track = dataTracks.find(
    (track) => track.slug === router.query.trackSlug
  )

  /**
   * Alternative to hook with if-condition handler like use-pagination-lessons
   */
  useEffect(() => {
    if (track) {
      const topics = dataTopics.filter((topic) => {
        return track.topics.includes(topic.id)
      })
      setTopics(topics)
    }
  }, [track])

  return (
    <Layout title={`Loading track... · Catamyst`}>
      {track && topics && (
        <>
          <NextHead>
            <title>{track.title} · Catamyst</title>
          </NextHead>
          <TrackHero track={track} />
          <ContentWithSidebar>
            <TrackSideBar track={track} />
            <CollectionTopics
              trackSlug={router.query.trackSlug}
              topics={topics}
            />
          </ContentWithSidebar>
        </>
      )}
    </Layout>
  )
}

function TrackHero({ track }) {
  return (
    <Hero>
      <Wrap as={Flex} spacing={5}>
        <WrapItem>
          <NextImage
            alt={`Icon of ${track.title}`}
            src="/assets/logos/catamyst-avatar.png"
            width={100}
            height={100}
            layout="fixed"
          />
        </WrapItem>
        <WrapItem as={Stack}>
          <Heading as="h1" size="lg">
            {track.title}
          </Heading>
          <Text maxW="580px">{track.description}</Text>
        </WrapItem>
      </Wrap>
    </Hero>
  )
}

function TrackSideBar({ track }) {
  return (
    <Stack maxW={{ lg: '280px' }} width="100%" spacing={2}>
      <Heading as="h2" size="sm">
        About this track
      </Heading>
      <Text>
        {track.levels.map((level, index) => {
          if (index === track.levels.length - 1) {
            return <span key={index}>{level} level</span>
          } else {
            return <span key={index}>{level}, </span>
          }
        })}
      </Text>
      <Text>
        <b>{track.totalTopics}</b> topics
      </Text>
      <Text>
        <b>{track.totalLessons}</b> lessons
      </Text>
      <Text>
        <b>{track.totalHours}</b> hours (estimated)
      </Text>
    </Stack>
  )
}
