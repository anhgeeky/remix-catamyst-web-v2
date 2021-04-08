import { Box, Flex, VStack, useColorModeValue } from '@chakra-ui/react'

export function JobHero({
  theme = {
    textColor: useColorModeValue('black', 'white'),
    backgroundColor: useColorModeValue('gray.100', 'gray.800'),
  },
  children,
}) {
  return (
    <Flex
      py={5}
      color={theme.textColor}
      bg={theme.backgroundColor}
      justify="center"
    >
      <Box px={5} width="1200px">
        <VStack>{children}</VStack>
      </Box>
    </Flex>
  )
}
