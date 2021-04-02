import { useRouter } from 'next/router'
import { useEffect } from 'react'

import { useAuth } from '@hooks'

export function useRedirectSignIn(
  fields = `id, handle, name, role, mode, plan, avatar_url`
) {
  const router = useRouter()
  const { auth, user, profile, isAuthenticated, isAuthorized } = useAuth(fields)

  useEffect(() => {
    if (!isAuthenticated) router.replace('/signin')
  }, [isAuthenticated])

  return {
    router,
    isAuthenticated,
    isAuthorized,
    auth,
    user,
    profile,
  }
}
