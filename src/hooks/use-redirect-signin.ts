import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useAuth } from '@hooks'

export default function useRedirectSignIn() {
  const router = useRouter()
  const { auth, isAuthenticated, isAuthorized } = useAuth()

  useEffect(() => {
    if (!isAuthenticated) router.replace('/signin')
  }, [isAuthenticated])

  return {
    router,
    auth,
    isAuthenticated,
    isAuthorized,
  }
}
