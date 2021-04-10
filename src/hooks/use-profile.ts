import { useRouter } from 'next/router'

import { supabase } from '@lib'
import { useAuthProfileSWR } from '@hooks'

/**
 * Similar to useAuth but fetch a profile.
 * Combines router, profile, and various conditions.
 */
export function useProfile(fields = 'id') {
  const router = useRouter()
  const user = supabase.auth.user()
  const {
    profile,
    isAuthenticated,
    isAuthorized,
    isLoading,
    isError,
  } = useAuthProfileSWR(fields)

  return {
    router,
    user,
    profile,
    isAuthenticated,
    isAuthorized,
    isLoading,
    isError,
  }
}
