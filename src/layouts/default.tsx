import Head from 'next/head'
import { Box, Container } from '@chakra-ui/react'
import { Header, Footer } from '@/components'

export default function LayoutDefault({ title, children }) {
  return (
    <Box pt={20}>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <Container maxW="1200px" minH="80vh">
        {children}
      </Container>
      <Footer />
    </Box>
  )
}
