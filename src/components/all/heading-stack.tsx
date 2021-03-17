import { Heading } from '@chakra-ui/react'

export function HeadingStack({ children }) {
  return (
    <Heading
      as="h2"
      fontFamily="body"
      opacity={0.5}
      size="sm"
      textTransform="uppercase"
      textAlign={{ base: 'center', lg: 'left' }}
    >
      {children}
    </Heading>
  )
}
