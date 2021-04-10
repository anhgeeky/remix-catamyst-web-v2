import '@styles/globals.css'
import type { AppProps } from 'next/app'
import { Provider as ReduxProvider } from 'react-redux'
import { ChakraProvider } from '@chakra-ui/react'
import { PersistGate } from 'redux-persist/integration/react'
import * as Sentry from '@sentry/react'
import { Integrations } from '@sentry/tracing'

import theme from '@theme'
import { Fonts, Header, Footer } from '@components'
import { store, persistor } from '@features/store'
import { useSession } from '@hooks'

export default function App({ Component, pageProps }: AppProps) {
  if (process.env.NODE_ENV === 'production' && process.env.VERCEL) {
    Sentry.init({
      dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
      integrations: [new Integrations.BrowserTracing()],
      // Set tracesSampleRate to 1.0 to capture 100%
      // of transactions for performance monitoring.
      // We recommend adjusting this value in production
      tracesSampleRate: 1.0,
    })
  }

  useSession()

  return (
    <>
      <ChakraProvider theme={theme}>
        <ReduxProvider store={store}>
          <Fonts />
          <PersistGate loading={null} persistor={persistor}>
            <Header />
            <Component {...pageProps} />
            <Footer />
          </PersistGate>
        </ReduxProvider>
      </ChakraProvider>
    </>
  )
}
