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
    <Layout title="Discussions Dashboard · Catamyst">
      {isAuthorized && (
        <>
          <Hero>
            <Heading as="h1" size="xl">
              Discussions Dashboard
            </Heading>
            <Text>Your discussions in forum.</Text>
          </Hero>
          <ContentWithSidebar>
            <DashboardSidebar />
            <Stack spacing={5} width="100%">
              <Stack>
                <HeadingStack>Involved discussions:</HeadingStack>
                <Card>You haven't involved in any discussions yet.</Card>
              </Stack>
            </Stack>
          </ContentWithSidebar>
        </>
      )}
    </Layout>
  )
}
