import { VStack } from '@chakra-ui/react'
import { LayoutDefault } from '@/layouts'
import { HeroHome, PreviewDashboard } from '@/components'

export default function Home() {
  return (
    <LayoutDefault title="Catamyst · All-in-one platform to learn software development">
      <VStack spacing={20}>
        <HeroHome />
        <PreviewDashboard />
      </VStack>
    </LayoutDefault>
  )
}
