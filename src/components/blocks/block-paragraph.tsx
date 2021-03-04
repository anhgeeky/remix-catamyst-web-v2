import ReactHtmlParser from 'react-html-parser'
import { Text } from '@chakra-ui/react'

export default function BlockParagraph({ block }) {
  return <Text fontSize={['md', 'lg']}>{ReactHtmlParser(block.html)}</Text>
}
