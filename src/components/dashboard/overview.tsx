import NextHead from 'next/head'
import { Heading, Stack, HStack, Text, Badge } from '@chakra-ui/react'
import { CollectionTracks, Content, HeadingStack } from '@components'
import { DashboardHero } from '@components/dashboard'
import { getDayNamePeriod } from '@utils'

import dataTracks from '@data/tracks.json'

export function DashboardOverview({ auth }) {
  const dayNamePeriod = getDayNamePeriod()

  return (
    <>
      <NextHead>
        <title>Overview Dashboard · Catamyst</title>
      </NextHead>

      <DashboardHero>
        <Heading as="h1" size="xl">
          Welcome, {auth.user.name}!
        </Heading>
        <HStack>
          <Text>
            Happy {dayNamePeriod}. You are currently a learner with{' '}
            {auth.user.plan} plan.
          </Text>
        </HStack>
      </DashboardHero>

      <Content>
        <Stack spacing={5} width="100%">
          <Stack>
            <HeadingStack>Tracks you can enroll:</HeadingStack>
            <CollectionTracks tracks={dataTracks} />
          </Stack>
        </Stack>
      </Content>
    </>
  )
}
