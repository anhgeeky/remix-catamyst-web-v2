import { useEffect } from 'react'
import { useRouter } from 'next/router'

import { Layout } from '@/layouts'

export default function loginPage() {
  const router = useRouter()
  useEffect(() => {
    router.replace('/signin')
  }, [])
  return <Layout title="Catamyst" />
}
