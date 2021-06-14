import NextHead from 'next/head'
import {
  Heading,
  HStack,
  Stat,
  StatArrow,
  StatHelpText,
  StatLabel,
  StatNumber,
  Text,
  SimpleGrid,
} from '@chakra-ui/react'

import { Content, LinkButton, Card, Icon } from '@components'
import { CMSHero } from '@components/cms'
import { useSWR, fetcherWithTokenSWR } from '@hooks'
import { getDayNamePeriod } from '@utils'

export function CMSOverview({ state }) {
  const { data, error } = useSWR(
    ['/api/cms/stats', state.session?.access_token],
    fetcherWithTokenSWR
  )
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
        <SimpleGrid spacing={5} minChildWidth={200}>
          {data.stats.map((stat) => {
            return (
              <Stat as={Card} key={stat.label}>
                <StatLabel pb={2}>{stat.label}</StatLabel>
                <StatNumber>
                  <Heading as="h1" size="2xl">
                    {stat.total}
                  </Heading>
                </StatNumber>
                <StatHelpText>
                  <StatArrow type="increase" />
                  <span>10%</span>
                </StatHelpText>
                <LinkButton
                  leftIcon={<Icon name="edit" />}
                  href={stat.href}
                  size="sm"
                  width="100%"
                  colorScheme="blue"
                >
                  Edit {stat.label}
                </LinkButton>
              </Stat>
            )
          })}
        </SimpleGrid>
      </Content>
    </>
  )
}
