import { useRouter } from 'next/router'
import { useEffect } from 'react'

import { useAuth } from '@hooks'

export function useRedirectSignIn() {
  const router = useRouter()
  const { auth, user, isAuthenticated, isAuthorized } = useAuth()

  useEffect(() => {
    if (!isAuthenticated) router.replace('/signin')
  }, [isAuthenticated])

  return {
    router,
    isAuthenticated,
    isAuthorized,
    auth,
    user,
  }
}
