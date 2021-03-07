import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { Layout } from '@layouts'
import { useAuth, useAuthorized } from '@hooks'
import React from 'react'

export default function Dashboard() {
  const { isAuthorized } = useAuth()
  const router = useRouter()

  useAuthorized(isAuthorized)
  useEffect(() => {
    if (isAuthorized) {
      router.push('/dashboard/overview')
    }
  }, [])

  return <Layout>.</Layout>
}
