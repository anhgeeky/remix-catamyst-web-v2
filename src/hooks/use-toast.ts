import { useToast as useChakraToast } from '@chakra-ui/react'

export function useToast(options = null) {
  return useChakraToast({
    isClosable: true,
    duration: 3000,
    variant: 'solid',
    position: 'bottom-left',
    ...options,
  })
}
