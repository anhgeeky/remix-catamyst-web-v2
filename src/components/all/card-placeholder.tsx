import { VStack } from '@chakra-ui/react'

export function CardPlaceholder({ children }) {
  return (
    <VStack
      className="card-placeholder"
      textAlign="center"
      spacing={3}
      maxW="400px"
    >
      {children}
    </VStack>
  )
}
