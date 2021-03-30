import { Box, Flex, useColorModeValue } from '@chakra-ui/react'

export function SettingsHero({ children }) {
  return (
    <Flex
      pb={5}
      justify="center"
      // color={useColorModeValue(`blue.500`, `blue.200`)}
    >
      <Box px={5} width="1200px">
        {children}
      </Box>
    </Flex>
  )
}
