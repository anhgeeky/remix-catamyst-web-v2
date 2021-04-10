import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'

import type { RootState } from '@features/store'

/**
 * Similar to useProfile but doesn't need a profile.
 */
export function useAuth() {
  // @ts-ignore
  const auth = useSelector((state: RootState) => state.auth)
  const router = useRouter()

  return {
    auth,
    isAuthenticated: auth.isAuthenticated,
    router,
  }
}
