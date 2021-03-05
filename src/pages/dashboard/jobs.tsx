import { Heading, Stack, Text } from '@chakra-ui/react'
import { Layout } from '@layouts'
import {
  Card,
  ContentWithSidebar,
  DashboardSidebar,
  HeadingStack,
  Hero,
} from '@components'
import { useAuth, useAuthorized } from '@hooks'

export default function DashboardJobs() {
  const { isAuthorized } = useAuth()
  useAuthorized(isAuthorized)

  return (
    <Layout title="Jobs Dashboard · Catamyst">
      {isAuthorized && (
        <>
          <Hero>
            <Heading as="h1" size="xl">
              Jobs Dashboard
            </Heading>
            <Text>Your applied jobs and posted jobs.</Text>
          </Hero>
          <ContentWithSidebar>
            <DashboardSidebar />
            <Stack spacing={5} width="100%">
              <Stack>
                <HeadingStack>Jobs you've applied to:</HeadingStack>
                <Card>You haven't applied to a job yet.</Card>
              </Stack>
              <Stack>
                <HeadingStack>Jobs you've posted:</HeadingStack>
                <Card>You haven't posted any job yet.</Card>
              </Stack>
            </Stack>
          </ContentWithSidebar>
        </>
      )}
    </Layout>
  )
}
