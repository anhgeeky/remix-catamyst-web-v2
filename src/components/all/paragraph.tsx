import { Text } from '@chakra-ui/react'

export function Paragraph({ children }) {
  return (
    <Text fontSize={['md', 'lg']} pt={2} pb={2}>
      {children}
    </Text>
  )
}
