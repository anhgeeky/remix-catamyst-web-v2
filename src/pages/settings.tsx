import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { Heading, Text } from '@chakra-ui/react'
import { LayoutDefault } from '@/layouts'

export default function Settings() {
  const auth = useSelector((state) => state.auth)
  const router = useRouter()
  const isAuthorized = auth.isAuthenticated && auth.user

  useEffect(() => {
    if (!isAuthorized) router.push('/signin')
  }, [])

  return (
    <LayoutDefault title="Settings · Catamyst">
      {isAuthorized && (
        <>
          <Heading as="h1" size="xl">
            Settings
          </Heading>
          <Text>Your account settings.</Text>
        </>
      )}
    </LayoutDefault>
  )
}
