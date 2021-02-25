import { Icon } from '@chakra-ui/react'
import {
  FaBook as BookIcon,
  FaFileAlt as FileIcon,
  FaVideo as VideoIcon,
  FaGlobe as WebIcon,
  FaCube as AppIcon,
  FaPuzzlePiece as ExtensionIcon,
} from 'react-icons/fa'

export default function ReferenceIcon({ type, size = 4 }) {
  if (type === 'book') {
    return <Icon aria-label="Article reference" as={BookIcon} boxSize={size} />
  }
  if (type === 'article') {
    return <Icon aria-label="Book reference" as={FileIcon} boxSize={size} />
  }
  if (type === 'video') {
    return <Icon aria-label="Video reference" as={VideoIcon} boxSize={size} />
  }
  if (type === 'web') {
    return <Icon aria-label="Website reference" as={WebIcon} boxSize={size} />
  }
  if (type === 'app') {
    return (
      <Icon aria-label="Application reference" as={AppIcon} boxSize={size} />
    )
  }
  if (type === 'extension') {
    return (
      <Icon
        aria-label="Extension reference"
        as={ExtensionIcon}
        boxSize={size}
      />
    )
  }
  return null
}
