import { useEffect } from 'react'
import { useRouter } from 'next/router'

import { Layout } from '@layouts'
import { useAuth } from '@hooks'
import React from 'react'

export default function onboardPage() {
  const router = useRouter()
  const { auth, isAuthenticated } = useAuth()

  useEffect(() => {
    if (isAuthenticated) router.replace('/onboard/hello')
    else router.replace('/signin')
  }, [isAuthenticated])

  return (
    <Layout title="Welcoming... · Catamyst">
      {auth.isLoading && <p>Welcoming...</p>}
    </Layout>
  )
}
