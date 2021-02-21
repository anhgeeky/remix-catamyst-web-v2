import { useColorModeValue, Code, VStack, Text, Box } from '@chakra-ui/react'

export default function Footer() {
  const date = new Date()
  const year = date.getFullYear()
  const bg = useColorModeValue('gray.100', 'gray.800')
  const color = useColorModeValue('gray.600', 'gray.100')

  const NODE_ENV = process.env.NODE_ENV
  const API_URL = process.env.NEXT_PUBLIC_API_URL

  return (
    <VStack as="footer" mt={20} p={5} bg={bg} color={color} textAlign="center">
      <Text>
        Copyright © {year} <b>Catamyst</b>
      </Text>
      <VStack opacity={0.5} fontSize={12} spacing={0}>
        <Text>A Worldwide Remote Company</Text>
        <Text>Catamyst OÜ (Reg. No. 12345678)</Text>
      </VStack>
      {NODE_ENV !== 'production' && (
        <Code colorScheme="gray" fontWeight="bold">
          {NODE_ENV} && {API_URL}
        </Code>
      )}
    </VStack>
  )
}
