import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import { Heading, Text, Stack, Container } from '@chakra-ui/react'
import { Layout } from '@/layouts'
import { Hero, Content, CollectionTracks } from '@/components'
import dataTracks from '@/data/tracks.json'

export default function Dashboard() {
  const auth = useSelector((state) => state.auth)
  const router = useRouter()
  const isAuthorized = auth.isAuthenticated && auth.user

  useEffect(() => {
    if (!isAuthorized) router.push('/signin')
  }, [])

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

          <Container maxW="1200px" pt={10}>
            <Stack spacing={5}>
              <Heading
                as="h2"
                fontFamily="body"
                opacity={0.5}
                size="sm"
                textTransform="uppercase"
              >
                Available Tracks
              </Heading>
              <CollectionTracks data={dataTracks} />
            </Stack>
          </Container>
        </>
      )}
    </Layout>
  )
}
