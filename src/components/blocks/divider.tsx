import { Box, Stack, Divider } from '@chakra-ui/react'

export function BlockDivider() {
  return (
    <Box maxW={760} width="100%" px={5}>
      <Stack pt={5}>
        <Divider opacity={1} />
      </Stack>
    </Box>
  )
}
