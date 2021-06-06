import {
  chakra,
  List as ChakraList,
  ListItem as ChakraListItem,
  ListIcon as ChakraListIcon,
  OrderedList as ChakraOrderedList,
  UnorderedList as ChakraUnorderedList,
} from '@chakra-ui/react'
import { FaAngleRight } from 'react-icons/fa'

const fontSizes = ['md', 'lg']

/**
 * UL without bullets.
 */
export function List({ children }) {
  return (
    <ChakraList fontSize={fontSizes} py={2} spacing={1}>
      {children}
    </ChakraList>
  )
}

/**
 * UL with bullets.
 */
export function UnorderedList({ children }) {
  return (
    <ChakraUnorderedList fontSize={fontSizes} spacing={1} py={2}>
      {children}
    </ChakraUnorderedList>
  )
}

/**
 * OL with numbers.
 */
export function OrderedList({ children }) {
  return (
    <ChakraOrderedList fontSize={fontSizes} spacing={1} py={2}>
      {children}
    </ChakraOrderedList>
  )
}

/**
 * LI
 */
export function ListItem({ children }) {
  return <ChakraListItem>{children}</ChakraListItem>
}

/**
 * LI with number.
 */
export function ListItemNumber({ no = 0, children }) {
  return (
    <ChakraListItem>
      <chakra.span color="teal.500" mr={3}>
        {no}.
      </chakra.span>
      {children}
    </ChakraListItem>
  )
}

/**
 * LI with icon.
 */
export function ListItemIcon({ children }) {
  return (
    <ChakraListItem>
      <ChakraListIcon as={FaAngleRight} color="teal.500" />
      {children}
    </ChakraListItem>
  )
}
