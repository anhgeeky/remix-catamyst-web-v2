import { Icon } from '@chakra-ui/react'
import { FaBook, FaFileAlt, FaVideo } from 'react-icons/fa'

export default function LessonIcon({ type, size = 4 }) {
  if (type === 'book') {
    return <Icon aria-label="Article reference" as={FaBook} boxSize={size} />
  }
  if (type === 'article') {
    return <Icon aria-label="Book reference" as={FaFileAlt} boxSize={size} />
  }
  if (type === 'video') {
    return <Icon aria-label="Video reference" as={FaVideo} boxSize={size} />
  }
  return null
}
