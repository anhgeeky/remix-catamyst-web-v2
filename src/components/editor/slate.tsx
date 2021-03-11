import { ButtonGroup, Button, Link, Text, Code } from '@chakra-ui/react'
import React, { useCallback, useMemo, useState } from 'react'
import { createEditor, Editor, Transforms, Text as SlateText } from 'slate'
import { Slate, Editable, withReact, useSlate } from 'slate-react'

export function EditorSlate({ htmlString }) {
  const editor = useMemo(() => withReact(createEditor()), [])
  const [value, setValue] = useState([
    {
      type: 'paragraph',
      children: [{ text: 'Type something here.' }],
    },
  ])

  const renderElement = useCallback((props) => {
    switch (props.element.type) {
      case 'code':
        return <CodeElement {...props} />
      case 'quote':
        return <QuoteElement {...props} />
      case 'link':
        return <LinkElement {...props} />
      default:
        return <DefaultElement {...props} />
    }
  }, [])

  const renderLeaf = useCallback((props) => {
    return <Leaf {...props} />
  }, [])

  const handleChange = (value) => {
    setValue(value)
    if (window) {
      const content = JSON.stringify(value)
      window.sessionStorage.setItem('editor', content)
    }
  }

  if (value) {
    return (
      <Slate editor={editor} value={value} onChange={handleChange}>
        <EditorToolbar />
        <Editable
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          onKeyDown={(event) => {
            if (!event.ctrlKey) {
              return
            }
            // Replace the `onKeyDown` logic with our new commands.
            switch (event.key) {
              case '`': {
                event.preventDefault()
                CustomEditor.toggleCodeBlock(editor)
                break
              }
              case 'b': {
                event.preventDefault()
                CustomEditor.toggleBoldMark(editor)
                break
              }
            }
          }}
        />
      </Slate>
    )
  }
  return null
}

/**
 * Slate toolbar buttons
 */

const EditorToolbar = () => {
  const editor = useSlate()

  return (
    <ButtonGroup size="sm">
      {/* <Button active={isBoldActive(editor)}>B</Button> */}
      {/* <Button active={isItalicActive(editor)}>I</Button> */}
      <Button onMouseDown={() => CustomEditor.toggleBoldMark(editor)}>
        Bold
      </Button>
      <Button onMouseDown={() => CustomEditor.toggleCodeBlock(editor)}>
        Code
      </Button>
    </ButtonGroup>
  )
}

/**
 * Slate custom helpers
 */

const CustomEditor = {
  isBoldMarkActive(editor) {
    const [match] = Editor.nodes(editor, {
      match: (n) => n.bold === true,
      universal: true,
    })
    return !!match
  },

  isCodeBlockActive(editor) {
    const [match] = Editor.nodes(editor, {
      match: (n) => n.type === 'code',
    })
    return !!match
  },

  toggleBoldMark(editor) {
    const isActive = CustomEditor.isBoldMarkActive(editor)
    Transforms.setNodes(
      editor,
      { bold: isActive ? null : true },
      { match: (n) => SlateText.isText(n), split: true }
    )
  },

  toggleCodeBlock(editor) {
    const isActive = CustomEditor.isCodeBlockActive(editor)
    Transforms.setNodes(
      editor,
      { type: isActive ? null : 'code' },
      { match: (n) => Editor.isBlock(editor, n) }
    )
  },
}

/**
 * Slate elements and leaves
 */

const DefaultElement = (props) => {
  return (
    <Text {...props.attributes} fontSize={['md', 'lg']} pt={3}>
      {props.children}
    </Text>
  )
}

const LinkElement = (props) => {
  return <Link {...props.attributes}>{props.children}</Link>
}

const CodeElement = (props) => {
  return (
    <Text as="pre" {...props.attributes} fontSize={['md', 'lg']} pt={3}>
      <Code display="block" whiteSpace="pre">
        {props.children}
      </Code>
    </Text>
  )
}

const QuoteElement = (props) => {
  return (
    <blockquote {...props.attributes} fontSize={['md', 'lg']} pt={3}>
      {props.children}
    </blockquote>
  )
}

const Leaf = (props) => {
  return (
    <span
      {...props.attributes}
      style={{
        fontWeight: props.leaf.bold ? 'bold' : 'normal',
        fontStyle: props.leaf.italic ? 'italic' : 'normal',
      }}
    >
      {props.children}
    </span>
  )
}
