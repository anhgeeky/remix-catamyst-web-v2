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
    <Layout title="Posts Dashboard · Catamyst">
      {isAuthorized && (
        <>
          <Hero>
            <Heading as="h1" size="xl">
              Posts Dashboard
            </Heading>
            <Text>
              Your published and draft posts. Can be for blog, notes, or news.
            </Text>
          </Hero>
          <ContentWithSidebar>
            <DashboardSidebar />
            <Stack spacing={5} width="100%">
              <Stack>
                <HeadingStack>Published Posts:</HeadingStack>
                <Card>You don't have any published posts yet.</Card>
              </Stack>
              <Stack>
                <HeadingStack>Draft Posts:</HeadingStack>
                <Card>You don't have any draft posts yet.</Card>
              </Stack>
            </Stack>
          </ContentWithSidebar>
        </>
      )}
    </Layout>
  )
}
