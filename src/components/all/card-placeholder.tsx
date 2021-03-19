import { VStack } from '@chakra-ui/react'

export function CardPlaceholder({ children }) {
  return (
    <VStack
      className="card-placeholder"
      justify="center"
      height="100%"
      textAlign="center"
      spacing={3}
    >
      {children}
    </VStack>
  )
}
