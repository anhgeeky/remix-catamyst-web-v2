import '@styles/globals.css'

import type { AppProps } from 'next/app'
import { Provider as ReduxProvider } from 'react-redux'
import { ChakraProvider } from '@chakra-ui/react'
import { PersistGate } from 'redux-persist/integration/react'
import { SWRConfig } from 'swr'
import * as Sentry from '@sentry/react'
import { Integrations } from '@sentry/tracing'

import theme from '@theme'
import { Header } from '@components'
import { store, persistor } from '@features/store'

const swrConfig = {
  onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
    // Never retry on 404 error.
    if (error.status === 404) return

    // Only retry several times.
    if (retryCount >= 3) return

    // Retry after 3 seconds.
    setTimeout(() => revalidate({ retryCount: retryCount + 1 }), 3000)
  },
}

export default function App({ Component, pageProps }: AppProps) {
  if (process.env.NODE_ENV === 'production' && process.env.VERCEL) {
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
