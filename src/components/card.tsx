import { Box, useColorModeValue } from '@chakra-ui/react'

export default function Card(props) {
  return (
    <Box
      boxShadow="base"
      p={5}
      rounded="md"
      bg={useColorModeValue('white', 'gray.800')}
      {...props}
    >
      {props.children}
    </Box>
  )
}
