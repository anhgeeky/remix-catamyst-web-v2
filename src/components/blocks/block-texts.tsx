import { Box } from '@chakra-ui/react'
import ReactHtmlParser from 'react-html-parser'
import transform from './tranform'

export default function BlockTexts({ block }) {
  return (
    <Box maxW="720px" px={5}>
      {ReactHtmlParser(block.html, { transform })}
    </Box>
  )
}
