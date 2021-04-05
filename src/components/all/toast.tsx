import { useToast, createStandaloneToast } from '@chakra-ui/react'

export function useCustomToast(options = null) {
  return useToast({
    isClosable: true,
    duration: 1000,
    variant: 'solid',
    position: 'bottom-left',
    ...options,
  })
}

export const toast = createStandaloneToast()
