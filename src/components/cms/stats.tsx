import NextHead from 'next/head'
import { Heading, Stack, HStack, Text, Badge } from '@chakra-ui/react'
import { Content, HeadingStack, LinkButton, Card } from '@components'
import { CMSHero } from '@components/cms'

import dataUsers from '@data/users.json'
import dataTracks from '@data/tracks.json'
import dataTopics from '@data/topics.json'
import dataLessons from '@data/lessons.json'

export default function CMSStats() {
  const dataStats = [
    {
      heading: 'Users',
      subHeading: `${dataUsers.length} users`,
      href: '/cms',
    },
    {
      heading: 'Tracks',
      subHeading: `${dataTracks.length} tracks`,
      href: '/cms/tracks',
    },
    {
      heading: 'Topics',
      subHeading: `${dataTopics.length} topics`,
      href: '/cms/topics',
    },
    {
      heading: 'Lessons',
      subHeading: `${dataLessons.length} lessons`,
      href: '/cms/lessons',
    },
  ]

  return (
    <>
      <NextHead>
        <title>Stats · CMS · Catamyst</title>
      </NextHead>
      <CMSHero>
        <Heading as="h1" size="xl">
          Stats CMS
        </Heading>
        <HStack>
          <Text>Let's get editing! </Text>
          <Badge variant="solid" colorScheme="red">
            Admin
          </Badge>
        </HStack>
      </CMSHero>
      <Content>
        <Stack spacing={5} direction={{ base: 'column', lg: 'row' }}>
          {dataStats.map((stat) => {
            return (
              <Card key={stat.heading} minW="200px" maxW="400px">
                <Stack>
                  <HeadingStack>{stat.heading}</HeadingStack>
                  <Heading as="h2">{stat.subHeading}</Heading>
                  <LinkButton href={stat.href}>Edit</LinkButton>
                </Stack>
              </Card>
            )
          })}
        </Stack>
      </Content>
    </>
  )
}
