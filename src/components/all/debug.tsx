import { Box, Heading, Button, ButtonGroup, Text } from '@chakra-ui/react'

import { Hero, Content } from '@components'

export function Debug() {
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
    <>
      <Hero color="red">
        <Heading as="h1" size="xl">
          Debug
        </Heading>
      </Hero>
      <Content display="flex" justifyContent="center">
        <Box width="100%" px={5}>
          <Text as="pre">{JSON.stringify(ENV, null, 2)}</Text>
          <ButtonGroup>
            <Button onClick={handleDebug}>Debug</Button>
          </ButtonGroup>
        </Box>
      </Content>
    </>
  )
}
