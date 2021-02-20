import { useColorMode, useColorModeValue, IconButton } from '@chakra-ui/react'
import { FaMoon, FaSun } from 'react-icons/fa'

export default function ColorModeToggle() {
  const { colorMode, toggleColorMode } = useColorMode()
  const text = useColorModeValue('dark', 'light')
  const SwitchIcon = useColorModeValue(FaMoon, FaSun)

  return (
    <IconButton
      onClick={toggleColorMode}
      aria-label={`Switch to ${text} mode`}
      color="current"
      icon={<SwitchIcon opacity={0.5} />}
      variant="ghost"
    >
      {colorMode === 'light' ? '🌙' : '☀️'}
    </IconButton>
  )
}
