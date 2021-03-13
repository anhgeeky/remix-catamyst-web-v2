import { jsx } from 'slate-hyperscript'

/**
 * Convert from SlateElements into HTML.
 */
export function serializeSlateToHTML() {
  return null
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
   */
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
    case 'A':
      return jsx(
        'element',
        { type: 'link', url: el.getAttribute('href') },
        children
      )
    default:
      return el.textContent
  }
}
