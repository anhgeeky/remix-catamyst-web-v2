import { useToast as useChakraToast } from '@chakra-ui/react'

export function useToast(options = null) {
  return useChakraToast({
    isClosable: true,
    duration: 1000,
    variant: 'solid',
    position: 'bottom',
    ...options,
  })
}
