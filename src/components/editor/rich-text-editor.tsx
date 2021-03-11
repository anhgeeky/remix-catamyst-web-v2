import { Box } from '@chakra-ui/react'
import { EditorSlate } from '@components'

export function RichTextEditor({ htmlString }) {
  return (
    <Box>
      <EditorSlate htmlString={htmlString} />
    </Box>
  )
}
