import { useEffect } from 'react'

import { useProfile } from '@hooks'

export function useRedirectHome() {
  const {
    router,
    auth,
    user,
    profile,
    isAuthenticated,
    isAuthorized,
    isError,
    isLoading,
  } = useProfile()

  useEffect(() => {
    if (!isLoading && !isAuthorized) {
      router.replace('/signin')
    }
  }, [profile])

  return {
    router,
    auth,
    user,
    profile,
    isAuthenticated,
    isAuthorized,
    isError,
    isLoading,
  }
}
