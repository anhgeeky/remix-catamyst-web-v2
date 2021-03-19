export function trimUrl(url) {
  if (url.includes('http')) {
    const splittedUrl = url.split('//')
    const domain = splittedUrl[1]

    return domain
  }
}
