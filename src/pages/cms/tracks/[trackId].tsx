import { useRouter } from 'next/router'

import { Layout } from '@/layouts'
import { TrackEditor } from '@/components/tracks'

export default function trackIdPage() {
  const router = useRouter()
  const { trackId } = router.query

  return (
    <Layout title="Loading track editor... · Catamyst">
      {trackId && <TrackEditor trackId={trackId} />}
    </Layout>
  )
}
