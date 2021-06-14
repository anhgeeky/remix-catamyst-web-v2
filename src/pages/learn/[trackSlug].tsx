import { useRouter } from 'next/router'

import { Layout } from '@/layouts'
import { TrackDetails } from '@/components/tracks'

export default function trackSlugPage() {
  const router = useRouter()
  const { trackSlug } = router.query

  return (
    <Layout title="Loading track... · Catamyst">
      {trackSlug && <TrackDetails trackSlug={trackSlug} />}
    </Layout>
  )
}
