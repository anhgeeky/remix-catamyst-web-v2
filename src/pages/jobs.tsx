import { Stack, Heading, Text } from '@chakra-ui/react'

import { Layout } from '@layouts'
import { Hero, Content, HeadingStack } from '@components'
import { JobsBoards, JobsToolbar } from '@components/jobs'

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
        <Stack>
          <JobsToolbar />
          <HeadingStack>Featured Jobs</HeadingStack>
          <JobsBoards />
        </Stack>
      </Content>
    </Layout>
  )
}
