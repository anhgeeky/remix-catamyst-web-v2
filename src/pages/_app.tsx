import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Provider as ReduxProvider } from 'react-redux'
import { ChakraProvider } from '@chakra-ui/react'
import { Fonts } from '@/components'
import theme from '@/theme/index'
import reduxStore from '@/features/store'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <ReduxProvider store={reduxStore}>
        <Fonts />
        <Component {...pageProps} />
      </ReduxProvider>
    </ChakraProvider>
  )
}
