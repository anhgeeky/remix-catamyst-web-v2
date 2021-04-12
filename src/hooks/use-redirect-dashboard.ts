import { useEffect } from 'react'
import { useRouter } from 'next/router'

import { useUserSession, useAuth } from '@hooks'

/**
 * Using useAuth without fetching profile.
 * Redirect to dashboard after signed in.
 */
export function useRedirectDashboard() {
  const { auth, isAuthenticated } = useAuth()
  const router = useRouter()

  useEffect(() => {
    isAuthenticated && router.replace('/dashboard/overview')
  }, [isAuthenticated])

  return {
    auth,
    isAuthenticated,
    router,
  }
}
