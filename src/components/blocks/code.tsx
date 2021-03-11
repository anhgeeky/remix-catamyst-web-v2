import React from 'react'

const dataCode = {
  code: 'console.log("Hello world");\n\nfunction hello() {}',
  type: 'code',
  language: 'javascript',
  highlight: [0, 2],
}

export function BlockCode({ block }) {
  return (
    <div>
      <pre>Code</pre>
    </div>
  )
}
