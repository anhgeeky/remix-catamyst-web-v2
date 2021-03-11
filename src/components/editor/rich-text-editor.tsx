import { Box } from '@chakra-ui/react'
import { ColorModeToggle, EditorSlate } from '@components'

export function RichTextEditor({ htmlString }) {
  return (
    <Box textAlign="left" maxW="720px" width="100%">
      <ColorModeToggle />
      <EditorSlate htmlString={htmlString} />
    </Box>
  )
}
