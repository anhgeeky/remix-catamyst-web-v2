import { Box, useColorModeValue } from '@chakra-ui/react'

export default function Card({ children }) {
  const bg = useColorModeValue('white', 'gray.800')
  return (
    <Box rounded="md" boxShadow="base" bg={bg} p={5}>
      {children}
    </Box>
  )
}
