import { Box, Flex, useColorModeValue } from '@chakra-ui/react'

export default function Hero({ color = 'cyan', children }) {
  const textColor = useColorModeValue(`${color}.900`, `${color}.100`)
  const bg = useColorModeValue(`${color}.100`, `${color}.900`)

  return (
    <Flex py={10} color={textColor} bg={bg} justify="center">
      <Box px={{ base: 2, sm: 4 }} width="1200px">
        {children}
      </Box>
    </Flex>
  )
}
