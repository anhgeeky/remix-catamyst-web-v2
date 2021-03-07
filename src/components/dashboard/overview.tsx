import NextHead from 'next/head'
import { Heading, Stack, Text, Badge } from '@chakra-ui/react'
import { CollectionTracks, Content, HeadingStack } from '@components'
import { DashboardHero } from '@components/dashboard'
import dataTracks from '@data/tracks.json'

export default function DashboardOverview({ auth }) {
  return (
    <>
      <NextHead>
        <title>Overview Dashboard · Catamyst</title>
      </NextHead>
      <DashboardHero>
        <Heading as="h1" size="xl">
          Overview
        </Heading>
        <Text>
          Welcome back, {auth.user.name}! <Badge>{auth.user.plan}</Badge>
        </Text>
      </DashboardHero>
      <Content>
        <Stack spacing={5} width="100%">
          <Stack>
            <HeadingStack>Available tracks:</HeadingStack>
            <CollectionTracks tracks={dataTracks} />
          </Stack>
        </Stack>
      </Content>
    </>
  )
}
