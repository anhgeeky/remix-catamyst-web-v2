import NextHead from 'next/head'
import { Heading, Stack, Text } from '@chakra-ui/react'
import { Card, Content, HeadingStack } from '@components'
import { DashboardHero } from '@components/dashboard'

export default function DashboardMentors({ auth }) {
  return (
    <>
      <NextHead>
        <title>Mentors Dashboard · Catamyst</title>
      </NextHead>
      <DashboardHero>
        <Heading as="h1" size="xl">
          Mentors
        </Heading>
        <Text>Your assigned mentors from Catamyst.</Text>
      </DashboardHero>
      <Content>
        <Stack spacing={5} width="100%">
          <Stack spacing={5} width="100%">
            <Stack>
              <HeadingStack>Mentors:</HeadingStack>
              <Card>Hey {auth.user.name}, you don't have any mentors yet.</Card>
            </Stack>
          </Stack>
        </Stack>
      </Content>
    </>
  )
}
