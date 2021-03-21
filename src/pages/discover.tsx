import { Text, Heading, Stack } from '@chakra-ui/react'

import { Layout } from '@layouts'
import {
  CollectionOrganizations,
  CollectionUsers,
  Content,
  HeadingStack,
  Hero,
} from '@components'

import dataUsers from '@data/users.json'
import dataOrganizations from '@data/organizations.json'

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
        <Stack spacing={10} width="100%">
          <Stack>
            <HeadingStack>Featured Members</HeadingStack>
            <CollectionUsers users={dataUsers} />
          </Stack>

          <Stack>
            <HeadingStack>Featured Organizations</HeadingStack>
            <CollectionOrganizations organizations={dataOrganizations} />
          </Stack>
        </Stack>
      </Content>
    </Layout>
  )
}
