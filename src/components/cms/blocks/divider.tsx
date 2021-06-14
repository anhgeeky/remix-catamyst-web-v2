import { Divider } from '@chakra-ui/react'

import { CardArea } from '@/components/'
import { CMSBlockModifierButtons } from '@/components/cms/blocks'

export function CMSBlockDivider(props) {
  return (
    <CardArea>
      <CMSBlockModifierButtons {...props} />
      <Divider opacity={1} my={1} />
    </CardArea>
  )
}
