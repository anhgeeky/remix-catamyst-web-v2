import { useState } from 'react'

import { RichTextEditor } from '@/components/editor'
import { dataLessons } from '@/data'

/**
 * Experiment only to test Slate in /editor page.
 * Similar with @/components/cms/blocks/texts
 */
export function EditorExperiment() {
  // @ts-ignore
  const htmlStringSample = dataLessons[0].blocks[1].html
  const [htmlString, setHtmlString] = useState(htmlStringSample)

  if (!htmlStringSample) {
    return null
  }
  return (
    <RichTextEditor htmlString={htmlString} setHtmlString={setHtmlString} />
  )
}
