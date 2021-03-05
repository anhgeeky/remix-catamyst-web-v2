import NextHead from 'next/head'
import { Box, useColorModeValue } from '@chakra-ui/react'
import { SkipNavContent } from '@chakra-ui/skip-nav'
import { Header, Footer } from '@components'

export default function Layout({ title, children }) {
  const bg = useColorModeValue('gray.50', 'gray.900')

  return (
    <Box bg={bg}>
      <NextHead>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
      </NextHead>

      <Header />
      <Box as="main" pt="56px" minH="80vh">
        <SkipNavContent>{children}</SkipNavContent>
      </Box>
      <Footer />
    </Box>
  )
}
