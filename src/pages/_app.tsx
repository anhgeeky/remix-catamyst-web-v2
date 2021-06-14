// import '@/styles/fonts.css'
import '@/styles/globals.css'

import type { AppProps } from 'next/app'
import { Provider as ReduxProvider } from 'react-redux'
import { ChakraProvider } from '@chakra-ui/react'
import { PersistGate } from 'redux-persist/integration/react'
import { SWRConfig } from 'swr'

import { theme } from '@/theme'
import { Fonts } from '@/components'
import { AuthProvider } from '@/components/auth'
import { store, persistor } from '@/features/store'
import { swrConfig, splitbee, SentryInit } from '@/lib'
import { isProd } from '@/utils'

SentryInit()

export default function App({ Component, pageProps }: AppProps) {
  // if (isDev) console.info(`🐈 Let's have some debugging!`)
  // if (isProd && !isVercel) console.info(`🐈 Hello, fellow developers!`)
  if (isProd) {
    splitbee.init()
  }

  return (
    <>
      <ChakraProvider theme={theme}>
        <Fonts />
        <ReduxProvider store={store}>
          <SWRConfig value={swrConfig}>
            <PersistGate loading={null} persistor={persistor}>
              <AuthProvider />
              <Component {...pageProps} />
            </PersistGate>
          </SWRConfig>
        </ReduxProvider>
      </ChakraProvider>
    </>
  )
}
