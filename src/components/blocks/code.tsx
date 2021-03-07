import React from 'react'

const dataCode = {
  code: 'console.log("Hello world");\n\nfunction hello() {}',
  type: 'code',
  language: 'javascript',
  highlight: [0, 2],
}

export default function Code() {
  return (
    <div>
      <pre></pre>Code
    </div>
  )
}
