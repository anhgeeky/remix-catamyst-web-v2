import { Icon } from '@chakra-ui/react'
import {
  FaLightbulb as FundamentalIcon,
  FaCog as SpecificIcon,
  FaClipboardCheck as ProjectIcon,
  FaCat as UnknownIcon,
} from 'react-icons/fa'

export default function LessonIcon({ type, size = 4 }) {
  if (type === 'fundamental') {
    return (
      <Icon
        aria-label="Fundamental lesson"
        as={FundamentalIcon}
        boxSize={size}
      />
    )
  }
  if (type === 'specific') {
    return (
      <Icon aria-label="Specific lesson" as={SpecificIcon} boxSize={size} />
    )
  }
  if (type === 'project') {
    return <Icon aria-label="Project lesson" as={ProjectIcon} boxSize={size} />
  }
  return <Icon aria-label="Unknown category" as={UnknownIcon} boxSize={size} />
}
