import '@styles/globals.css'

import type { AppProps } from 'next/app'
import { Provider as ReduxProvider } from 'react-redux'
import { ChakraProvider } from '@chakra-ui/react'
import { PersistGate } from 'redux-persist/integration/react'

import { Fonts } from '@components'
import theme from '@theme'
import { store, persistor } from '@features/store'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <ChakraProvider theme={theme}>
        <ReduxProvider store={store}>
          <Fonts />
          <PersistGate loading={null} persistor={persistor}>
            <Component {...pageProps} />
          </PersistGate>
        </ReduxProvider>
      </ChakraProvider>
    </>
  )
}
