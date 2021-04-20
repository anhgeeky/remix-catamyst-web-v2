import { Alert } from '@chakra-ui/react'

import { CardArea } from '@components'
import {
  CMSBlockModifierButtons,
  CMSBlockImage,
  CMSBlockTexts,
  CMSBlockLinks,
  CMSBlockDivider,
} from '@components/cms/blocks'

/**
 * CMSBlock to choose which block to be displayed for CMS lesson blocks editor.
 * Each of them also contains CMSBlockModifierButtons.
 * props contains index, block, actions (fieldArrayHelpers).
 */
export function CMSBlock(props) {
  if (props.block.type === 'Divider') {
    return <CMSBlockDivider name="Divider" {...props} />
  }
  if (props.block.type === 'Image' && props.block.url) {
    return <CMSBlockImage name="Image" {...props} />
  }
  if (props.block.type === 'Texts' && props.block.html) {
    return <CMSBlockTexts name="Texts" {...props} />
  }
  if (props.block.type === 'Links' && props.block.links) {
    return <CMSBlockLinks name="Links" {...props} />
  }
  return (
    <CardArea>
      <CMSBlockModifierButtons name={props.block.type} {...props} />
      <Alert status="warning" rounded="md">
        Block {props.block.type} is still in progress.
      </Alert>
    </CardArea>
  )
}
