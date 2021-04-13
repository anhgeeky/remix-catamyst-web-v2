import { Heading, Text } from '@chakra-ui/react'

import { Layout } from '@layouts'
import { Hero, Content } from '@components'
import { HelpFaqs } from '@components/help'

export default function helpPage() {
  return (
    <Layout title="Help Center and Frequently Asked Questions (FAQ) · Catamyst">
      <Hero>
        <Heading as="h1" size="xl">
          Help Center
        </Heading>
        <Text>
          Support and helpful information such as frequently asked questions
          (FAQ) for both learners and employers.
        </Text>
      </Hero>

      <Content>
        <HelpFaqs />
      </Content>
    </Layout>
  )
}
