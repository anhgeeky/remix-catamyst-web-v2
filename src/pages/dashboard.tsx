import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import { Heading, Text, Box, Button } from '@chakra-ui/react'
import { LayoutDefault } from '@/layouts'

export default function Dashboard() {
  const auth = useSelector((state) => state.auth)
  const router = useRouter()
  const isAuthorized = auth.isAuthenticated && auth.user

  useEffect(() => {
    if (!isAuthorized) router.push('/signin')
  }, [])

  return (
    <LayoutDefault title="Dashboard · Catamyst">
      {isAuthorized && (
        <>
          <Heading as="h1" size="xl">
            Dashboard
          </Heading>
          <Text>Welcome back! Let's learn, discuss, and explore.</Text>
          <Box py={5}>
            <Button onClick={() => router.push(`/${auth.user.handle}`)}>
              Go to my profile @{auth.user.handle}
            </Button>
          </Box>
        </>
      )}
    </LayoutDefault>
  )
}
