import { Heading, Button, Link } from '@chakra-ui/react'

import { Layout } from '@layouts'

export default function guidePage() {
  return (
    <Layout title="Guide · Catamyst">
      <Heading as="h1" size="lg">
        Catamyst Business
      </Heading>
      <Heading as="h2" size="md">
        Service plan for custom training, mentorship, scholarship, or
        recruitment.
      </Heading>
      <Button isExternal as={Link} href="https://a.catamyst.com/business">
        Read Catamyst Business guide
      </Button>
    </Layout>
  )
}
