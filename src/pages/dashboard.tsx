import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import { Box, Heading, Stack, Text, useColorModeValue } from '@chakra-ui/react'

import { Layout } from '@/layouts'
import {
  CollectionTracks,
  ContentWithSidebar,
  DashboardSidebar,
  HeadingStack,
  Hero,
} from '@/components'
import useAuth from '@/hooks/use-auth'
import useAuthorized from '@/hooks/use-authorized'
import dataTracks from '@/data/tracks.json'

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
              <HeadingStack>Current tracks:</HeadingStack>
              <Box rounded="md" boxShadow="base" bg={bg} p={5}>
                You haven't choose a track yet.
              </Box>
              <HeadingStack>Available tracks:</HeadingStack>
              <CollectionTracks tracks={dataTracks} />
            </Stack>
          </ContentWithSidebar>
        </>
      )}
    </Layout>
  )
}
