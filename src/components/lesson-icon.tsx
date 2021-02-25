import { Icon } from '@chakra-ui/react'
import {
  FaLightbulb as FundamentalIcon,
  FaCog as SpecificIcon,
  FaClipboardCheck as ProjectIcon,
} from 'react-icons/fa'

export default function LessonIcon({ type, size = 4 }) {
  return (
    <>
      {type === 'fundamental' && (
        <Icon
          aria-label="Fundamental lesson"
          as={FundamentalIcon}
          boxSize={size}
        />
      )}
      {type === 'specific' && (
        <Icon aria-label="Specific lesson" as={SpecificIcon} boxSize={size} />
      )}
      {type === 'project' && (
        <Icon aria-label="Project lesson" as={ProjectIcon} boxSize={size} />
      )}
    </>
  )
}
