import { Heading, Button, ButtonGroup } from '@chakra-ui/react'

import { Layout } from '@layouts'
import { Hero, Content } from '@components'

export default function debugPage() {
  const ENV = {
    NEXT_PUBLIC_WEB_URL: process.env.NEXT_PUBLIC_WEB_URL,
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NEXT_PUBLIC_SENTRY_DSN: process.env.NEXT_PUBLIC_SENTRY_DSN,
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  }

  const handleDebug = () => {
    try {
      throw new Error('Debug')
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Layout title="Debug · Catamyst">
      <Hero color="red">
        <Heading as="h1" size="xl">
          Debug
        </Heading>
      </Hero>
      <Content display="flex" justifyContent="center">
        <pre>{JSON.stringify(ENV, null, 2)}</pre>
        <ButtonGroup>
          <Button onClick={handleDebug}>Debug</Button>
        </ButtonGroup>
      </Content>
    </Layout>
  )
}
