import { useEffect } from 'react'
import { useRouter } from 'next/router'

import { Layout } from '@layouts'

export default function registerPage() {
  const router = useRouter()
  useEffect(() => {
    router.replace('/signup')
  }, [])
  return <Layout title="Catamyst" />
}
