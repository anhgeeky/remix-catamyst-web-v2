import { Container, Stack } from '@chakra-ui/react'

export function ContentWithSidebar({ children }) {
  return (
    <Container maxW="1200px" pt={5}>
      <Stack
        spacing={5}
        direction={{ base: 'column', lg: 'row' }}
        align="flex-start"
      >
        {children}
      </Stack>
    </Container>
  )
}
