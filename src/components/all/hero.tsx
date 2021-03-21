import { Box, Flex, useColorModeValue } from '@chakra-ui/react'

export function Hero(props) {
  const color = props.color || 'cyan'
  const textColor = useColorModeValue(`${color}.900`, `${color}.100`)
  const bg = useColorModeValue(`${color}.100`, `${color}.900`)

  return (
    <Flex py={10} color={textColor} bg={bg} justify="center">
      <Box px={5} width="1200px" {...props}>
        {props.children}
      </Box>
    </Flex>
  )
}
