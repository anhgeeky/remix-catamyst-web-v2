import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'

export function useAuth() {
  const router = useRouter()
  const auth = useSelector((state) => state.auth)

  /**
   * When user is signed in.
   */
  const isAuthenticated = auth.isAuthenticated && auth.user

  /**
   * When user is allowed to access.
   */
  const isAuthorized = auth.isAuthenticated && auth.user

  return {
    router,
    auth,
    isAuthenticated,
    isAuthorized,
  }
}
