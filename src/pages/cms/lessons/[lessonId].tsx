import { useRouter } from 'next/router'

import { Layout } from '@layouts'
import { LessonEditor } from '@components/lessons'

export default function trackIdPage() {
  const router = useRouter()
  const { lessonId } = router.query

  return (
    <Layout title="Loading lesson editor... · Catamyst">
      {lessonId && <LessonEditor lessonId={lessonId} />}
    </Layout>
  )
}
