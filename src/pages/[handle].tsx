import { useRouter } from 'next/router'

import { Layout } from '@/layouts'
import { HandleProfile } from '@/components/handle'

/**
 * Handle page can check either for:
 * 1. User from API/Supabase
 * 2. Organization from API/Supabase
 * 3. User from JSON
 * 4. Organization from JSON
 */
export default function handlePage() {
  const router = useRouter()
  const { handle } = router.query

  return (
    <Layout title="Catamyst">
      {handle && <HandleProfile handle={handle} />}
    </Layout>
  )
}
