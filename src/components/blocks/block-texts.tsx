import { Box } from '@chakra-ui/react'
import ReactHtmlParser from 'react-html-parser'

import theme from '@/theme/theme.json'
import options from '@/components/blocks/options'

export default function BlockTexts({ block }) {
  return (
    <Box maxW={theme.maxContentWidth} width="100%" px={5}>
      {ReactHtmlParser(block.html, options)}
    </Box>
  )
}
