import { useEffect } from 'react'
import { useRouter } from 'next/router'

import { Layout } from '@/layouts'

export default function joinPage() {
  const router = useRouter()
  useEffect(() => {
    router.replace('/signup')
  }, [])
  return <Layout title="Catamyst" />
}
