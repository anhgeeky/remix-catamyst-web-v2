import { Button } from '@chakra-ui/react'
import { CloseIcon, HamburgerIcon } from '@chakra-ui/icons'

export default function MenuToggle({ handleMenuToggle, isMenuOpen = false }) {
  return (
    <Button onClick={handleMenuToggle} variant="ghost">
      {isMenuOpen ? <CloseIcon /> : <HamburgerIcon />}
    </Button>
  )
}
