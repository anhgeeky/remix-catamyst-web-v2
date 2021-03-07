import { useRouter } from 'next/router'
import { useEffect } from 'react'

export default function useRouteChanged(isAuthorized: boolean) {
  const router = useRouter()

  useEffect(() => {
    if (!isAuthorized) router.replace('/signin')
  }, [isAuthorized])
}
