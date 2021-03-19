import { Heading } from '@chakra-ui/react'

export function HeadingStack({ children }) {
  return (
    <Heading
      className="heading-stack"
      as="h2"
      fontFamily="body"
      opacity={0.5}
      size="sm"
      textTransform="uppercase"
      textAlign={{ base: 'center', lg: 'left' }}
      display="flex"
    >
      {children}
    </Heading>
  )
}
