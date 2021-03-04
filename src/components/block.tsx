import BlockImage from './blocks/block-image'
import BlockTexts from './blocks/block-texts'
import BlockLinks from './blocks/block-links'
import BlockDivider from './blocks/block-divider'
import BlockReferences from './blocks/block-references'

export default function Block({ block }) {
  if (block.component === 'image' && block.src) {
    return <BlockImage block={block} />
  }
  if (block.component === 'texts' && block.html) {
    return <BlockTexts block={block} />
  }
  if (block.component === 'links' && block.items) {
    return <BlockLinks block={block} />
  }
  if (block.component === 'divider') {
    return <BlockDivider />
  }
  if (block.component === 'references' && block.items) {
    return <BlockReferences block={block} />
  }
  return null
}
