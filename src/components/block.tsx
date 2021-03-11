import React from 'react'
import { Box } from '@chakra-ui/react'

import BlockTexts from '@components/blocks/block-texts'
import BlockLinks from '@components/blocks/block-links'
import BlockDivider from '@components/blocks/block-divider'
import BlockReferences from '@components/blocks/block-references'
import BlockParagraph from '@components/blocks/block-paragraph'
import BlockHeading from '@components/blocks/block-heading'
import { BlockImage } from '@components/blocks'
import dataTheme from '@theme/theme.json'

/**
 * Notice that not every blocks are required to have a padding
 */

export default function Block({ block }) {
  /**
   * Old block component system
   */
  if (block.component === 'texts' && block.html) {
    return (
      <Wrapper isPadded>
        <BlockTexts block={block} />
      </Wrapper>
    )
  }
  if (block.component === 'divider') {
    return (
      <Wrapper isPadded>
        <BlockDivider />
      </Wrapper>
    )
  }
  if (block.component === 'links' && block.links) {
    return (
      <Wrapper>
        <BlockLinks block={block} />
      </Wrapper>
    )
  }
  if (block.component === 'image' && block.url) {
    return <BlockImage block={block} />
  }

  /**
   * New block component system
   */
  if (block.component === 'heading' && block.html) {
    return (
      <Wrapper isPadded>
        <BlockHeading block={block} as={block.as} />
      </Wrapper>
    )
  }
  if (block.component === 'paragraph' && block.html) {
    return (
      <Wrapper isPadded>
        <BlockParagraph block={block} />
      </Wrapper>
    )
  }
  if (block.html) {
    return (
      <Wrapper isPadded>
        <BlockParagraph block={block} />
      </Wrapper>
    )
  }

  return null
}

function Wrapper({ children, isPadded = false }) {
  return (
    <Box maxW={dataTheme.maxContentWidth} width="100%" px={isPadded && 5}>
      {children}
    </Box>
  )
}
