import dynamic from 'next/dynamic'
import { Box } from '@chakra-ui/react'

const DynamicEditorSlate = dynamic(() => import('@components/editor/slate'), {
  ssr: false,
})

import {
  serializeSlateToHTML,
  deserializeHTMLtoSlate,
} from '@components/editor/serializer'

/**
 * Only to load Slate without SSR.
 */
export function RichTextEditor({ htmlString, setHtmlString }) {
  /**
   * Deserialize from HTMl to SlateElements.
   * Need to differentiate the html object to avoid clash with upper state.
   */
  const document = new DOMParser().parseFromString(htmlString, 'text/html')
  const slateElements = deserializeHTMLtoSlate(document.body)

  /**
   * Change value for parent component on changes in Slate editor.
   */
  const handleChange = (slateValue) => {
    const newHtmlString = serializeSlateToHTML(slateValue)
    setHtmlString(newHtmlString)
    // console.log(newHtmlString)
  }

  return (
    <Box textAlign="left" maxW="720px" width="100%" pb="100px">
      <Box>
        {slateElements && (
          <DynamicEditorSlate
            slateElements={slateElements}
            handleChange={handleChange}
          />
        )}
      </Box>
    </Box>
  )
}
