import NextHead from 'next/head'
import { Box, useColorModeValue } from '@chakra-ui/react'
import { SkipNavContent } from '@chakra-ui/skip-nav'

import { Footer } from '@components'
import dataSite from '@data/site.json'

export function Layout({ title = 'Catamyst', children = null }) {
  const bg = useColorModeValue('gray.50', 'gray.900')

  return (
    <Box bg={bg}>
      <NextHead>
        <title>{title || dataSite.title}</title>
        <meta name="description" content={dataSite.description} />
        <meta property="og:locale" content="en_US" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Catamyst" />
        <meta property="og:title" content={dataSite.title} />
        <meta property="og:description" content={dataSite.description} />
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#00aaaa" />
        <meta name="theme-color" content="#00aaaa" />
      </NextHead>

      <Box as="main" pt={{ base: 45, sm: 55 }} minH="80vh">
        <SkipNavContent>{children}</SkipNavContent>
      </Box>

      <Footer />
    </Box>
  )
}
