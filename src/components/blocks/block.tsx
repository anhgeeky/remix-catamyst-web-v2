import {
  BlockCode,
  BlockDivider,
  BlockImage,
  BlockLinks,
  BlockQuote,
  BlockTexts,
} from '@components/blocks'

/**
 * Regular block to be displayed on readable lesson
 */
export function Block({ block }) {
  if (block.type === 'Divider') {
    return <BlockDivider />
  }
  if (block.type === 'Image' && block.url) {
    // Need image URL
    return <BlockImage block={block} />
  }
  if (block.type === 'Texts' && block.html) {
    // Need HTML data
    return <BlockTexts block={block} />
  }
  if (block.type === 'Links' && block.links) {
    // Need array of links
    return <BlockLinks block={block} />
  }
  if (block.type === 'Code') {
    return <BlockCode block={block} />
  }
  if (block.type === 'Quote') {
    return <BlockQuote block={block} />
  }
  return null
}
