import { Heading } from '@chakra-ui/react'

export function HeadingOne({ children }) {
  return (
    <Heading as="h1" size="xl" pt={6} pb={4}>
      {children}
    </Heading>
  )
}

export function HeadingTwo({ children }) {
  return (
    <Heading as="h2" size="lg" pt={5} pb={3}>
      {children}
    </Heading>
  )
}

export function HeadingThree({ children }) {
  return (
    <Heading as="h3" size="md" pt={4} pb={2}>
      {children}
    </Heading>
  )
}
