import { Heading, Button, Link } from '@chakra-ui/react'

import { Layout } from '@layouts'

export default function guidePage() {
  return (
    <Layout title="Guide · Catamyst">
      <Heading as="h1" size="lg">
        Catamyst Super
      </Heading>
      <Heading as="h2" size="md">
        Plan for learning with mentorship
      </Heading>
      <Button isExternal as={Link} href="https://a.catamyst.com/learn">
        Read the guide
      </Button>
    </Layout>
  )
}
