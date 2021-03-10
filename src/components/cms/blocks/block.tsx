import {
  CMSBlockImage,
  CMSBlockTexts,
  CMSBlockLinks,
} from '@components/cms/blocks'

/**
 * CMS Block to choose which block to be displayed for CMS lesson blocks editor
 */
export function CMSBlock({ block }) {
  if (block.component === 'image' && block.url) {
    return <CMSBlockImage block={block} />
  }
  if (block.component === 'texts' && block.html) {
    return <CMSBlockTexts block={block} />
  }
  if (block.component === 'links' && block.links) {
    return <CMSBlockLinks links={block.links} />
  }
  return null
}
