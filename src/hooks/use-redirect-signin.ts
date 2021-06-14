import { useEffect } from 'react'

import { useProfile } from '@/hooks'

/**
 * Using useProfile that request to get profile from API.
 * But immediately redirect if not authenticated.
 */
export function useRedirectSignIn() {
  const {
    router,
    auth,
    user,
    profile,
    isAuthenticated,
    isAuthorized,
    isLoading,
    isError,
  } = useProfile()

  useEffect(() => {
    if (!isAuthenticated) router.replace('/signin')
  }, [isAuthenticated])

  return {
    router,
    auth,
    user,
    profile,
    isAuthenticated,
    isAuthorized,
    isLoading,
    isError,
  }
}
