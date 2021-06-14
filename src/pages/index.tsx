import { VStack } from '@chakra-ui/react'

import { Layout } from '@layouts'
import {
  HomeHero,
  HomeScreens,
  HomeFeatures,
  HomeReviews,
  HomeVillain,
} from '@components/home'

export const HomePage = (): JSX.Element => {
  return (
    <Layout title="Catamyst · All-in-one platform to learn software development">
      <VStack spacing={{ base: 25, sm: 50, md: 100 }}>
        <HomeHero />
        <HomeScreens />
        <HomeFeatures />
        <HomeReviews />
        <HomeVillain />
      </VStack>
    </Layout>
  )
}

export default HomePage
