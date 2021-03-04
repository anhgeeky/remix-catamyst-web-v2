import { Heading, Stack, Text } from '@chakra-ui/react'
import { Layout } from '@/layouts'
import {
  Card,
  ContentWithSidebar,
  DashboardSidebar,
  HeadingStack,
  Hero,
} from '@/components'
import { useAuth, useAuthorized } from '@/hooks'

export default function DashboardProjects() {
  const { isAuthorized } = useAuth()
  useAuthorized(isAuthorized)

  return (
    <Layout title="Projects Dashboard · Catamyst">
      {isAuthorized && (
        <>
          <Hero>
            <Heading as="h1" size="xl">
              Projects Dashboard
            </Heading>
            <Text>Your published and draft projects</Text>
          </Hero>
          <ContentWithSidebar>
            <DashboardSidebar />
            <Stack spacing={5} width="100%">
              <Stack>
                <HeadingStack>Published Projects:</HeadingStack>
                <Card>You don't have any published projects yet.</Card>
              </Stack>
              <Stack>
                <HeadingStack>Draft Projects:</HeadingStack>
                <Card>You don't have any draft projects yet.</Card>
              </Stack>
            </Stack>
          </ContentWithSidebar>
        </>
      )}
    </Layout>
  )
}
