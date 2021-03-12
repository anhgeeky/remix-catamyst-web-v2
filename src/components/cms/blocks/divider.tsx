import { Box, Divider } from '@chakra-ui/react'

import { CMSBlockModifierButtons } from '@components/cms/blocks'

export function CMSBlockDivider(props) {
  return (
    <Box maxW={800} width="100%">
      <CMSBlockModifierButtons name="Divider" {...props} />
      <Divider opacity={1} my={1} />
    </Box>
  )
}
