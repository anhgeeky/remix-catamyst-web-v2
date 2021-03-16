import { VStack } from '@chakra-ui/react'

import { Layout } from '@layouts'
import { HomeHero, HomeScreens, HomeFeatures } from '@components/home'

export default function homePage() {
  return (
    <Layout title="Catamyst · All-in-one platform to learn software development">
      <VStack spacing={100}>
        <HomeHero />
        <HomeScreens />
        <HomeFeatures />
      </VStack>
    </Layout>
  )
}
