import '@/styles/globals.css'
import NextHead from 'next/head'
import type { AppProps } from 'next/app'
import { Provider as ReduxProvider } from 'react-redux'
import { ChakraProvider } from '@chakra-ui/react'

import { Fonts } from '@/components'
import theme from '@/theme/index'
import reduxStore from '@/features/store'
import site from '@/data/site.json'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <NextHead>
        <meta charSet="utf-8" />
        <title>{site.title}</title>
        <meta name="description" content={site.description} />
        <meta property="og:locale" content="en_US" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Catamyst" />
        <meta property="og:title" content={site.title} />
        <meta property="og:description" content={site.description} />
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

      <ChakraProvider theme={theme}>
        <ReduxProvider store={reduxStore}>
          <Fonts />
          <Component {...pageProps} />
        </ReduxProvider>
      </ChakraProvider>
    </>
  )
}
