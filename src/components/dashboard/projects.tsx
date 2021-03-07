import NextHead from 'next/head'
import { Heading, Stack, Text } from '@chakra-ui/react'
import { Card, Content, HeadingStack } from '@components'
import { DashboardHero } from '@components/dashboard'

export default function DashboardProjects({ auth }) {
  return (
    <>
      <NextHead>
        <title>Projects Dashboard · Catamyst</title>
      </NextHead>
      <DashboardHero>
        <Heading as="h1" size="xl">
          Projects
        </Heading>
        <Text>Your published and draft projects</Text>
      </DashboardHero>
      <Content>
        <Stack spacing={5} width="100%">
          <Stack>
            <HeadingStack>Published Projects:</HeadingStack>
            <Card>
              Hey {auth.user.name}, you don't have any published projects yet.
            </Card>
          </Stack>
          <Stack>
            <HeadingStack>Draft Projects:</HeadingStack>
            <Card>
              Hey {auth.user.name}, you don't have any draft projects yet.
            </Card>
          </Stack>
        </Stack>
      </Content>
    </>
  )
}
