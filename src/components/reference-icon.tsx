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
