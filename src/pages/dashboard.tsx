import { useEffect } from 'react'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import {
  chakra,
  Box,
  Heading,
  Text,
  Stack,
  useColorModeValue,
} from '@chakra-ui/react'
import { Layout } from '@/layouts'
import {
  CollectionTracks,
  ContentWithSidebar,
  HeadingStack,
  Hero,
} from '@/components'
import dataTracks from '@/data/tracks.json'

export default function Dashboard() {
  const auth = useSelector((state) => state.auth)
  const router = useRouter()
  const isAuthorized = auth.isAuthenticated && auth.user
  const bg = useColorModeValue('white', 'gray.800')

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

function DashboardSidebar() {
  const links = [
    { text: 'Overview', href: '/dashboard', isActive: true },
    { text: 'Tracks', href: '/dashboard/tracks' },
    { text: 'Projects', href: '/dashboard/projects' },
    { text: 'Posts', href: '/dashboard/posts' },
    { text: 'Mentors', href: '/dashboard/mentors' },
    { text: 'Jobs', href: '/dashboard/jobs' },
    { text: 'Discussions', href: '/dashboard/discussions' },
  ]

  return (
    <Stack
      maxW="240px"
      width="100%"
      spacing={{ base: 0, sm: 2, lg: 0 }}
      direction={{ base: 'row', lg: 'column' }}
    >
      {links.map((link, index) => {
        return (
          <SidebarLink key={index} href={link.href} isActive={link.isActive}>
            {link.text}
          </SidebarLink>
        )
      })}
    </Stack>
  )
}

function SidebarLink({ href, isActive = false, children }) {
  return (
    <NextLink href={href} passHref>
      <chakra.a
        aria-current={isActive ? 'page' : undefined}
        width="100%"
        p={2}
        rounded="md"
        fontWeight="500"
        color={useColorModeValue('black', 'white')}
        _hover={{
          bg: useColorModeValue('gray.100', 'gray.800'),
          color: useColorModeValue('teal.500', 'teal.200'),
        }}
        _activeLink={{
          bg: useColorModeValue('gray.200', 'black'),
          fontWeight: '700',
        }}
      >
        {children}
      </chakra.a>
    </NextLink>
  )
}
