import NextHead from 'next/head'
import { Heading, Stack, HStack, Text, Badge } from '@chakra-ui/react'
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
        <HStack>
          <Text>Welcome back, {auth.user.name}! </Text>
          <Badge variant="solid" colorScheme="blue">
            {auth.user.plan}
          </Badge>
        </HStack>
      </DashboardHero>

      <Content>
        <Stack spacing={5} width="100%">
          <Stack>
            <HeadingStack>Tracks:</HeadingStack>
            <CollectionTracks tracks={dataTracks} />
          </Stack>
        </Stack>
      </Content>
    </>
  )
}
