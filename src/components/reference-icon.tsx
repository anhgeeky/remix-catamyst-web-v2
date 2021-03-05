import { Icon } from '@chakra-ui/react'
import {
  FaBook as BookIcon,
  FaFileAlt as FileIcon,
  FaVideo as VideoIcon,
  FaGlobe as WebIcon,
  FaCube as AppIcon,
  FaPuzzlePiece as PluginIcon,
} from 'react-icons/fa'

export default function ReferenceIcon({ category, size = 4 }) {
  if (category === 'Book') {
    return <Icon aria-label="Article reference" as={BookIcon} boxSize={size} />
  }
  if (category === 'Article') {
    return <Icon aria-label="Book reference" as={FileIcon} boxSize={size} />
  }
  if (category === 'Video') {
    return <Icon aria-label="Video reference" as={VideoIcon} boxSize={size} />
  }
  if (category === 'Website') {
    return <Icon aria-label="Website reference" as={WebIcon} boxSize={size} />
  }
  if (category === 'Plugin') {
    return <Icon aria-label="Plugin reference" as={PluginIcon} boxSize={size} />
  }
  if (category === 'App') {
    return (
      <Icon aria-label="Application reference" as={AppIcon} boxSize={size} />
    )
  }
  return null
}
