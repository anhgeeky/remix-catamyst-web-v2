import { useColorModeValue, Flex, Text } from '@chakra-ui/react'

export default function Footer() {
  const date = new Date()
  const year = date.getFullYear()
  const bg = useColorModeValue('teal.100', 'teal.900')
  const color = useColorModeValue('teal.600', 'teal.100')

  return (
    <Flex
      as="footer"
      justify="center"
      mt={10}
      py={10}
      px={5}
      bg={bg}
      color={color}
    >
      <Text fontSize={12}>
        Copyright © {year} Catamyst. All rights reserved.
      </Text>
    </Flex>
  )
}
