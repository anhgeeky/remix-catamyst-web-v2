import { useColorModeValue, Code, VStack, Text, Box } from '@chakra-ui/react'

export default function Footer() {
  const date = new Date()
  const year = date.getFullYear()
  const color = useColorModeValue('gray.600', 'gray.100')

  const NODE_ENV = process.env.NODE_ENV
  const API_URL = process.env.NEXT_PUBLIC_API_URL

  return (
    <VStack as="footer" mt={20} p={5} color={color} textAlign="center">
      <Text>
        Copyright © {year} <b>Catamyst</b>
      </Text>
      <VStack opacity={0.5} fontSize={12} spacing={0}>
        <Text>A Worldwide Remote Company</Text>
      </VStack>
      {NODE_ENV !== 'production' && (
        <Code colorScheme="gray" fontWeight="bold">
          {NODE_ENV} && {API_URL}
        </Code>
      )}
    </VStack>
  )
}
