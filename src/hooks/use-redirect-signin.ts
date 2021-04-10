import { useEffect } from 'react'

import { useSession, useProfile } from '@hooks'

/**
 * Using useProfile that request to get profile from API.
 * But immediately redirect if not authenticated.
 */
export function useRedirectSignIn(fields = '') {
  const session = useSession()
  const {
    auth,
    profile,
    isAuthenticated,
    isAuthorized,
    isLoading,
    isError,
    router,
  } = useProfile(fields)

  useEffect(() => {
    !isAuthenticated && !session && router.replace('/signin')
  }, [isAuthenticated, session])

  return {
    auth,
    profile,
    isAuthenticated,
    isAuthorized,
    isLoading,
    isError,
    router,
  }
}
