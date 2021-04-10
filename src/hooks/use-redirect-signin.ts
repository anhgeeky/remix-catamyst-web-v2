import { useEffect } from 'react'

import { useProfile } from '@hooks'

/**
 * Using useProfile that request to get profile from API.
 * But immediately redirect if not authenticated.
 */
export function useRedirectSignIn(fields = '') {
  const {
    auth,
    user,
    profile,
    isAuthenticated,
    isAuthorized,
    isLoading,
    isError,
    router,
  } = useProfile(fields)

  useEffect(() => {
    !isAuthenticated && isError && router.replace('/signin')
  }, [isAuthenticated, isError])

  return {
    auth,
    user,
    profile,
    isAuthenticated,
    isAuthorized,
    isLoading,
    isError,
    router,
  }
}
