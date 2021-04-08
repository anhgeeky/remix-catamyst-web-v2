import { Heading, Button, ButtonGroup } from '@chakra-ui/react'

import { Layout } from '@layouts'
import { Hero, Content } from '@components'

export default function debugPage() {
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
        <ButtonGroup>
          <Button onClick={handleDebug}>Debug</Button>
        </ButtonGroup>
      </Content>
    </Layout>
  )
}
