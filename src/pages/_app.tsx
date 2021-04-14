// import '@styles/fonts.css'
import '@styles/globals.css'

import type { AppProps } from 'next/app'
import { Provider as ReduxProvider } from 'react-redux'
import { ChakraProvider } from '@chakra-ui/react'
import { PersistGate } from 'redux-persist/integration/react'
import { SWRConfig } from 'swr'

import { theme } from '@theme'
import { Fonts } from '@components'
import { AuthProvider } from '@components/auth'
import { store, persistor } from '@features/store'
import { swrConfig, splitbee, Sentry, Integrations } from '@lib'
import { env, isDev, isProd, isVercel } from '@utils'

export default function App({ Component, pageProps }: AppProps) {
  if (isDev) {
    console.info(`🐈 Let's have some debugging!`)
  }
  if (isProd && !isVercel) {
    console.info(`🐈 Hello, fellow developers!`)
  }
  if (isProd && isVercel) {
    /**
     * Splitbee for regular analytics.
     */
    splitbee.init()

    /**
     * Sentry for app monitoring and error tracking.
     */
    Sentry.init({
      dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
      integrations: [new Integrations.BrowserTracing()],
      // Set tracesSampleRate to 1.0 to capture 100%
      // of transactions for performance monitoring.
      // Recommend to adjust in production.
      tracesSampleRate: 1.0,
    })
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
