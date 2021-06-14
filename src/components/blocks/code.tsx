import React from 'react'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const dataCode = {
  type: 'code',
  code: `alert("Hello world");\n\nfunction hello() {}`,
  language: 'javascript',
  highlight: [0, 2],
}

export function BlockCode({ block }) {
  return (
    <div>
      <pre>{JSON.stringify(block.code, null, 2)}</pre>
    </div>
  )
}
