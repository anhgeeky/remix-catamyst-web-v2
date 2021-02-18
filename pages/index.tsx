import Head from 'next/head'
import Button from '@/components/button'

export default function Home() {
  return (
    <main>
      <Head>
        <title>Catamyst</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1>Catamyst</h1>
      <Button>Click</Button>
    </main>
  )
}
