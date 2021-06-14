import NextHead from 'next/head'
import { Flex } from '@chakra-ui/react'

import { EditorExperiment } from '@/components/editor'

export default function editorPage() {
  return (
    <Flex justify="center">
      <NextHead>
        <title>Editor Catamyst</title>
      </NextHead>
      <EditorExperiment />
    </Flex>
  )
}
