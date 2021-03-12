import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useAuth } from '@hooks'

export default function useRedirectSignIn() {
  const router = useRouter()
  const { auth, isAuthorized } = useAuth()

  useEffect(() => {
    if (!isAuthorized) router.replace('/signin')
  }, [isAuthorized])

  return {
    router,
    auth,
    isAuthorized,
  }
}
