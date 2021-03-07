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

export default function CMS() {
  const { auth, isAuthorized } = useAuth()
  useAuthorized(isAuthorized)

  const links = [
    { text: 'CMS', href: '/cms', isActive: true },
    { text: 'Tracks', href: '/cms/tracks' },
    { text: 'Topics', href: '/cms/topics' },
    { text: 'Lessons', href: '/cms/lessons' },
    { text: 'Users', href: '/cms/users' },
    { text: 'Payments', href: '/cms/payments' },
    { text: 'Projects', href: '/cms/projects' },
    { text: 'Posts', href: '/cms/posts' },
    { text: 'Mentors', href: '/cms/mentors' },
    { text: 'Jobs', href: '/cms/jobs' },
    { text: 'Discussions', href: '/cms/discussions' },
  ]

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
            <DashboardSidebar links={links} />
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
