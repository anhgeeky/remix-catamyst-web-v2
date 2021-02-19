import NextImage from 'next/image'
import { Flex, VStack, Heading, Box } from '@chakra-ui/react'

export default function PreviewDashboard() {
  return (
    <Flex justify="center">
      <VStack>
        <Heading as="h2" mb={5}>
          Your dashboard at a glance
        </Heading>
        <Flex boxShadow="base" borderRadius={5} p={5}>
          <Box bg="gray.500" height="300px" width="300px" maxW="1000px" />
        </Flex>
      </VStack>
    </Flex>
  )
}
