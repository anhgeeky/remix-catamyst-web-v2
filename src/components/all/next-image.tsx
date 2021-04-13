import DefaultNextImage from 'next/image'

const customLoader = ({ src }) => {
  return `${src}`
}

const cloudinaryLoader = ({ src }) => {
  return `${src}`
}

export function NextImage(props) {
  return <DefaultNextImage loader={customLoader} {...props} />
}
