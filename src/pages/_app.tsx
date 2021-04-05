import '@styles/globals.css'
import { createContext, useState, useEffect } from 'react'
import type { AppProps } from 'next/app'
import { Provider as ReduxProvider } from 'react-redux'
import { ChakraProvider } from '@chakra-ui/react'
import { PersistGate } from 'redux-persist/integration/react'

import { store, persistor } from '@features/store'
import { Fonts } from '@components'
import theme from '@theme'

import { supabase } from '@lib'
import { AuthSession } from '@supabase/supabase-js'

export default function App({ Component, pageProps }: AppProps) {
  const [session, setSession] = useState<AuthSession | null>(null)

  useEffect(() => {
    setSession(supabase.auth.session())
    supabase.auth.onAuthStateChange(
      (_event: string, session: AuthSession | null) => {
        setSession(session)
      }
    )
  }, [])

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
