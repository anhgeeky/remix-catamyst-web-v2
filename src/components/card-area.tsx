import { Stack, useColorModeValue } from '@chakra-ui/react'

export function CardArea({ children }) {
  return (
    <Stack
      border="1px solid"
      borderColor={useColorModeValue('gray.200', 'gray.700')}
      maxW="800px"
      p={2}
      rounded="md"
      width="100%"
    >
      {children}
    </Stack>
  )
}
