import { Icon } from '@chakra-ui/react'
import { FaFileAlt } from 'react-icons/fa'

export default function LessonIcon({ type, size = 4 }) {
  if (type === 'article') {
    return <Icon aria-label="Article reference" as={FaFileAlt} boxSize={size} />
  }
  return null
}
