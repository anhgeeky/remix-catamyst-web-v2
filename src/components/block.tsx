import React from 'react'
import { Box } from '@chakra-ui/react'

import {
  BlockImage,
  BlockTexts,
  BlockLinks,
  BlockDivider,
} from '@components/blocks'
import dataTheme from '@theme/theme.json'

function Wrapper({ children, isPadded = false }) {
  return (
    <Box maxW={dataTheme.maxContentWidth} width="100%" px={isPadded && 5}>
      {children}
    </Box>
  )
}

/**
 * Notice that not every blocks are required to have a padding
 */
export default function Block({ block }) {
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

  return null
}
