import { Box, ButtonGroup, Button } from '@chakra-ui/react'
import { ColorModeToggle, EditorSlate } from '@components'

export function RichTextEditor({ htmlString }) {
  const handleSerialize = () => {
    console.log('Serialize')
  }

  const handleDeserialize = () => {
    console.log('Deserialize')
  }

  return (
    <Box textAlign="left" maxW="720px" width="100%">
      <ButtonGroup size="xs" mb={5} variant="ghost">
        <ColorModeToggle />
        <Button onClick={handleSerialize}>Save</Button>
        <Button onClick={handleDeserialize}>Load</Button>
      </ButtonGroup>

      <Box>
        <EditorSlate />
      </Box>
    </Box>
  )
}
