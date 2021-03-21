import { Heading, Text } from '@chakra-ui/react'

import { Layout } from '@layouts'
import { Hero, Content } from '@components'

export default function jobsPage() {
  return (
    <Layout title="Search and post jobs on Catamyst">
      <Hero>
        <Heading as="h1" size="xl">
          Job Portal
        </Heading>
        <Text>
          Search and apply your next opportunities. Or even post job vacancies.
        </Text>
      </Hero>

      <Content>
        <Text>Job portal is coming soon!</Text>
      </Content>
    </Layout>
  )
}
