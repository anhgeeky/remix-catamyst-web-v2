import Image from 'next/image'

const customLoader = ({ src }) => {
  return `${src}`
}

export function NextImage(props) {
  return <Image loader={customLoader} {...props} />
}
