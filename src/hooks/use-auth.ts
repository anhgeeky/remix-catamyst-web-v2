import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'

/**
 * Similar to useProfile but doesn't need a profile.
 */
export function useAuth() {
  const router = useRouter()
  const auth = useSelector((state) => state.auth)
  const isAuthenticated = auth.isAuthenticated

  return {
    router,
    auth,
    isAuthenticated,
  }
}
