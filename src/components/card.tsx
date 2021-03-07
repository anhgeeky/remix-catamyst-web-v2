import { Box, useColorModeValue } from '@chakra-ui/react'

export default function Card(props) {
  return (
    <Box
      rounded="md"
      boxShadow="base"
      p={5}
      bg={useColorModeValue('white', 'gray.800')}
      {...props}
    >
      {props.children}
    </Box>
  )
}
