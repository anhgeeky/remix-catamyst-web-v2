import {
  Box,
  Heading,
  Text,
  List,
  ListItem,
  ListIcon,
  OrderedList,
  Link,
  Kbd,
  Code,
  chakra,
} from '@chakra-ui/react'
import { FaAngleRight } from 'react-icons/fa'
import ReactHtmlParser, { convertNodeToElement } from 'react-html-parser'

import dataTheme from '@theme/theme.json'

/**
 * The actual block is very simple.
 */
export function BlockTexts({ block }) {
  return (
    <Box maxW={dataTheme.maxContentWidth} width="100%" px={5}>
      {ReactHtmlParser(block.html, transformOptions)}
    </Box>
  )
}

/**
 * The options are the complex part.
 *
 * Because it needs to transform these:
 * h1, h2, h3, p, a, ul, ol, li
 *
 * It might transform these later:
 * kbd, code
 *
 * It won't transform these yet:
 * h4, h5, h6, quote
 */
export const transformOptions = {
  decodeEntities: true,
  transform: function transform(node, index) {
    const fontSizes = ['md', 'lg']

    console.log(node)

    /**
     * HTML inline elements such as: a, span, b, strong, i, em, code, kbd.
     */
    if (node.type === 'tag' && node.name === 'a') {
      return (
        <Link key={index} href={node.attribs.href} color="teal.500" isExternal>
          {node.children[0].data}
        </Link>
      )
    }
    if (node.type === 'tag' && node.name === 'span') {
      return (
        <Text as="span" key={index}>
          {node.children[0].data}
        </Text>
      )
    }
    if (node.type === 'tag' && node.name === 'b') {
      return (
        <Text as="b" key={index}>
          {node.children[0].data}
        </Text>
      )
    }
    if (node.type === 'tag' && node.name === 'strong') {
      return (
        <Text as="strong" key={index}>
          {node.children[0].data}
        </Text>
      )
    }
    if (node.type === 'tag' && node.name === 'i') {
      return (
        <Text as="i" key={index}>
          {node.children[0].data}
        </Text>
      )
    }
    if (node.type === 'tag' && node.name === 'em') {
      return (
        <Text as="em" key={index}>
          {node.children[0].data}
        </Text>
      )
    }
    if (node.type === 'tag' && node.name === 'code') {
      return <Code key={index}>{node.children[0].data}</Code>
    }
    if (node.type === 'tag' && node.name === 'kbd') {
      return <Kbd key={index}>{node.children[0].data}</Kbd>
    }

    /**
     * HTML block elements such as headings, paragraph
     */
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
    if (node.type === 'tag' && node.name === 'p') {
      return (
        <Text key={index} fontSize={fontSizes} pt={3}>
          {node.children.map((node, index) => {
            if (node.type === 'tag') {
              return transform(node, index)
            }
            if (node.type === 'text') {
              return node.data
            }
          })}
        </Text>
      )
    }
  },
}
