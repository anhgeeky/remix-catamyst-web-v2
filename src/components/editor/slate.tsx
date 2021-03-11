import React, { useEffect, useMemo, useState } from 'react'
// Import the Slate editor factory
import { createEditor } from 'slate'
// Import the Slate components and React plugin
import { Slate, Editable, withReact } from 'slate-react'

export function EditorSlate({ htmlString }) {
  const editor = useMemo(() => withReact(createEditor()), [])

  const [value, setValue] = useState([
    {
      type: 'paragraph',
      children: [{ text: 'Type something here.' }],
    },
  ])

  const handleChange = (newValue) => {
    setValue(newValue)
  }

  const handleKeyDown = (event) => {
    if (event.key === '&') {
      event.preventDefault()
      editor.insertText('and')
    }
  }

  return (
    <Slate editor={editor} value={value} onChange={handleChange}>
      <Editable onKeyDown={handleKeyDown} />
    </Slate>
  )
}
