import { Icon } from '@chakra-ui/react'
import {
  FaLightbulb as FundamentalIcon,
  FaCog as SpecificIcon,
  FaPencilAlt as ProjectIcon,
  FaCat as UnknownIcon,
} from 'react-icons/fa'

export function LessonIcon({ type, size = 4 }) {
  if (type === 'Fundamental') {
    return (
      <Icon
        aria-label="Fundamental lesson"
        as={FundamentalIcon}
        boxSize={size}
        color="yellow.500"
      />
    )
  }
  if (type === 'Specific') {
    return (
      <Icon
        aria-label="Specific lesson"
        as={SpecificIcon}
        boxSize={size}
        color="blue.500"
      />
    )
  }
  if (type === 'Project') {
    return (
      <Icon
        aria-label="Project lesson"
        as={ProjectIcon}
        boxSize={size}
        color="green.500"
      />
    )
  }
  return (
    <Icon
      aria-label="Unknown category"
      as={UnknownIcon}
      boxSize={size}
      color="gray.500"
    />
  )
}
