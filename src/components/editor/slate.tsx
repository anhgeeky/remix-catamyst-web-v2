import {
  chakra,
  Button,
  ButtonGroup,
  Code,
  Heading,
  Link,
  List,
  ListIcon,
  ListItem,
  OrderedList,
  Text,
  Tooltip,
  useColorModeValue,
} from '@chakra-ui/react'

import React, { useCallback, useMemo, useState } from 'react'
import isUrl from 'is-url'
import isHotkey from 'is-hotkey'
import { Editable, withReact, useSlate, Slate } from 'slate-react'
import {
  createEditor,
  Descendant,
  Editor,
  Element as SlateElement,
  Node,
  Range,
  Transforms,
} from 'slate'
import { withHistory } from 'slate-history'
import { Icon } from '@components'

const HOTKEYS = {
  'mod+b': 'bold',
  'mod+i': 'italic',
  'mod+u': 'underline',
  'ctrl+`': 'code',
  // 'mod+1': 'heading-one',
  // 'mod+2': 'heading-two',
  // 'mod+3': 'heading-three',
}

const LIST_TYPES = ['numbered-list', 'bulleted-list']

export const EditorSlate = ({ handleSave }) => {
  const [value, setValue] = useState<Descendant[]>(initialValue)
  const renderElement = useCallback((props) => <Element {...props} />, [])
  const renderLeaf = useCallback((props) => <Leaf {...props} />, [])
  const editor = useMemo(
    () => withLinks(withHistory(withReact(createEditor()))),
    []
  )

  /**
   * Try to prevent focus error when fast refresh
   */
  // editor.selection = {
  //   anchor: { path: [0, 0], offset: 0 },
  //   focus: { path: [0, 0], offset: 0 },
  // }

  /**
   * Only render when value is present
   */
  if (value) {
    return (
      <Slate
        editor={editor}
        value={value}
        onChange={(value) => {
          setValue(value)
        }}
      >
        <ButtonGroup size="sm" spacing={2}>
          <BlockButton format="heading-one" icon="heading-one" />
          <BlockButton format="heading-two" icon="heading-two" />
          <BlockButton format="heading-three" icon="heading-three" />
          <BlockButton format="numbered-list" icon="list-ordered" />
          <BlockButton format="bulleted-list" icon="list-unordered" />
          <BlockButton format="block-quote" icon="block-quote" />
          <MarkButton format="bold" icon="bold" />
          <MarkButton format="italic" icon="italic" />
          <MarkButton format="underline" icon="underlined" />
          <MarkButton format="code" icon="code" />
          <LinkButton />
        </ButtonGroup>

        <Editable
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          placeholder="Enter some rich text…"
          spellCheck
          autoFocus
          onKeyDown={(event) => {
            for (const hotkey in HOTKEYS) {
              if (isHotkey(hotkey, event as any)) {
                event.preventDefault()
                const mark = HOTKEYS[hotkey]
                toggleMark(editor, mark)
              }
            }
          }}
        />
      </Slate>
    )
  }
  return null
}

const toggleBlock = (editor, format) => {
  const isActive = isBlockActive(editor, format)
  const isList = LIST_TYPES.includes(format)

  Transforms.unwrapNodes(editor, {
    match: (n) =>
      LIST_TYPES.includes(
        // @ts-ignore
        !Editor.isEditor(n) && SlateElement.isElement(n) && n.type
      ),
    split: true,
  })
  const newProperties: Partial<SlateElement> = {
    type: isActive ? 'paragraph' : isList ? 'list-item' : format,
  }
  Transforms.setNodes(editor, newProperties)

  if (!isActive && isList) {
    const block = { type: format, children: [] }
    Transforms.wrapNodes(editor, block)
  }
}

const toggleMark = (editor, format) => {
  const isActive = isMarkActive(editor, format)

  if (isActive) {
    Editor.removeMark(editor, format)
  } else {
    Editor.addMark(editor, format, true)
  }
}

const isBlockActive = (editor, format) => {
  // @ts-ignore
  const [match] = Editor.nodes(editor, {
    match: (n) =>
      !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === format,
  })

  return !!match
}

const isMarkActive = (editor, format) => {
  const marks = Editor.marks(editor)
  return marks ? marks[format] === true : false
}

const Element = ({ attributes, children, element }) => {
  switch (element.type) {
    case 'heading-one':
      return (
        <Heading as="h1" size="xl" mt={3} {...attributes}>
          {children}
        </Heading>
      )
    case 'heading-two':
      return (
        <Heading as="h2" size="lg" mt={3} {...attributes}>
          {children}
        </Heading>
      )
    case 'heading-three':
      return (
        <Heading as="h3" size="md" mt={3} {...attributes}>
          {children}
        </Heading>
      )
    case 'numbered-list':
      return (
        <OrderedList mt={3} paddingInlineStart="40px" {...attributes}>
          {children}
        </OrderedList>
      )
    case 'bulleted-list':
      return (
        <List
          mt={3}
          listStyleType="initial"
          paddingInlineStart="40px"
          {...attributes}
        >
          {children}
        </List>
      )
    case 'list-item':
      return (
        <ListItem mt={1} {...attributes}>
          {children}
        </ListItem>
      )

    case 'block-quote':
      return (
        <Text
          as="blockquote"
          mt={3}
          pl={3}
          borderLeftWidth={3}
          borderStyle="solid"
          borderColor="teal.500"
          {...attributes}
        >
          {children}
        </Text>
      )
    case 'link':
      return (
        <Tooltip hasArrow placement="top" aria-label="Link" label={element.url}>
          <Link isExternal color="teal.500" href={element.url} {...attributes}>
            {children}
          </Link>
        </Tooltip>
      )
    default:
      return (
        <Text mt={3} {...attributes}>
          {children}
        </Text>
      )
  }
}

export type LinkElement = {
  type: 'link'
  url: string
  children: Descendant[]
}

const Leaf = ({ attributes, children, leaf }) => {
  if (leaf.code) {
    children = (
      <Text
        as="code"
        size="sm"
        p={1}
        bg={useColorModeValue('gray.200', 'black')}
      >
        {children}
      </Text>
    )
  }
  if (leaf.bold) {
    children = <strong>{children}</strong>
  }
  if (leaf.italic) {
    children = <em>{children}</em>
  }
  if (leaf.underline) {
    children = <u>{children}</u>
  }
  if (leaf.link) {
    children = <a>{children}</a>
  }
  return <span {...attributes}>{children}</span>
}

const BlockButton = ({ format, icon }) => {
  const editor = useSlate()
  return (
    <Button
      // active={isBlockActive(editor, format)}
      onMouseDown={(event) => {
        event.preventDefault()
        toggleBlock(editor, format)
      }}
    >
      <Icon name={icon} />
    </Button>
  )
}

const MarkButton = ({ format, icon }) => {
  const editor = useSlate()
  return (
    <Button
      // active={isMarkActive(editor, format)}
      onMouseDown={(event) => {
        event.preventDefault()
        toggleMark(editor, format)
      }}
    >
      <Icon name={icon} />
    </Button>
  )
}

const LinkButton = () => {
  const editor = useSlate()
  return (
    <Button
      active={isLinkActive(editor)}
      onMouseDown={(event) => {
        event.preventDefault()
        const url = window.prompt('Enter URL with https://')
        if (!url) return
        insertLink(editor, url)
      }}
    >
      <Icon name="link" />
    </Button>
  )
}

const withLinks = (editor) => {
  const { insertData, insertText, isInline } = editor

  editor.isInline = (element) => {
    return element.type === 'link' ? true : isInline(element)
  }

  editor.insertText = (text) => {
    if (text && isUrl(text)) {
      wrapLink(editor, text)
    } else {
      insertText(text)
    }
  }

  editor.insertData = (data) => {
    const text = data.getData('text/plain')

    if (text && isUrl(text)) {
      wrapLink(editor, text)
    } else {
      insertData(data)
    }
  }

  return editor
}

const insertLink = (editor, url) => {
  if (editor.selection) {
    wrapLink(editor, url)
  }
}

const isLinkActive = (editor) => {
  // @ts-ignore
  const [link] = Editor.nodes(editor, {
    match: (n) =>
      !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === 'link',
  })
  return !!link
}

const unwrapLink = (editor) => {
  Transforms.unwrapNodes(editor, {
    match: (n) =>
      !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === 'link',
  })
}

const wrapLink = (editor, url) => {
  if (isLinkActive(editor)) {
    unwrapLink(editor)
  }

  const { selection } = editor
  const isCollapsed = selection && Range.isCollapsed(selection)
  const link: LinkElement = {
    type: 'link',
    url,
    children: isCollapsed ? [{ text: url }] : [],
  }

  if (isCollapsed) {
    Transforms.insertNodes(editor, link)
  } else {
    Transforms.wrapNodes(editor, link, { split: true })
    Transforms.collapse(editor, { edge: 'end' })
  }
}

/**
 * Placeholder value
 */

const initialValue: SlateElement[] = [
  {
    type: 'paragraph',
    children: [
      { text: 'This is editable ' },
      { text: 'rich', bold: true },
      { text: ' text, ' },
      { text: 'much', italic: true },
      { text: ' better than a ' },
      { text: '<textarea>', code: true },
      { text: '!' },
    ],
  },
  {
    type: 'paragraph',
    children: [
      { text: "Since it's rich text, you can use " },
      { text: 'bold', bold: true },
      { text: ', or add a block quote in the middle of the page, like this:' },
    ],
  },
  { type: 'block-quote', children: [{ text: 'A wise quote.' }] },
  { type: 'paragraph', children: [{ text: 'Try it out for yourself!' }] },
  {
    type: 'paragraph',
    children: [
      { text: 'In addition to block nodes, you can create ' },
      {
        type: 'link',
        url: 'https://en.wikipedia.org/wiki/Hypertext',
        children: [{ text: 'hyperlinks' }],
      },
      { text: '!' },
    ],
  },
]
