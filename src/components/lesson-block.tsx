import BlockReferences from './blocks/block-references'
import BlockImage from './blocks/block-image'
import BlockTexts from './blocks/block-texts'

export default function LessonBlock({ block }) {
  if (block.component === 'image') {
    return <BlockImage block={block} />
  }
  if (block.component === 'text') {
    return <BlockTexts block={block} />
  }
  if (block.component === 'references') {
    return <BlockReferences block={block} />
  }
  return null
}
