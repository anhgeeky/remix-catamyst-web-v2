import { Heading, Text } from '@chakra-ui/react'

import { Layout } from '@layouts'
import { Hero, Content } from '@components'
import { JobsBoards } from '@components/jobs'

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
        <JobsBoards />
      </Content>
    </Layout>
  )
}
