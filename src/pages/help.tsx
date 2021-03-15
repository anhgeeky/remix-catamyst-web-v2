import { Heading, Text } from '@chakra-ui/react'

import { Layout } from '@layouts'
import { Hero, Content } from '@components'
import { HelpFaqs } from '@components/help/faqs'

export default function helpPage() {
  return (
    <Layout title="Help Center · Catamyst">
      <Hero>
        <Heading as="h1" size="xl">
          Help Center
        </Heading>
        <Text>Support and other helpful information.</Text>
      </Hero>

      <Content>
        <HelpFaqs />
      </Content>
    </Layout>
  )
}
