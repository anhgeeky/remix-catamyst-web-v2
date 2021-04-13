import { useEffect } from 'react'

import { useProfile } from '@hooks'

/**
 * Using useProfile that request to get profile from API.
 * But immediately redirect if not authenticated.
 */
export function useRedirectSignIn() {
  const {
    auth,
    user,
    profile,
    isAuthenticated,
    isAuthorized,
    isLoading,
    isError,
    router,
  } = useProfile()

  // FIXME: Issue with cleanup
  useEffect(() => {
    !isAuthenticated && router.replace('/signin')
  }, [isAuthenticated])

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
