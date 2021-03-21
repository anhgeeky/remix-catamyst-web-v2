import { VStack } from '@chakra-ui/react'

export function CardPlaceholder({ children }) {
  return (
    <VStack
      className="card-placeholder"
      justify="center"
      textAlign="center"
      spacing={3}
      height="100%"
    >
      {children}
    </VStack>
  )
}
