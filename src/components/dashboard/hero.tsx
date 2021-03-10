import { Box, Flex, useColorModeValue } from '@chakra-ui/react'

export default function DashboardHero({ children }) {
  return (
    <Flex
      pb={5}
      color={useColorModeValue(`blue.500`, `blue.200`)}
      justify="center"
    >
      <Box px={5} width="1200px">
        {children}
      </Box>
    </Flex>
  )
}