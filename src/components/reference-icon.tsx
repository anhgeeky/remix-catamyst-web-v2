import { Icon as ChakraIcon } from '@chakra-ui/react'
import {
  FaBook as BookIcon,
  FaFileAlt as FileIcon,
  FaVideo as VideoIcon,
  FaGlobe as WebIcon,
  FaCube as AppIcon,
  FaPuzzlePiece as PluginIcon,
} from 'react-icons/fa'
import { Icon } from '@components'

export default function ReferenceIcon({ name, size = 4 }) {
  if (name === 'Book') {
    return (
      <ChakraIcon aria-label="Article reference" as={BookIcon} boxSize={size} />
    )
  }
  if (name === 'Article') {
    return (
      <ChakraIcon aria-label="Book reference" as={FileIcon} boxSize={size} />
    )
  }
  if (name === 'Video') {
    return (
      <ChakraIcon aria-label="Video reference" as={VideoIcon} boxSize={size} />
    )
  }
  if (name === 'Website') {
    return (
      <ChakraIcon aria-label="Website reference" as={WebIcon} boxSize={size} />
    )
  }
  if (name === 'Plugin') {
    return (
      <ChakraIcon
        aria-label="Plugin reference"
        as={PluginIcon}
        boxSize={size}
      />
    )
  }
  if (name === 'App') {
    return (
      <ChakraIcon
        aria-label="Application reference"
        as={AppIcon}
        boxSize={size}
      />
    )
  }
  return <Icon name="name" />
}
