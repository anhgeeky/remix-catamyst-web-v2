import DefaultNextImage from 'next/image'

const customLoader = ({ src }) => {
  return `${src}`
}

const imagekitLoader = ({ src }) => {
  return `${src}`
}

export function NextImage(props) {
  return <DefaultNextImage {...props} />
}
