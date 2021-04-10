import { useEffect } from 'react'

import { useProfile } from '@hooks'
import { supabase } from '@lib'

/**
 * Also using useProfile that request to get profile from API.
 * But immediately redirect if not authenticated.
 */
export function useRedirectSignIn(fields = '') {
  const user = supabase.auth.user()
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
    if (!auth.isAuthenticated) router.replace('/signin')
  }, [auth])

  return {
    user,
    auth,
    profile,
    isAuthenticated,
    isAuthorized,
    isLoading,
    isError,
    router,
  }
}
