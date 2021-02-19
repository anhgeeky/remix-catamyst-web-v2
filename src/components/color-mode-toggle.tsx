import { useColorMode, useColorModeValue, IconButton } from '@chakra-ui/react'
import { FaMoon, FaSun } from 'react-icons/fa'

export default function ColorModeToggle({ display }) {
  const { colorMode, toggleColorMode } = useColorMode()
  const text = useColorModeValue('dark', 'light')
  const SwitchIcon = useColorModeValue(FaMoon, FaSun)

  return (
    <IconButton
      onClick={toggleColorMode}
      aria-label={`Switch to ${text} mode`}
      color="current"
      display={display}
      icon={<SwitchIcon />}
      variant="ghost"
    >
      {colorMode === 'light' ? '🌙' : '☀️'}
    </IconButton>
  )
}
