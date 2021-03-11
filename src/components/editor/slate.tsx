import {
  ButtonGroup,
  Button,
  Heading,
  Link,
  Text,
  List,
  ListItem,
  ListIcon,
  OrderedList,
  Code,
} from '@chakra-ui/react'
import { FaAngleRight } from 'react-icons/fa'

import React, { useCallback, useMemo, useState } from 'react'
import isHotkey from 'is-hotkey'
import { Editable, withReact, useSlate, Slate } from 'slate-react'
import {
  Editor,
  Transforms,
  createEditor,
  Descendant,
  Node,
  Element as SlateElement,
} from 'slate'
import { withHistory } from 'slate-history'
import { Icon } from '@components'

const HOTKEYS = {
  'mod+b': 'bold',
  'mod+i': 'italic',
  'mod+u': 'underline',
  'ctrl+`': 'code',
}

const LIST_TYPES = ['numbered-list', 'bulleted-list']

export const EditorSlate = () => {
  const renderElement = useCallback((props) => <Element {...props} />, [])
  const renderLeaf = useCallback((props) => <Leaf {...props} />, [])
  const editor = useMemo(() => withHistory(withReact(createEditor())), [])
  const [value, setValue] = useState<Descendant[]>(initialValue as Node[])

  /**
   * Only render when value is present
   */
  if (value) {
    return (
      <Slate
        editor={editor}
        value={value}
        onChange={(value) => setValue(value)}
      >
        <ButtonGroup size="sm" spacing={2}>
          <MarkButton format="bold" icon="bold" />
          <MarkButton format="italic" icon="italic" />
          <MarkButton format="underline" icon="underlined" />
          <MarkButton format="code" icon="code" />
          <BlockButton format="heading-one" icon="heading-one" />
          <BlockButton format="heading-two" icon="heading-two" />
          <BlockButton format="heading-three" icon="heading-three" />
          <BlockButton format="block-quote" icon="block-quote" />
          <BlockButton format="numbered-list" icon="list-ordered" />
          <BlockButton format="bulleted-list" icon="list-unordered" />
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
    case 'block-quote':
      return (
        <Text as="blockquote" pt={3} {...attributes}>
          {children}
        </Text>
      )
    case 'heading-one':
      return (
        <Heading as="h1" size="xl" pt={3} {...attributes}>
          {children}
        </Heading>
      )
    case 'heading-two':
      return (
        <Heading as="h2" size="lg" pt={3} {...attributes}>
          {children}
        </Heading>
      )
    case 'heading-three':
      return (
        <Heading as="h3" size="md" pt={3} {...attributes}>
          {children}
        </Heading>
      )
    case 'bulleted-list':
      return (
        <List pt={3} {...attributes}>
          {children}
        </List>
      )
    case 'list-item':
      return (
        <ListItem {...attributes}>
          <ListIcon as={FaAngleRight} color="teal.500" />
          <Text as="span">{children}</Text>
        </ListItem>
      )
    case 'numbered-list':
      return <OrderedList {...attributes}>{children}</OrderedList>
    default:
      return (
        <Text pt={3} {...attributes}>
          {children}
        </Text>
      )
  }
}

const Leaf = ({ attributes, children, leaf }) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>
  }
  if (leaf.code) {
    children = <Text as="code">{children}</Text>
  }
  if (leaf.italic) {
    children = <em>{children}</em>
  }
  if (leaf.underline) {
    children = <u>{children}</u>
  }
  return <span {...attributes}>{children}</span>
}

const BlockButton = ({ format, icon }) => {
  const editor = useSlate()
  return (
    <Button
      active={isBlockActive(editor, format)}
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
      active={isMarkActive(editor, format)}
      onMouseDown={(event) => {
        event.preventDefault()
        toggleMark(editor, format)
      }}
    >
      <Icon name={icon} />
    </Button>
  )
}

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
      { text: "Since it's rich text..." },
      { text: 'bold', bold: true },
      { text: ', or add a block quote in the middle of the page, like this:' },
    ],
  },
  { type: 'block-quote', children: [{ text: 'A wise quote.' }] },
  { type: 'paragraph', children: [{ text: 'Try it out for yourself!' }] },
]
