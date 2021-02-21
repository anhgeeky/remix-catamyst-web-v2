import { Box, Flex, useColorModeValue } from '@chakra-ui/react'

export default function Hero({ children }) {
  const color = useColorModeValue('cyan.900', 'cyan.100')
  const bg = useColorModeValue('cyan.100', 'cyan.900')

  return (
    <Flex py={10} color={color} bg={bg} justify="center">
      <Box px={5} width="1200px">
        {children}
      </Box>
    </Flex>
  )
}
