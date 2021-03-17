import { Box, Flex } from '@chakra-ui/react'

export function EditorHero({ children }) {
  return (
    <Flex pb={5} justify="center">
      <Box px={5} width="1200px">
        {children}
      </Box>
    </Flex>
  )
}
