import { IconButton } from '@chakra-ui/react'
import { FaTimes, FaGripLines } from 'react-icons/fa'

export function MenuToggle({ openMenu, isMenuOpen = false }) {
  return (
    <IconButton aria-label="Toggle menu" variant="ghost" onClick={openMenu}>
      {isMenuOpen ? <FaTimes /> : <FaGripLines />}
    </IconButton>
  )
}
