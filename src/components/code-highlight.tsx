import { useColorMode } from '@chakra-ui/react'
import { LightAsync as SyntaxHighlighter } from 'react-syntax-highlighter'
import {
  solarizedLight as lightStyle,
  solarizedDark as darkStyle,
} from 'react-syntax-highlighter/dist/cjs/styles/hljs'

export function CodeHighlight({ language = 'json', children }) {
  const { colorMode } = useColorMode()

  return (
    <SyntaxHighlighter
      language={language}
      style={colorMode === 'light' ? lightStyle : darkStyle}
      wrapLines
      wrapLongLines
      showLineNumbers
      showInlineLineNumbers
    >
      {JSON.stringify(children, null, 2)}
    </SyntaxHighlighter>
  )
}
