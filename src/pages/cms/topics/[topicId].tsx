import { useEffect } from 'react'

import { useProfile } from '@hooks'

export default function topicIdPage() {
  const { router, isAuthorized } = useProfile()
  const { topicId } = router.query

  useEffect(() => {
    if (!isAuthorized) router.replace('/dashboard/overview')
  }, [isAuthorized])

  return (
    <div>
      <h1>Edit track #{topicId}</h1>
    </div>
  )
}
