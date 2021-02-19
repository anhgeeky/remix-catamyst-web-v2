import { VStack } from '@chakra-ui/react'
import { LayoutDefault } from '@/layouts'
import { HeroHome, PreviewDashboard } from '@/components'

export default function Home() {
  return (
    <LayoutDefault title="Catamyst">
      <VStack spacing={20}>
        <HeroHome />
        <PreviewDashboard />
      </VStack>
    </LayoutDefault>
  )
}
