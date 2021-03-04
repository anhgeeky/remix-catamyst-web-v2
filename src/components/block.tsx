import React from 'react'
import { Box } from '@chakra-ui/react'

import BlockImage from '@/components/blocks/block-image'
import BlockTexts from '@/components/blocks/block-texts'
import BlockLinks from '@/components/blocks/block-links'
import BlockDivider from '@/components/blocks/block-divider'
import BlockReferences from '@/components/blocks/block-references'
import BlockParagraph from '@/components/blocks/block-paragraph'
import theme from '@/theme/theme.json'

/**
 * Notice that not every blocks are required to have a padding
 */

export default function Block({ block }) {
  if (block.component === 'texts' && block.html) {
    return (
      <Box maxW={theme.maxContentWidth} width="100%" px={5}>
        <BlockTexts block={block} />
      </Box>
    )
  }
  if (block.component === 'divider') {
    return (
      <Box maxW={theme.maxContentWidth} width="100%" px={5}>
        <BlockDivider />
      </Box>
    )
  }
  if (block.component === 'image' && block.src) {
    return <BlockImage block={block} />
  }
  if (block.component === 'links' && block.items) {
    return (
      <Box maxW={theme.maxContentWidth} width="100%">
        <BlockLinks block={block} />
      </Box>
    )
  }
  if (block.component === 'references' && block.items) {
    return (
      <Box maxW={theme.maxContentWidth} width="100%">
        <BlockReferences block={block} />
      </Box>
    )
  }
  if (block.component === 'paragraph' && block.html) {
    return (
      <Box maxW={theme.maxContentWidth} width="100%" px={5}>
        <BlockParagraph block={block} />
      </Box>
    )
  }
  return null
}
