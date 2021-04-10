import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'

import { useAuthProfileSWR } from '@hooks'

/**
 * Similar to useAuth but fetch a profile.
 * Combines router, profile, and various conditions.
 */
export function useProfile(fields = 'id') {
  const auth = useSelector((state) => state.auth)
  const { profile, isLoading, isError } = useAuthProfileSWR(fields)
  // Previously was => await supabase.from('profiles')

  return {
    router: useRouter(),
    auth,
    profile: profile || null,
    isAuthenticated: auth.isAuthenticated,
    isAuthorized:
      profile?.role === 'Admin' ||
      profile?.role === 'Staff' ||
      profile?.role === 'Mentor',
    isLoading,
    isError,
  }
}
