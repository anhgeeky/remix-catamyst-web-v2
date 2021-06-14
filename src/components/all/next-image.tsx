import DefaultNextImage from 'next/image'

export const customLoader = ({ src }) => {
  return `${src}`
}

export const imagekitLoader = ({ src }) => {
  return `${src}`
}

export const NextImage = (props) => {
  return <DefaultNextImage {...props} />
}
