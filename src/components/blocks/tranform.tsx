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
  const data = node.children[0].data
  const uuid = uuidv4()

  if (node.name === 'h1') {
    return (
      <Heading key={uuid} as="h1" fontFamily="body" size="xl" mt={12} mb={6}>
        {data}
      </Heading>
    )
  }
  if (node.name === 'h2') {
    return (
      <Heading key={uuid} as="h2" fontFamily="body" size="lg" mt={8} mb={4}>
        {data}
      </Heading>
    )
  }
  if (node.name === 'h3') {
    return (
      <Heading key={uuid} as="h3" fontFamily="body" size="md" mt={6} mb={3}>
        {data}
      </Heading>
    )
  }
  if (node.name === 'p') {
    return (
      <Text key={uuid} fontSize={['md', 'lg']} mt={6} mb={3}>
        {data}
      </Text>
    )
  }
  if (node.name === 'ul') {
    return (
      <List key={uuid} fontSize={['md', 'lg']} spacing={1}>
        {node.children.map((item, index) => {
          return (
            <ListItem key={index}>
              <ListIcon as={FaAngleRight} color="cyan.500" />
              <Text as="span">{item.children[0].data}</Text>
            </ListItem>
          )
        })}
      </List>
    )
  }
  if (node.name === 'ol') {
    return (
      <OrderedList key={uuid} fontSize={['md', 'lg']} spacing={1}>
        {node.children.map((item, index) => {
          return <ListItem key={index}>{item.children[0].data}</ListItem>
        })}
      </OrderedList>
    )
  }
  return null
}
