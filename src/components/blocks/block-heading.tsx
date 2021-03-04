import ReactHtmlParser from 'react-html-parser'
import { Heading } from '@chakra-ui/react'

export default function BlockHeading({ block, as }) {
  if (as === 'h1') {
    return (
      <Heading as="h1" fontFamily="body" size="xl" pt={6}>
        {ReactHtmlParser(block.html)}
      </Heading>
    )
  }
  if (as === 'h2') {
    return (
      <Heading as={as} fontFamily="body" size="lg" pt={4}>
        {ReactHtmlParser(block.html)}
      </Heading>
    )
  }
  if (as === 'h3') {
    return (
      <Heading as={as} fontFamily="body" size="md" pt={2}>
        {ReactHtmlParser(block.html)}
      </Heading>
    )
  }
  return null
}
