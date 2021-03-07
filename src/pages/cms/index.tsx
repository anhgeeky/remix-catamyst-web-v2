import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { Layout } from '@layouts'
import { useAuth } from '@hooks'

export default function CMS() {
  const router = useRouter()
  const { auth, isAuthorized } = useAuth()

  useEffect(() => {
    if (isAuthorized) router.replace('/cms/stats')
    else router.replace('/signin')
  }, [isAuthorized])

  return <Layout>{auth.isLoading && <p>Loading...</p>}</Layout>
}
