import NextHead from 'next/head'
import Image from 'next/image'
import { Code, Box, VStack, useColorModeValue } from '@chakra-ui/react'
import { SkipNavContent } from '@chakra-ui/skip-nav'
import { MDXProvider } from '@mdx-js/react'

import {
  Header,
  Content,
  Footer,
  HeadingOne,
  HeadingTwo,
  HeadingThree,
  Paragraph,
  Divider,
  List,
  UnorderedList,
  OrderedList,
} from '@components'
import dataSite from '@data/site.json'

const mdxComponents = {
  img: Image,
  h1: HeadingOne,
  h2: HeadingTwo,
  h3: HeadingThree,
  p: Paragraph,
  inlineCode: Code,
  hr: Divider,
  ul: UnorderedList,
  ol: OrderedList,
}

export function LayoutGuide({
  title = 'Catamyst',
  description = 'All-in-one platform to learn web and software development',
  children = null,
}) {
  return (
    <Box bg={useColorModeValue('gray.50', 'gray.900')}>
      <Meta meta={{ title, description }} />
      <Header />
      <MDXProvider components={mdxComponents}>
        <Main>
          <Content>
            <VStack>
              <Box width="100%" maxW={760} className="mdx-document">
                {children}
              </Box>
            </VStack>
          </Content>
        </Main>
      </MDXProvider>
      <Footer />
    </Box>
  )
}

export function Main({ children }) {
  return (
    <Box as="main" pt={{ base: '42px', lg: '55px' }} minH="80vh">
      <SkipNavContent>{children}</SkipNavContent>
    </Box>
  )
}

export function Meta({ meta: { title, description } }) {
  return (
    <NextHead>
      <title>{title || dataSite.title}</title>
      <meta name="description" content={description || dataSite.description} />
      <meta property="og:locale" content="en_US" />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Catamyst" />
      <meta property="og:title" content={dataSite.title} />
      <meta property="og:description" content={dataSite.description} />
    </NextHead>
  )
}
