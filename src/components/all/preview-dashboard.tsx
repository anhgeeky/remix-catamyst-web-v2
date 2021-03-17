import { Flex, VStack, Heading, Box } from '@chakra-ui/react'

export function PreviewDashboard() {
  return (
    <Flex justify="center">
      <VStack>
        <Heading as="h2" mb={5}>
          Your dashboard at a glance
        </Heading>
      </VStack>
    </Flex>
  )
}
