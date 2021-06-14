import dataBlocks from '@/data/blocks'

export function initBlock(type) {
  switch (type) {
    case 'Texts':
      return dataBlocks.TEXTS
    case 'Image':
      return dataBlocks.IMAGE
    case 'Divider':
      return dataBlocks.DIVIDER
    case 'Links':
      return dataBlocks.LINKS
    case 'Quote':
      return dataBlocks.QUOTE
    case 'Code':
      return dataBlocks.CODE
    default:
      return dataBlocks.TEXTS
  }
}
