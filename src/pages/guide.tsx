import { Heading, ButtonGroup } from '@chakra-ui/react'

import { Layout } from '@layouts'
import { LinkButton } from '@components'

export default function guidePage() {
  return (
    <Layout title="Guide · Catamyst">
      <Heading as="h1">Pick a guide</Heading>
      <ButtonGroup>
        <LinkButton href="/guide/super">Catamyst Super</LinkButton>
        <LinkButton href="/guide/business">Catamyst Business</LinkButton>
      </ButtonGroup>
    </Layout>
  )
}
