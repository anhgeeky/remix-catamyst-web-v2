import { useEffect } from 'react'
import { useRouter } from 'next/router'

import { Layout } from '@layouts'

export default function projectsPage() {
  const router = useRouter()
  useEffect(() => {
    router.replace('/discover')
  }, [])
  return <Layout title="Discover members and projects on Catamyst" />
}
