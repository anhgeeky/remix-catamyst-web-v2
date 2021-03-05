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

export default function DashboardMentors() {
  const { isAuthorized } = useAuth()
  useAuthorized(isAuthorized)

  return (
    <Layout title="Mentors Dashboard · Catamyst">
      {isAuthorized && (
        <>
          <Hero>
            <Heading as="h1" size="xl">
              Mentors Dashboard
            </Heading>
            <Text>Your assigned mentors from Catamyst.</Text>
          </Hero>
          <ContentWithSidebar>
            <DashboardSidebar />
            <Stack spacing={5} width="100%">
              <Stack>
                <HeadingStack>Mentors:</HeadingStack>
                <Card>You don't have any mentors yet.</Card>
              </Stack>
            </Stack>
          </ContentWithSidebar>
        </>
      )}
    </Layout>
  )
}
