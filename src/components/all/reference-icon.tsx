import { Icon as ChakraIcon } from '@chakra-ui/react'
import {
  FaBook as BookIcon,
  FaBoxOpen as AppIcon,
  FaFileAlt as FileIcon,
  FaGlobe as WebIcon,
  FaPuzzlePiece as PluginIcon,
  FaVideo as VideoIcon,
} from 'react-icons/fa'

import { Icon } from '@/components'

export function ReferenceIcon({ name, size = 4 }) {
  if (name === 'Book') {
    return <ChakraIcon aria-label="Article link" as={BookIcon} boxSize={size} />
  }
  if (name === 'Article') {
    return <ChakraIcon aria-label="Book link" as={FileIcon} boxSize={size} />
  }
  if (name === 'Video') {
    return <ChakraIcon aria-label="Video link" as={VideoIcon} boxSize={size} />
  }
  if (name === 'Website') {
    return <ChakraIcon aria-label="Website link" as={WebIcon} boxSize={size} />
  }
  if (name === 'Plugin') {
    return (
      <ChakraIcon aria-label="Plugin link" as={PluginIcon} boxSize={size} />
    )
  }
  if (name === 'App') {
    return (
      <ChakraIcon aria-label="Application link" as={AppIcon} boxSize={size} />
    )
  }
  return <Icon name="name" />
}
