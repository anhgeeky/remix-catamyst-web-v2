import { useRouter } from 'next/router'

import { Layout } from '@layouts'
import { HandleProfile } from '@components/handle'

/**
 * Handle page can check either for:
 * User from Supabase
 * Organization from Supabase
 * User from JSON
 * Organization from JSON
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
