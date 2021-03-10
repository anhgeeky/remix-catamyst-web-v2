import { Stack, useColorMode } from '@chakra-ui/react'
import { LightAsync as SyntaxHighlighter } from 'react-syntax-highlighter'
import {
  solarizedLight as lightStyle,
  solarizedDark as darkStyle,
} from 'react-syntax-highlighter/dist/cjs/styles/hljs'

import { Content, HeadingStack } from '@components'

export default function CMSViewJSON({ name, codeString }) {
  const { colorMode } = useColorMode()

  return (
    <Content>
      <Stack spacing={5} width="100%">
        <HeadingStack>{name}:</HeadingStack>
        <SyntaxHighlighter
          language="json"
          style={colorMode === 'light' ? lightStyle : darkStyle}
          wrapLines
          wrapLongLines
          showLineNumbers
          showInlineLineNumbers
        >
          {JSON.stringify(codeString, null, 2)}
        </SyntaxHighlighter>
      </Stack>
    </Content>
  )
}
