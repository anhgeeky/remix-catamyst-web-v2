import { Heading } from '@chakra-ui/react'

export default function HeadingStack({ children }) {
  return (
    <Heading
      as="h2"
      fontFamily="body"
      opacity={0.5}
      size="md"
      textTransform="uppercase"
      textAlign={{ base: 'center', lg: 'left' }}
    >
      {children}
    </Heading>
  )
}
