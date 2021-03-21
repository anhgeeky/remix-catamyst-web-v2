import { Box, Flex, useColorModeValue } from '@chakra-ui/react'

export function JobHero({ theme, children }) {
  const { textColor, backgroundColor } = theme

  return (
    <Flex py={5} color={textColor} bg={backgroundColor} justify="center">
      <Box px={5} width="1200px">
        {children}
      </Box>
    </Flex>
  )
}
