import { useEffect } from 'react'

import { Layout } from '@layouts'
import { LessonEditor } from '@components/lessons'
import { useProfile } from '@hooks'

/**-----------------------------------------------------------------------------
 * CMS Lesson editor, with UI and logic
 -----------------------------------------------------------------------------*/
export default function lessonIdPage() {
  const { router, isAuthorized } = useProfile()
  const { lessonId } = router.query

  useEffect(() => {
    if (!isAuthorized) router.replace('/dashboard/overview')
  }, [isAuthorized])

  return (
    <Layout title="Loading lesson in CMS... · Catamyst">
      {isAuthorized && lessonId && (
        <LessonEditor router={router} lessonId={lessonId} />
      )}
    </Layout>
  )
}
