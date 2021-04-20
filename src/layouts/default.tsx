import NextHead from 'next/head'
import { Box, useColorModeValue } from '@chakra-ui/react'
import { SkipNavContent } from '@chakra-ui/skip-nav'

import { Header, Footer } from '@components'
import { dataSite } from '@data'

/**
 * Re-render everytime pages are changed.
 */
export function LayoutDefault({
  title = 'Catamyst',
  description = 'All-in-one platform to learn web and software development',
  children = null,
}) {
  return (
    <Box bg={useColorModeValue('gray.50', 'gray.900')}>
      <Meta meta={{ title, description }} />
      <Header />
      <Main>{children}</Main>
      <Footer />
    </Box>
  )
}

export function Main({ children }) {
  return (
    <Box as="main" pt={{ base: '50px', lg: '55px' }} minH="80vh">
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
