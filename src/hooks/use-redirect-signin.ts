import { useEffect } from 'react'

import { useProfile } from '@hooks'

/**
 * Also using useProfile that request to get profile from API.
 * But immediately redirect if not authenticated.
 */
export function useRedirectSignIn(fields = '') {
  const {
    router,
    user,
    profile,
    isAuthenticated,
    isAuthorized,
    isLoading,
    isError,
  } = useProfile(fields)

  useEffect(() => {
    if (!isAuthenticated) router.replace('/signin')
  }, [isAuthenticated])

  return {
    router,
    user,
    profile,
    isAuthenticated,
    isAuthorized,
    isLoading,
    isError,
  }
}
