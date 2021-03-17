import { Box, Flex, useColorModeValue } from '@chakra-ui/react'

export function DashboardHero({ children }) {
  return (
    <Flex
      pb={5}
      justify="center"
      // color={useColorModeValue(`green.500`, `green.200`)}
    >
      <Box px={5} width="1200px">
        {children}
      </Box>
    </Flex>
  )
}
