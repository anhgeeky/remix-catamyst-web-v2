import { useRouter } from 'next/router'
import { useEffect } from 'react'

export function useRouteChanged(callback: () => void) {
  const router = useRouter()

  useEffect(() => {
    const handleRouteChange = () => {
      callback()
    }

    router.events.on('routeChangeComplete', handleRouteChange)

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events, callback])
}
