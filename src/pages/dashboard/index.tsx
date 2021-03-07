import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { Layout } from '@layouts'
import { useAuth } from '@hooks'
import React from 'react'

export default function Dashboard() {
  const router = useRouter()
  const { auth, isAuthorized } = useAuth()

  useEffect(() => {
    if (isAuthorized) router.push('/dashboard/overview')
    else router.replace('/signin')
  }, [isAuthorized])

  return <Layout>{auth.isLoading && <p>Loading...</p>}</Layout>
}
