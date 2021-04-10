import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'

import { useUserSession, useAuthProfileSWR } from '@hooks'

/**
 * Similar to useAuth but fetch a profile.
 * Combines router, profile, and various conditions.
 */
export function useProfile(fields = 'id') {
  const auth = useSelector((state) => state.auth)
  const { user, session } = useUserSession()

  const { profile, isLoading, isError } = useAuthProfileSWR(
    fields,
    session?.access_token
  )

  return {
    auth: auth,
    user: user,
    profile: profile,
    isAuthenticated: auth.isAuthenticated,
    isAuthorized:
      profile?.role === 'Admin' ||
      profile?.role === 'Staff' ||
      profile?.role === 'Mentor',
    isLoading: isLoading,
    isError: isError,
    router: useRouter(),
  }
}
