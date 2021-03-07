import { Box, Flex, useColorModeValue } from '@chakra-ui/react'

export default function Hero({ color = 'cyan', children }) {
  const textColor = useColorModeValue(`${color}.900`, `${color}.100`)

  return (
    <Flex pb={5} color={textColor} justify="center">
      <Box px={5} width="1200px">
        {children}
      </Box>
    </Flex>
  )
}
