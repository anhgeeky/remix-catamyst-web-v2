import ReactHtmlParser from 'react-html-parser'
import { Box, Text } from '@chakra-ui/react'

import theme from '@/theme/theme.json'

export default function BlockParagraph({ block }) {
  return <Text fontSize={['md', 'lg']}>{ReactHtmlParser(block.html)}</Text>
}
