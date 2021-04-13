import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'

import { useUserSession, useAuthProfileSWR } from '@hooks'
import type { RootState } from '@features/store'

/**
 * Similar to useAuth but fetch a profile.
 * Combines router, profile, and various conditions.
 */
export function useProfile() {
  // @ts-ignore
  const auth = useSelector((state: RootState) => state.auth)
  const { user, session } = useUserSession()

  const { profile, isLoading, isError } = useAuthProfileSWR(
    session?.access_token
  )

  // if (!process.env.VERCEL) {
  //   const debugUseProfile = {
  //     auth: auth,
  //     user: user,
  //     profile: profile,
  //     isAuthenticated: auth.isAuthenticated,
  //     isAuthorized: profile?.role,
  //     isLoading: isLoading,
  //     isError: isError,
  //   }
  //   console.warn(debugUseProfile)
  // }

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
