import { Box, useColorModeValue } from '@chakra-ui/react'

export default function Card(props) {
  return (
    <Box
      p={5}
      rounded="md"
      boxShadow="base"
      bg={useColorModeValue('white', 'gray.800')}
      {...props}
    >
      {props.children}
    </Box>
  )
}
