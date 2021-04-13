import NextHead from 'next/head'
import {
  Heading,
  Flex,
  Stack,
  HStack,
  Text,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
} from '@chakra-ui/react'

import { Content, LinkButton, Card } from '@components'
import { CMSHero } from '@components/cms'
import { useSWR, fetcherSWR } from '@hooks'
import { getDayNamePeriod } from '@utils'

export function CMSOverview({ state }) {
  const { data, error } = useSWR('/api/cms/stats', fetcherSWR)
  const dayNamePeriod = getDayNamePeriod()

  if (error) {
    return (
      <CMSHero>
        <Heading as="h1" size="xl">
          Stats error
        </Heading>
      </CMSHero>
    )
  }
  if (!data) {
    return (
      <CMSHero>
        <Heading as="h1" size="xl">
          Welcome to the CMS
        </Heading>
        <Text>Loading all stats...</Text>
      </CMSHero>
    )
  }
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
          {data.stats.map((stat, index) => {
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
