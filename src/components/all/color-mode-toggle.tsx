import { useColorMode, useColorModeValue, IconButton } from '@chakra-ui/react'
import { FaMoon, FaSun } from 'react-icons/fa'

export function ColorModeToggle() {
  const { colorMode, toggleColorMode } = useColorMode()
  const text = useColorModeValue('dark', 'light')
  const SwitchIcon = useColorModeValue(FaMoon, FaSun)

  return (
    <IconButton
      onClick={toggleColorMode}
      icon={<SwitchIcon opacity={0.5} />}
      aria-label={`Switch to ${text} mode`}
      color="current"
      rounded="full"
      variant="ghost"
    >
      {colorMode === 'light' ? '🌙' : '☀️'}
    </IconButton>
  )
}
