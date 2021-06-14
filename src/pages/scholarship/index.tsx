import { useEffect } from 'react'
import { useRouter } from 'next/router'

import { Layout } from '@/layouts'

export default function scholarshipPage() {
  const router = useRouter()

  useEffect(() => {
    router.replace('/scholarship/qopnet')
  }, [])

  return (
    <Layout title="Loading scholarship... · Catamyst">
      <p>Loading scholarship...</p>
    </Layout>
  )
}
