import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { Layout } from '@layouts'
import { useAuth } from '@hooks'
import React from 'react'

export default function dashboardPage() {
  const router = useRouter()
  const { auth, isAuthorized } = useAuth()

  useEffect(() => {
    if (isAuthorized) router.replace('/dashboard/overview')
    else router.replace('/signin')
  }, [isAuthorized])

  return <Layout>{auth.isLoading && <p>Loading...</p>}</Layout>
}
