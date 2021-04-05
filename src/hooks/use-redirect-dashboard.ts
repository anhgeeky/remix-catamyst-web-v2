import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useAuth } from '@hooks'

export function useRedirectDashboard() {
  const router = useRouter()
  const { auth, isAuthenticated } = useAuth()

  useEffect(() => {
    if (isAuthenticated) router.replace('/dashboard/overview')
  }, [isAuthenticated])

  return {
    router,
    auth,
    isAuthenticated,
  }
}
