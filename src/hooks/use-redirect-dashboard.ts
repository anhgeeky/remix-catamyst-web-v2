import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useAuth } from '@hooks'

export default function useRedirectDashboard() {
  const router = useRouter()
  const { auth, isAuthorized } = useAuth()

  useEffect(() => {
    if (isAuthorized) router.replace('/dashboard/overview')
  }, [isAuthorized])

  return { auth, isAuthorized }
}
