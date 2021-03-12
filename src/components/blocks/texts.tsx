import {
  Box,
  Heading,
  Text,
  List,
  ListItem,
  ListIcon,
  OrderedList,
  Link,
} from '@chakra-ui/react'
import { FaAngleRight } from 'react-icons/fa'
import ReactHtmlParser from 'react-html-parser'

import dataTheme from '@theme/theme.json'

/**
 * The actual block is very simple
 */
export function BlockTexts({ block }) {
  return (
    <Box maxW={dataTheme.maxContentWidth} width="100%" px={5}>
      {ReactHtmlParser(block.html, options)}
    </Box>
  )
}

/**
 * The options are the complex part
 *
 * Because it needs to transform:
 * h1, h2, h3, p, a, ul, ol, li
 *
 * It might transform:
 * kbd, code
 *
 * It won't transform:
 * h4, h5, h6, quote
 */
const options = {
  decodeEntities: true,
  transform: function transform(node, index) {
    const fontSizes = ['md', 'lg']

    if (node.type === 'tag' && node.name === 'h1') {
      return (
        <Heading key={index} as="h1" fontFamily="body" size="xl" pt={5}>
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
        <Text key={index} fontSize={fontSizes} pt={3}>
          {node.children[0].data}
        </Text>
      )
    }
    if (node.type === 'tag' && node.name === 'a') {
      // node.attribs.target = '_blank'
      return (
        <Link key={index} href={node.attribs.href} color="teal.500" isExternal>
          {node.children[0].data}
        </Link>
      )
    }
    if (node.type === 'tag' && node.name === 'ul') {
      return (
        <List key={index} fontSize={fontSizes} spacing={1} pt={3}>
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
        <OrderedList key={index} fontSize={fontSizes} spacing={1} pt={3}>
          {node.children.map((item, index) => {
            return <ListItem key={index}>{item.children[0].data}</ListItem>
          })}
        </OrderedList>
      )
    }
  },
}
