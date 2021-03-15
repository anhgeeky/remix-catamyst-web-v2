import { Layout } from '@layouts'
import { HomeHero, HomeScreens } from '@components/home'

export default function homePage() {
  return (
    <Layout title="Catamyst · All-in-one platform to learn software development">
      <HomeHero />
      <HomeScreens />
    </Layout>
  )
}
