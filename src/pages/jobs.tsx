import { Heading, Text } from '@chakra-ui/react'

import { Layout } from '@layouts'
import { Hero, Content } from '@components'

export default function jobsPage() {
  return (
    <Layout title="Search and post jobs on Catamyst">
      <Hero>
        <Heading as="h1" size="xl">
          Jobs
        </Heading>
        <Text>Search your next opportunities and post job vacancies.</Text>
      </Hero>

      <Content>
        <Text>Jobs</Text>
      </Content>
    </Layout>
  )
}
