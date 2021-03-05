import { Heading, Stack, Text, useColorModeValue } from '@chakra-ui/react'
import { Layout } from '@layouts'
import {
  Card,
  CollectionTracks,
  ContentWithSidebar,
  DashboardSidebar,
  HeadingStack,
  Hero,
} from '@components'
import { useAuth, useAuthorized } from '@hooks'
import dataTracks from '@data/tracks.json'

export default function Dashboard() {
  const bg = useColorModeValue('white', 'gray.800')
  const { auth, isAuthorized } = useAuth()
  useAuthorized(isAuthorized)

  return (
    <Layout title="Dashboard · Catamyst">
      {isAuthorized && (
        <>
          <Hero>
            <Heading as="h1" size="xl">
              Dashboard
            </Heading>
            <Text>Welcome back, {auth.user.name}!</Text>
          </Hero>
          <ContentWithSidebar>
            <DashboardSidebar />
            <Stack spacing={5} width="100%">
              <Stack>
                <HeadingStack>Enrolled tracks:</HeadingStack>
                <Card>You haven't enrolled in a track yet.</Card>
              </Stack>
              <Stack>
                <HeadingStack>Available tracks:</HeadingStack>
                <CollectionTracks tracks={dataTracks} />
              </Stack>
            </Stack>
          </ContentWithSidebar>
        </>
      )}
    </Layout>
  )
}
