import { useEffect } from 'react'
import { useRouter } from 'next/router'

import { useProfile } from '@hooks'

/**
 * Using useProfile without fetching profile.
 * Redirect to dashboard after signed in.
 */
export function useRedirectDashboard() {
  const { auth, isAuthenticated } = useProfile()
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
