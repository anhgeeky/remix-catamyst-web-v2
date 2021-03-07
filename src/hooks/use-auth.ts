import { useSelector } from 'react-redux'

export default function useAuth() {
  const auth = useSelector((state) => state.auth)
  const isAuthorized = auth.isAuthenticated && auth.user

  return {
    auth,
    isAuthorized,
  }
}
