import {
  Text,
  List as ChakraList,
  ListItem as ChakraListItem,
  ListIcon as ChakraListIcon,
  OrderedList as ChakraOrderedList,
  UnorderedList as ChakraUnorderedList,
} from '@chakra-ui/react'
import { FaAngleRight } from 'react-icons/fa'

const fontSizes = ['md', 'lg']

export function List({ children }) {
  return (
    <ChakraList fontSize={fontSizes} spacing={1} py={2}>
      <ChakraListIcon as={FaAngleRight} color="teal.500" />
      {children}
    </ChakraList>
  )
}

export function UnorderedList({ children }) {
  return (
    <ChakraUnorderedList fontSize={fontSizes} spacing={1} py={2}>
      {children}
    </ChakraUnorderedList>
  )
}

export function OrderedList({ children }) {
  return (
    <ChakraOrderedList fontSize={fontSizes} spacing={1} py={2}>
      {children}
    </ChakraOrderedList>
  )
}
