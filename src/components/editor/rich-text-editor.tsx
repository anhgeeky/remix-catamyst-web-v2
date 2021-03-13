import { Box } from '@chakra-ui/react'
import dynamic from 'next/dynamic'

const DynamicEditorSlate = dynamic(() => import('@components/editor/slate'), {
  ssr: false,
})
import {
  serializeSlateToHTML,
  deserializeHTMLtoSlate,
} from '@components/editor/serializer'

export function RichTextEditor({ handleSave, htmlString }) {
  /**
   * Deserialize from HTMl to SlateElements
   */
  const html = htmlString
  const document = new DOMParser().parseFromString(html, 'text/html')
  const slateElements = deserializeHTMLtoSlate(document.body)

  return (
    <Box textAlign="left" maxW="720px" width="100%">
      <Box>
        <DynamicEditorSlate
          slateElements={slateElements}
          handleSave={handleSave}
        />
      </Box>
    </Box>
  )
}
