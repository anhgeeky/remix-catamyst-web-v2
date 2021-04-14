// import '@styles/fonts.css'
import '@styles/globals.css'

import type { AppProps } from 'next/app'
import { Provider as ReduxProvider } from 'react-redux'
import { ChakraProvider } from '@chakra-ui/react'
import { PersistGate } from 'redux-persist/integration/react'
import { SWRConfig } from 'swr'

import { theme, consoleColor } from '@theme'
import { Fonts, Header } from '@components'
import { store, persistor } from '@features/store'
import { swrConfig, splitbee, Sentry, Integrations } from '@lib'
import { isDev, isProd, isVercel } from '@utils'

export default function App({ Component, pageProps }: AppProps) {
  if (isDev) {
    console.info(`%c Let's have some debugging! `, consoleColor)
  }
  if (isProd && !isVercel) {
    console.info('%c Hello, fellow developers! ', consoleColor)
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
              <Header />
              <Component {...pageProps} />
            </PersistGate>
          </SWRConfig>
        </ReduxProvider>
      </ChakraProvider>
    </>
  )
}
