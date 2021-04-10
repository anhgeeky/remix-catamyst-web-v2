import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'

/**
 * Similar to useProfile but doesn't need a profile.
 */
export function useAuth() {
  const auth = useSelector((state) => state.auth)
  const router = useRouter()

  return {
    auth,
    isAuthenticated: auth.isAuthenticated,
    router,
  }
}
