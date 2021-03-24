import { Heading } from '@chakra-ui/react'

export function HeadingStack(props) {
  return (
    <Heading
      className="heading-stack"
      as="h2"
      fontFamily="body"
      size="sm"
      textTransform="uppercase"
      textAlign={{ base: 'center', lg: 'left' }}
      display="flex"
      color="gray.500"
      {...props}
    >
      {props.children}
    </Heading>
  )
}
