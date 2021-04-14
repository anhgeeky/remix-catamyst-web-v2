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
    if (user?.role && user?.role === 'Member') {
      router.replace('/')
    }
  }, [user])

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
