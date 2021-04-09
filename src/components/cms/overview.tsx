import NextHead from 'next/head'
import {
  Heading,
  Flex,
  Stack,
  HStack,
  Text,
  Badge,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  StatGroup,
} from '@chakra-ui/react'

import { Content, LinkButton, Card } from '@components'
import { CMSHero } from '@components/cms'
import { getDayNamePeriod } from '@utils'

import dataUsers from '@data/users.json'
import dataTracks from '@data/tracks.json'
import dataTopics from '@data/topics.json'
import dataLessons from '@data/lessons.json'

export function CMSOverview() {
  const dayNamePeriod = getDayNamePeriod()

  const dataStats = [
    { label: 'Users', total: dataUsers.length, href: '/cms/users' },
    { label: 'Tracks', total: dataTracks.length, href: '/cms/tracks' },
    { label: 'Topics', total: dataTopics.length, href: '/cms/topics' },
    { label: 'Lessons', total: dataLessons.length, href: '/cms/lessons' },
  ]

  return (
    <>
      <NextHead>
        <title>Overview of CMS · Catamyst</title>
      </NextHead>

      <CMSHero>
        <Heading as="h1" size="xl">
          Welcome to the CMS
        </Heading>
        <HStack>
          <Text>Catamyst Management System. It's {dayNamePeriod}!</Text>
        </HStack>
      </CMSHero>

      <Content>
        <Stack as={Flex} spacing={5} direction={{ base: 'column', sm: 'row' }}>
          {dataStats.map((stat) => {
            return (
              <Stat
                as={Card}
                key={stat.label}
                width={{ base: '100%', sm: '200px' }}
              >
                <StatLabel>{stat.label}</StatLabel>
                <StatNumber>
                  <Heading>{stat.total}</Heading>
                </StatNumber>
                <StatHelpText>
                  <StatArrow type="increase" />
                  3%
                </StatHelpText>
                <LinkButton href={stat.href} size="sm" colorScheme="teal">
                  Edit
                </LinkButton>
              </Stat>
            )
          })}
        </Stack>
      </Content>
    </>
  )
}
