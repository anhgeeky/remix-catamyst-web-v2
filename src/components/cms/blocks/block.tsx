import {
  CMSBlockImage,
  CMSBlockTexts,
  CMSBlockLinks,
  CMSBlockDivider,
} from '@components/cms/blocks'

/**
 * CMS Block to choose which block to be displayed for CMS lesson blocks editor
 */
export function CMSBlock({ block, actions }) {
  if (block.type === 'Image' && block.url) {
    return <CMSBlockImage block={block} actions={actions} />
  }
  if (block.type === 'Texts' && block.html) {
    return <CMSBlockTexts block={block} actions={actions} />
  }
  if (block.type === 'Links' && block.links) {
    return <CMSBlockLinks block={block} actions={actions} />
  }
  if (block.type === 'Divider') {
    return <CMSBlockDivider block={block} actions={actions} />
  }
  return null
}
