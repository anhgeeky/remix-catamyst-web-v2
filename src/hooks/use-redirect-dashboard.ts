import { useEffect } from 'react'
import { useRouter } from 'next/router'

import { useAuth } from '@/hooks'

/**
 * Using useProfile without fetching profile.
 * Redirect to dashboard after signed in.
 */
export function useRedirectDashboard() {
  const { auth, isAuthenticated } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (isAuthenticated) router.replace('/dashboard/overview')
  }, [isAuthenticated])

  return {
    auth,
    isAuthenticated,
    router,
  }
}
