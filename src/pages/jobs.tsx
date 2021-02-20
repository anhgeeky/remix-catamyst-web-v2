import { Heading, Text } from '@chakra-ui/react'
import { LayoutDefault } from '@/layouts'

export default function Jobs() {
  return (
    <LayoutDefault title="Search and post jobs on Catamyst">
      <Heading as="h1" size="xl">
        Jobs
      </Heading>
      <Text>Search your next opportunities and post job vacancies.</Text>
    </LayoutDefault>
  )
}
