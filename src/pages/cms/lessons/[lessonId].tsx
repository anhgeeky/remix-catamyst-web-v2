import { Layout } from '@layouts'
import { LessonEditor } from '@components/lessons'
import { useRedirectSignIn } from '@hooks'

/**-----------------------------------------------------------------------------
 * CMS Lesson editor, with UI and logic
 -----------------------------------------------------------------------------*/
export default function lessonIdPage() {
  const { router, isAuthenticated } = useRedirectSignIn()
  const { lessonId } = router.query

  return (
    <Layout title="Loading lesson in CMS... · Catamyst">
      {isAuthenticated && lessonId && (
        <LessonEditor router={router} lessonId={lessonId} />
      )}
    </Layout>
  )
}
