import { Switch, Box, Button } from '@chakra-ui/react'

import { CardArea, Icon } from '@components'
import { BlockTexts } from '@components/blocks'
import { CMSBlockModifierButtons } from '@components/cms/blocks'

export function CMSBlockTexts({ block }) {
  return (
    <CardArea>
      <CMSBlockModifierButtons name="Texts">
        <Switch size="sm" name="isPublished" value={block.isPublished} />
        <Button size="xs" leftIcon={<Icon name="edit" />}>
          Edit Texts
        </Button>
      </CMSBlockModifierButtons>
      <BlockTexts block={block} />
    </CardArea>
  )
}
