import { Flex, VStack, Heading, Box } from '@chakra-ui/react'

export default function PreviewDashboard() {
  return (
    <Flex justify="center">
      <VStack>
        <Heading as="h2" mb={5}>
          Your dashboard at a glance
        </Heading>
        <Flex boxShadow="base" borderRadius={5} p={2}>
          <Box
            data-id="placeholder-image"
            bg="black"
            height="250px"
            width="250px"
            maxW="1000px"
          />
        </Flex>
      </VStack>
    </Flex>
  )
}
