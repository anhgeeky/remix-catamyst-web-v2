import { Text, Heading } from '@chakra-ui/react'

import { Layout } from '@layouts'
import { Content, Hero } from '@components'
import { DiscoverFeatured } from '@components/discover'

export default function discoverPage() {
  return (
    <Layout title="Discover members and projects on Catamyst">
      <Hero>
        <Heading as="h1" size="xl">
          Discover members and projects
        </Heading>
        <Text>
          Connect with learners, developers, and designers on Catamyst. Check
          out their showcase projects!
        </Text>
      </Hero>
      <Content>
        <DiscoverFeatured />
      </Content>
    </Layout>
  )
}
