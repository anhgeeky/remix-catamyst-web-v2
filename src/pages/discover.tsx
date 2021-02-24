import NextLink from 'next/link'
import { Text, Heading } from '@chakra-ui/react'
import { Layout } from '@/layouts'
import { Hero, Content, CollectionUsers } from '@/components'
import users from '@/data/users.json'

export default function Discover() {
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
        <CollectionUsers users={users} />
      </Content>
    </Layout>
  )
}
