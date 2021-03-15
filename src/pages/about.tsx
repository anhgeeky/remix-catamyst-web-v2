import { Heading, Text } from '@chakra-ui/react'

import { Layout } from '@layouts'
import { Hero, Content } from '@components'
import { AboutHero } from '@components/about'

export default function aboutPage() {
  return (
    <Layout title="About Catamyst">
      <AboutHero />
    </Layout>
  )
}
