import { useEffect } from 'react'
import { useRouter } from 'next/router'

import { useSession, useAuth } from '@hooks'

/**
 * Using useAuth without fetching anything
 * Redirect to dashboard if authenticatated
 * Only used for signup and signin
 */
export function useRedirectDashboard() {
  const session = useSession()
  const router = useRouter()
  const { auth, isAuthenticated } = useAuth()

  useEffect(() => {
    isAuthenticated && session && router.replace('/dashboard/overview')
  }, [isAuthenticated, session])

  return {
    router,
    auth,
    isAuthenticated,
  }
}
