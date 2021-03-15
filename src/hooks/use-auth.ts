import { useSelector } from 'react-redux'

export default function useAuth() {
  const auth = useSelector((state) => state.auth)

  /**
   * When user is signed in.
   */
  const isAuthenticated = auth.isAuthenticated && auth.user

  /**
   * When user is allowed to access the data.
   */
  const isAuthorized = auth.isAuthenticated && auth.user

  return {
    auth,
    isAuthenticated,
    isAuthorized,
  }
}
