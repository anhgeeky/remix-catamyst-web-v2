import type { AppProps } from 'next/app'
import 'public/globals.css'

export default function CatamystApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
