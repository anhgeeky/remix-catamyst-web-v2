import { Icon } from '@chakra-ui/react'
import { FaLightbulb, FaCube, FaClipboardCheck } from 'react-icons/fa'

export default function LessonIcon({ type, size = 4 }) {
  return (
    <>
      {type === 'fundamental' && (
        <Icon aria-label="Fundamental lesson" as={FaLightbulb} boxSize={size} />
      )}
      {type === 'specific' && (
        <Icon aria-label="Specific lesson" as={FaCube} boxSize={size} />
      )}
      {type === 'project' && (
        <Icon
          aria-label="Project lesson"
          as={FaClipboardCheck}
          boxSize={size}
        />
      )}
    </>
  )
}
