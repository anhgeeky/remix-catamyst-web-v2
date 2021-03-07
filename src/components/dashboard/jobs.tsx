import NextHead from 'next/head'
import { Heading, Stack, Text } from '@chakra-ui/react'
import { Card, Content, HeadingStack } from '@components'
import { DashboardHero } from '@components/dashboard'

export default function DashboardJobs({ auth }) {
  return (
    <>
      <NextHead>
        <title>Jobs Dashboard · Catamyst</title>
      </NextHead>
      <DashboardHero>
        <Heading as="h1" size="xl">
          Jobs
        </Heading>
        <Text>Your applied jobs and posted jobs.</Text>
      </DashboardHero>
      <Content>
        <Stack spacing={5} width="100%">
          <Stack>
            <HeadingStack>Jobs you've applied to:</HeadingStack>
            <Card>Hey {auth.user.name}, you haven't applied to a job yet.</Card>
          </Stack>
          <Stack>
            <HeadingStack>Jobs you've posted:</HeadingStack>
            <Card>Hey {auth.user.name}, you haven't posted any job yet.</Card>
          </Stack>
        </Stack>
      </Content>
    </>
  )
}
