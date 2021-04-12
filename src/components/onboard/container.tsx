import {
  Flex,
  Avatar,
  Box,
  ButtonGroup,
  Heading,
  HStack,
  Link,
  SimpleGrid,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react'

export function OnboardContainer({ children }) {
  return (
    <VStack px={5}>
      <Stack width={{ base: 360, sm: 425 }} mt={10} spacing={10}>
        {children}
      </Stack>
    </VStack>
  )
}
