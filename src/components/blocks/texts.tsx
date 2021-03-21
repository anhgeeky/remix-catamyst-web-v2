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
import ReactHtmlParser from 'react-html-parser'
import slugify from 'slugify'

/**
 * The actual block is very simple.
 */
export function BlockTexts({ block }) {
  return (
    <Box className="block-texts" width="100%" maxW={760} px={5}>
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
    const fontSizes = ['sm', 'lg']

    /**
     * HTML inline elements such as: a, span, b, strong, i, em, code, kbd.
     */
    if (node.type === 'tag' && node.name === 'a') {
      return (
        <Link
          key={index}
          href={node.attribs.href}
          color="teal.500"
          fontWeight="500"
          isExternal
        >
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
        <CustomHeading key={index} as="h1" size="xl" pt={6} pb={4}>
          {node.children[0].data}
        </CustomHeading>
      )
    }
    if (node.type === 'tag' && node.name === 'h2') {
      return (
        <CustomHeading key={index} as="h2" size="lg" pt={5} pb={3}>
          {node.children[0].data}
        </CustomHeading>
      )
    }
    if (node.type === 'tag' && node.name === 'h3') {
      return (
        <CustomHeading key={index} as="h3" size="md" pt={4} pb={2}>
          {node.children[0].data}
        </CustomHeading>
      )
    }
    if (node.type === 'tag' && node.name === 'p') {
      return (
        <Text key={index} fontSize={fontSizes} pt={2} pb={2}>
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
    if (node.type === 'tag' && node.name === 'ul') {
      return (
        <List key={index} fontSize={fontSizes} spacing={1} pt={2} pb={2}>
          {node.children.map((item, index) => {
            return (
              <ListItem key={index}>
                <ListIcon as={FaAngleRight} color="teal.500" />
                <Text as="span">
                  {item.children.map((node, index) => {
                    if (node.type === 'tag') {
                      return transform(node, index)
                    }
                    if (node.type === 'text') {
                      return node.data
                    }
                  })}
                </Text>
              </ListItem>
            )
          })}
        </List>
      )
    }
    if (node.type === 'tag' && node.name === 'ol') {
      return (
        <OrderedList key={index} fontSize={fontSizes} spacing={1} pt={2} pb={2}>
          {node.children.map((item, index) => {
            return (
              <ListItem key={index}>
                {item.children.map((node, index) => {
                  if (node.type === 'tag') {
                    return transform(node, index)
                  }
                  if (node.type === 'text') {
                    return node.data
                  }
                })}
              </ListItem>
            )
          })}
        </OrderedList>
      )
    }
  },
}

function CustomHeading(props) {
  const slug = slugify(props.children, { lower: true })
  return (
    <Heading
      className="heading-with-anchor"
      fontFamily="body"
      id={slug}
      {...props}
    >
      <span>{props.children}</span>
      <Link
        href={`#${slug}`}
        aria-label={`Anchor to ${props.children}`}
        color="teal.500"
        opacity={0}
        ml={3}
      >
        #
      </Link>
    </Heading>
  )
}
