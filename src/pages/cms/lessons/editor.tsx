import NextHead from 'next/head'
import { Flex } from '@chakra-ui/react'

import { RichTextEditor } from '@components/editor'

export default function editorPage({ handleSave, htmlString }) {
  return (
    <Flex justify="center" p={5}>
      <NextHead>
        <title>Editor Catamyst</title>
      </NextHead>
      <RichTextEditor handleSave={handleSave} htmlString={htmlString} />
    </Flex>
  )
}
