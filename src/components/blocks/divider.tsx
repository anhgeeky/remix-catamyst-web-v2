import { Box, Stack, Divider } from '@chakra-ui/react'
import dataTheme from '@theme/theme.json'

export function BlockDivider() {
  return (
    <Box maxW={dataTheme.maxContentWidth} width="100%" px={5}>
      <Stack pt={5}>
        <Divider opacity={1} />
      </Stack>
    </Box>
  )
}
