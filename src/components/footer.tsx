import { useColorModeValue, Code, VStack, Text } from '@chakra-ui/react'

import { getYear, getDayNamePeriod } from '@utils'

const NODE_ENV = process.env.NODE_ENV
const API_URL = process.env.NEXT_PUBLIC_API_URL

export default function Footer() {
  const year = getYear()
  const dayNamePeriod = getDayNamePeriod()

  return (
    <VStack
      as="footer"
      mt={20}
      p={5}
      color={useColorModeValue('gray.600', 'gray.100')}
      textAlign="center"
    >
      <Text>Copyright © {year} Catamyst. All rights reserved.</Text>
      <VStack opacity={0.5} fontSize={15} spacing={0}>
        <Text>Enjoy your {dayNamePeriod}!</Text>
      </VStack>
      {NODE_ENV !== 'production' && (
        <Code colorScheme="gray" fontWeight="bold">
          {NODE_ENV} && {API_URL}
        </Code>
      )}
    </VStack>
  )
}
