import { convertNodeToElement } from 'react-html-parser'
import {
  Heading,
  Text,
  List,
  ListItem,
  ListIcon,
  OrderedList,
  UnorderedList,
} from '@chakra-ui/react'
import { FaAngleRight } from 'react-icons/fa'
import { v4 as uuidv4 } from 'uuid'

export default function transform(node, index) {
  const fontSizes = ['sm', 'md']
  const data = node.children[0].data
  const uuid = uuidv4()

  if (node.name === 'h1') {
    return (
      <Heading key={uuid} as="h1" fontFamily="body" size="xl" pt={10}>
        {data}
      </Heading>
    )
  }
  if (node.name === 'h2') {
    return (
      <Heading key={uuid} as="h2" fontFamily="body" size="lg" pt={5}>
        {data}
      </Heading>
    )
  }
  if (node.name === 'h3') {
    return (
      <Heading key={uuid} as="h3" fontFamily="body" size="md" pt={3}>
        {data}
      </Heading>
    )
  }
  if (node.name === 'p') {
    return (
      <Text key={uuid} fontSize={fontSizes} pt={3}>
        {data}
      </Text>
    )
  }
  if (node.name === 'ul') {
    return (
      <List key={uuid} fontSize={fontSizes} spacing={1} pt={3}>
        {node.children.map((item, index) => {
          return (
            <ListItem key={index}>
              <ListIcon as={FaAngleRight} color="teal.500" />
              <Text as="span">{item.children[0].data}</Text>
            </ListItem>
          )
        })}
      </List>
    )
  }
  if (node.name === 'ol') {
    return (
      <OrderedList key={uuid} fontSize={fontSizes} spacing={1} pt={3}>
        {node.children.map((item, index) => {
          return <ListItem key={index}>{item.children[0].data}</ListItem>
        })}
      </OrderedList>
    )
  }
  return null
}
