import BlockReferences from './blocks/block-references'
import BlockImage from './blocks/block-image'
import BlockTexts from './blocks/block-texts'

export default function LessonBlock({ block }) {
  if (block.component === 'image' && block.src) {
    return <BlockImage block={block} />
  }
  if (block.component === 'texts' && block.html) {
    return <BlockTexts block={block} />
  }
  if (block.component === 'references' && block.items) {
    return <BlockReferences block={block} />
  }
  return null
}
