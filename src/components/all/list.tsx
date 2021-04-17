import { Text } from '@chakra-ui/react'

export function UnorderedList({ children }) {
  return (
    <Text fontSize={['md', 'lg']} pt={2} pb={2}>
      {children}
    </Text>
  )
}

export function OrderedList({ children }) {
  return (
    <Text fontSize={['md', 'lg']} pt={2} pb={2}>
      {children}
    </Text>
  )
}
