import { jsx } from 'slate-hyperscript'
import escapeHtml from 'escape-html'
import { Text } from 'slate'

/**
 * Convert from SlateElements into HTML string
 * @param nodes
 * @returns string
 */
export function serializeSlateToHTML(nodes) {
  return nodes.map((node) => serialize(node)).join('')
}

/**
 * Serialize each Slate nodes/elements
 * @param node
 * @returns string
 */
const serialize = (node) => {
  if (Text.isText(node)) {
    let string = escapeHtml(node.text)
    if (node.bold) {
      string = `<b>${string}</b>`
    }
    if (node.italic) {
      string = `<i>${string}</i>`
    }
    if (node.underline) {
      string = `<u>${string}</u>`
    }
    if (node.code) {
      string = `<code>${string}</code>`
    }
    return string
  }

  const children = node.children.map((n) => serialize(n)).join('')

  switch (node.type) {
    case 'heading-one':
      return `<h1>${children}</h1>`
    case 'heading-two':
      return `<h2>${children}</h2>`
    case 'heading-three':
      return `<h3>${children}</h3>`
    case 'quote':
      return `<blockquote>${children}</blockquote>`
    case 'paragraph':
      return `<p>${children}</p>`
    case 'numbered-list':
      return `<ol>${children}</ol>`
    case 'bulleted-list':
      return `<ul>${children}</ul>`
    case 'list-item':
      return `<li>${children}</li>`
    case 'link':
      return `<a href="${escapeHtml(node.url)}">${children}</a>`
    default:
      return children
  }
}

/**
 * Convert from HTML to SlateElements.
 */
export function deserializeHTMLtoSlate(el) {
  if (el.nodeType === 3) {
    return el.textContent
  } else if (el.nodeType !== 1) {
    return null
  }

  const children = Array.from(el.childNodes).map(deserializeHTMLtoSlate)

  /**
   * Use slate-hyperscript here.
   * Only render if there is an array item in the children.
   */
  if (children?.length) {
    switch (el.nodeName) {
      case 'BODY':
        return jsx('fragment', {}, children)
      case 'BR':
        return '\n'
      case 'BLOCKQUOTE':
        return jsx('element', { type: 'quote' }, children)
      case 'H1':
        return jsx('element', { type: 'heading-one' }, children)
      case 'H2':
        return jsx('element', { type: 'heading-two' }, children)
      case 'H3':
        return jsx('element', { type: 'heading-three' }, children)
      case 'H4':
        return jsx('element', { type: 'heading-four' }, children)
      case 'H5':
        return jsx('element', { type: 'heading-five' }, children)
      case 'H6':
        return jsx('element', { type: 'heading-six' }, children)
      case 'P':
        return jsx('element', { type: 'paragraph' }, children)
      case 'UL':
        return jsx('element', { type: 'bulleted-list' }, children)
      case 'OL':
        return jsx('element', { type: 'numbered-list' }, children)
      case 'LI':
        return jsx('element', { type: 'list-item' }, children)
      case 'A':
        return jsx(
          'element',
          { type: 'link', url: el.getAttribute('href') },
          children
        )
      default:
        return el.textContent
    }
  } else {
    // Return empty paragraph if there is no array item in children.
    return jsx('element', { type: 'paragraph' }, [{ text: '' }])
  }
}
