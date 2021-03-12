import { Box, ButtonGroup, Button } from '@chakra-ui/react'
import { ColorModeToggle, EditorSlate } from '@components'

export function RichTextEditor({ handleSave, htmlString }) {
  return (
    <Box textAlign="left" maxW="720px" width="100%">
      <Box>
        <EditorSlate handleSave={handleSave} />
      </Box>
    </Box>
  )
}
