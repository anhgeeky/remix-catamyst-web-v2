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
import { Content, HeadingStack, LinkButton, Card } from '@components'
import { CMSHero } from '@components/cms'

import dataUsers from '@data/users.json'
import dataTracks from '@data/tracks.json'
import dataTopics from '@data/topics.json'
import dataLessons from '@data/lessons.json'
import { FaVrCardboard } from 'react-icons/fa'

export default function CMSStats() {
  const dataStats = [
    { label: 'Users', total: dataUsers.length, href: '/cms' },
    { label: 'Tracks', total: dataTracks.length, href: '/cms/tracks' },
    { label: 'Topics', total: dataTopics.length, href: '/cms/topics' },
    { label: 'Lessons', total: dataLessons.length, href: '/cms/lessons' },
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
                <LinkButton href={stat.href} size="sm">
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
