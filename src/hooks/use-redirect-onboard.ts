import { useEffect } from 'react'
import { useRouter } from 'next/router'

import { useAuth } from '@hooks'

/**
 * Using useAuth without fetching profile.
 * Redirect to onboard after signed up.
 */
export function useRedirectOnboard() {
  const { auth, isAuthenticated } = useAuth()
  const router = useRouter()

  useEffect(() => {
    isAuthenticated && router.replace('/onboard/welcome')
  }, [isAuthenticated])

  return {
    auth,
    isAuthenticated,
    router,
  }
}
