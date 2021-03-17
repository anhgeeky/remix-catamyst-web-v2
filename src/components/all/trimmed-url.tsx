export function TrimmedURL({ url = '' }) {
  if (url.includes('http')) {
    const splittedUrl = url.split('//')
    const domain = splittedUrl[1]
    return <span>{domain}</span>
  } else {
    return <span />
  }
}
