import NextHead from 'next/head'
import NextImage from 'next/image'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import {
  Avatar,
  AvatarGroup,
  Flex,
  Heading,
  Stack,
  Text,
  Wrap,
  WrapItem,
  useColorModeValue,
} from '@chakra-ui/react'
import { Layout } from '@/layouts'
import { Hero, ContentWithSidebar, CollectionTopics } from '@/components'
import dataTracks from '@/data/tracks.json'
import dataTopics from '@/data/topics.json'

export default function TrackBySlug() {
  const router = useRouter()
  const { slug } = router.query
  const [topics, setTopics] = useState([])
  const track = dataTracks.find((track) => {
    return track.slug === slug
  })

  useEffect(() => {
    if (track) {
      const selectedTopics = dataTopics.filter((topic) => {
        return track.topics.includes(topic.id)
      })
      setTopics(selectedTopics)
    }
  }, [track])

  return (
    <Layout title={`Loading track...`}>
      {slug && track && topics && (
        <>
          <NextHead>
            <title>{track.title} · Track · Catamyst</title>
          </NextHead>
          <TrackHero track={track} />
          <ContentWithSidebar>
            <TrackSideBar track={track} />
            <CollectionTopics topics={topics} />
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
    <Stack maxW={{ lg: '280px' }} width="100%" spacing={5}>
      <Stack spacing={2}>
        <Heading as="h2" size="sm">
          Track contains:
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
          <b>{track.count_topics}</b> topics
        </Text>
        <Text>
          <b>{track.count_lessons}</b> lessons
        </Text>
        <Text>
          <b>{track.count_hours}</b> hours (estimated)
        </Text>
      </Stack>
      <Stack>
        <Heading as="h2" size="sm">
          Authored by:
        </Heading>
        <AuthorsAvatars />
      </Stack>
    </Stack>
  )
}

function AuthorsAvatars() {
  const authors = [
    { name: 'M Haidar Hanif', avatarUrl: 'http://bit.ly/m-haidar-hanif' },
    { name: 'Ryan Florence', avatarUrl: 'https://bit.ly/ryan-florence' },
    { name: 'Segun Adebayo', avatarUrl: 'https://bit.ly/sage-adebayo' },
    { name: 'Kent Dodds', avatarUrl: 'https://bit.ly/kent-c-dodds' },
    { name: 'Prosper Otemuyiwa', avatarUrl: 'https://bit.ly/prosper-baba' },
    { name: 'Christian Nwamba', avatarUrl: 'https://bit.ly/code-beast' },
  ]

  return (
    <AvatarGroup size="sm" max={10}>
      {authors.map((author, index) => {
        return <Avatar name={author.name} src={author.avatarUrl} />
      })}
    </AvatarGroup>
  )
}
