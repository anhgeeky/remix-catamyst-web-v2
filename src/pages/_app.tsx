import '@styles/globals.css'
import type { AppProps } from 'next/app'
import { Provider as ReduxProvider } from 'react-redux'
import { ChakraProvider } from '@chakra-ui/react'
import { PersistGate } from 'redux-persist/integration/react'

import theme from '@theme'
import { Fonts } from '@components'
import { AuthSession } from '@components/auth'
import { store, persistor } from '@features/store'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <ChakraProvider theme={theme}>
        <ReduxProvider store={store}>
          <Fonts />
          <AuthSession />
          <PersistGate loading={null} persistor={persistor}>
            <Component {...pageProps} />
          </PersistGate>
        </ReduxProvider>
      </ChakraProvider>
    </>
  )
}
