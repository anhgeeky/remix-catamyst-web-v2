import NextHead from 'next/head'
import { Heading, Stack, Text } from '@chakra-ui/react'
import { Card, Content, HeadingStack } from '@components'
import { DashboardHero } from '@components/dashboard'

export default function DashboardTracks({ auth }) {
  return (
    <>
      <NextHead>
        <title>Tracks Dashboard · Catamyst</title>
      </NextHead>
      <DashboardHero>
        <Heading as="h1" size="xl">
          Tracks
        </Heading>
        <Text>Your current and available tracks</Text>
      </DashboardHero>
      <Content>
        <Stack spacing={5} width="100%">
          <Stack>
            <HeadingStack>Enrolled Tracks:</HeadingStack>
            <Card>
              Hey {auth.user.name}, you haven't enrolled in any track yet.
            </Card>
          </Stack>
          <Stack>
            <HeadingStack>Completed Tracks:</HeadingStack>
            <Card>
              Hey {auth.user.name}, you haven't completed any track yet.
            </Card>
          </Stack>
        </Stack>
      </Content>
    </>
  )
}
