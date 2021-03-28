import NextHead from 'next/head'
import NextImage from 'next/image'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import {
  chakra,
  Box,
  ButtonGroup,
  Button,
  Flex,
  HStack,
  Heading,
  Stack,
  Text,
  Wrap,
  WrapItem,
} from '@chakra-ui/react'

import { Icon, ContentWithSidebar, CollectionTopics } from '@components'
import { LearnHero } from '@components/learn'
import { useAuth, useToast } from '@hooks'

import dataTracks from '@data/tracks.json'
import dataTopics from '@data/topics.json'

export function TrackDetails({ trackSlug }) {
  const [topics, setTopics] = useState([])

  const track = dataTracks.find((track) => track.slug === trackSlug)

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
    <>
      {!track && (
        <>
          <NextHead>
            <title>Track is not found · Catamyst</title>
          </NextHead>
          <Text>Sorry, track is not found.</Text>
        </>
      )}
      {track && topics && (
        <>
          <NextHead>
            <title>{track.title} · Catamyst</title>
          </NextHead>
          <TrackHero track={track} />
          <ContentWithSidebar>
            <TrackSideBar track={track} />
            <CollectionTopics trackSlug={trackSlug} topics={topics} />
          </ContentWithSidebar>
        </>
      )}
    </>
  )
}

export function TrackHero({ track }) {
  return (
    <LearnHero>
      <Wrap as={Flex} spacing={5}>
        <WrapItem>
          <NextImage
            alt={`Icon of ${track.title}`}
            src={track.iconUrl}
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
    </LearnHero>
  )
}

export function TrackSideBar({ track }) {
  const router = useRouter()
  const toast = useToast()
  const { isAuthenticated } = useAuth()
  const [isEnrolled, setEnrolled] = useState(false)

  const handleToggleEnroll = () => {
    if (isAuthenticated) {
      if (isEnrolled) {
        setEnrolled(false)
        toast({ status: 'warning', title: 'Left track' })
      } else {
        setEnrolled(true)
        toast({ status: 'success', title: 'Enrolled to this track!' })
      }
    } else {
      router.push('/signin')
    }
  }

  return (
    <Stack maxW={{ lg: '280px' }} width="100%" spacing={1}>
      {track.isPublished && (
        <ButtonGroup pb={3}>
          <Button
            width="100%"
            maxW={{ sm: '280px' }}
            variant="solid"
            colorScheme={isEnrolled ? 'red' : 'teal'}
            onClick={handleToggleEnroll}
          >
            {isEnrolled ? 'Enrolled' : 'Enroll track'}
          </Button>
        </ButtonGroup>
      )}
      <Heading as="h2" size="sm">
        About this track
      </Heading>
      <HStack>
        <Icon name="levels" />
        <Text>
          {track.levels.map((level, index) => {
            if (index === track.levels.length - 1) {
              return <span key={index}>{level}</span>
            } else {
              return <span key={index}>{level}, </span>
            }
          })}
        </Text>
      </HStack>
      <HStack>
        <Icon name="topics" />
        <span>{track.topics.length || 0} topics</span>
      </HStack>
      <HStack>
        <Icon name="lessons" />
        <span>{track.totalLessons || 0} lessons</span>
      </HStack>
      <HStack>
        <Icon name="hours" />
        <span>{track.totalHours || 0} hours of content</span>
      </HStack>
      <HStack>
        <Icon name="months" />
        <span>{track.totalMonths || 0} months to complete</span>
      </HStack>
    </Stack>
  )
}
