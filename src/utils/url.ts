export function trimUrl(text) {
  if (text.includes('http')) {
    const splittedUrl = text.split('//')
    const domain = splittedUrl[1]
    return domain
  } else {
    return text
  }
}

export function checkUrl(text) {
  if (text.includes('http://') || text.includes('https://')) {
    return text
  } else {
    return 'https://' + text
  }
}
