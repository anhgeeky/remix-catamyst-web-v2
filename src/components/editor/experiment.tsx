import { RichTextEditor } from '@components/editor'

import { dataLessons } from '@data'

/**
 * Only to test Slate in /editor page.
 */
export function EditorExperiment() {
  // TODO
  // @ts-ignore
  const htmlString = dataLessons[0].blocks[1].html

  const handleSave = (processedData) => {
    console.info('>>> Handle save for debugging.')
    console.log(processedData)
  }

  if (!htmlString) {
    return null
  }
  return <RichTextEditor handleSave={handleSave} htmlString={htmlString} />
}
