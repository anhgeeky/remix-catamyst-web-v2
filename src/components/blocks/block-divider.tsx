import { Stack, Divider } from '@chakra-ui/react'
import theme from '@/theme/theme.json'

export default function BlockDivider() {
  return (
    <Stack maxW={theme.maxContentWidth} width="100%" pt={10}>
      <Divider opacity={1} />
    </Stack>
  )
}
