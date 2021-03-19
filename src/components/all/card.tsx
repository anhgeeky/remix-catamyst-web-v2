import { Box, useColorModeValue } from '@chakra-ui/react'

export function Card(props) {
  return (
    <Box
      p={5}
      rounded="md"
      boxShadow="base"
      bg={useColorModeValue('white', 'gray.800')}
      height="100%"
      {...props}
    >
      {props.children}
    </Box>
  )
}
