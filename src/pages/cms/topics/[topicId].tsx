import { useRouter } from 'next/router'

export default function TopicId() {
  const router = useRouter()
  const { topicId } = router.query

  return (
    <div>
      <h1>Edit track #{topicId}</h1>
    </div>
  )
}
