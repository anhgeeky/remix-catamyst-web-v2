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

export default function DashboardTracks() {
  const { isAuthorized } = useAuth()
  useAuthorized(isAuthorized)

  return (
    <Layout title="Tracks Dashboard · Catamyst">
      {isAuthorized && (
        <>
          <Hero>
            <Heading as="h1" size="xl">
              Tracks Dashboard
            </Heading>
            <Text>Your current and available tracks</Text>
          </Hero>
          <ContentWithSidebar>
            <DashboardSidebar />
            <Stack spacing={5} width="100%">
              <Stack>
                <HeadingStack>Enrolled Tracks:</HeadingStack>
                <Card>You haven't enrolled in any track yet.</Card>
              </Stack>
              <Stack>
                <HeadingStack>Completed Tracks:</HeadingStack>
                <Card>You haven't completed any track yet.</Card>
              </Stack>
            </Stack>
          </ContentWithSidebar>
        </>
      )}
    </Layout>
  )
}
