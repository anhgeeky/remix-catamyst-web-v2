import { convertNodeToElement } from 'react-html-parser'
import {
  Heading,
  Text,
  List,
  ListItem,
  ListIcon,
  OrderedList,
  Link,
} from '@chakra-ui/react'
import { FaAngleRight } from 'react-icons/fa'

/**
 * Options to transform with react-html-parser
 */
export default {
  decodeEntities: true,
  transform: function transform(node, index) {
    const fontSizes = ['md', 'lg']

    if (node.type === 'tag' && node.name === 'h1') {
      return (
        <Heading key={index} as="h1" fontFamily="body" size="xl" pt={10}>
          {node.children[0].data}
        </Heading>
      )
    }
    if (node.type === 'tag' && node.name === 'h2') {
      return (
        <Heading key={index} as="h2" fontFamily="body" size="lg" pt={5}>
          {node.children[0].data}
        </Heading>
      )
    }
    if (node.type === 'tag' && node.name === 'h3') {
      return (
        <Heading key={index} as="h3" fontFamily="body" size="md" pt={3}>
          {node.children[0].data}
        </Heading>
      )
    }
    if (node.type === 'tag' && node.name === 'p') {
      return (
        <Text key={index} fontSize={fontSizes} pt={5}>
          {node.children[0].data}
        </Text>
      )
    }
    if (node.type === 'tag' && node.name === 'a') {
      node.attribs.target = '_blank'
      return (
        <Link key={index} href={node.attribs.href} color="teal.500" isExternal>
          {node.children[0].data}
        </Link>
      )
    }
    if (node.type === 'tag' && node.name === 'ul') {
      return (
        <List key={index} fontSize={fontSizes} spacing={1} pt={5}>
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
    if (node.type === 'tag' && node.name === 'ol') {
      return (
        <OrderedList key={index} fontSize={fontSizes} spacing={1} pt={5}>
          {node.children.map((item, index) => {
            return <ListItem key={index}>{item.children[0].data}</ListItem>
          })}
        </OrderedList>
      )
    }
  },
}
