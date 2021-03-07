import { Box, Flex, useColorModeValue } from '@chakra-ui/react'

export default function CMSHero({ children }) {
  return (
    <Flex
      pb={5}
      color={useColorModeValue(`red.500`, `red.200`)}
      justify="center"
    >
      <Box px={5} width="1200px">
        {children}
      </Box>
    </Flex>
  )
}
