import { useRouter } from 'next/router'
import { useEffect } from 'react'

import { useAuthProfile } from '@hooks'

/**
 * Also using useAuthProfile that request to get profile from API.
 */
export function useRedirectSignIn(fields = `id`) {
  const router = useRouter()
  const { auth, user, profile, isAuthenticated, isAuthorized } = useAuthProfile(
    fields
  )

  useEffect(() => {
    if (!isAuthenticated) router.replace('/signin')
  }, [isAuthenticated])

  return {
    router,
    isAuthenticated,
    isAuthorized,
    auth,
    user,
    profile,
  }
}
