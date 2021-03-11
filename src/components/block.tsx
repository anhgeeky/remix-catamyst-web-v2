import {
  BlockCode,
  BlockDivider,
  BlockImage,
  BlockLinks,
  BlockQuote,
  BlockTexts,
} from '@components/blocks'

export default function Block({ block }) {
  if (block.component === 'code') {
    return <BlockCode block={block} />
  }
  if (block.component === 'divider') {
    return <BlockDivider />
  }
  if (block.component === 'image' && block.url) {
    // Need image URL
    return <BlockImage block={block} />
  }
  if (block.component === 'links' && block.links) {
    // Need array of links
    return <BlockLinks block={block} />
  }
  if (block.component === 'code') {
    return <BlockQuote block={block} />
  }
  if (block.component === 'texts' && block.html) {
    // Need HTML data
    return <BlockTexts block={block} />
  }
  return null
}
