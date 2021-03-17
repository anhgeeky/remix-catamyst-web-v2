import { Container } from '@chakra-ui/react'

export function Content(props) {
  return (
    <Container maxW={1200} p={5} {...props}>
      {props.children}
    </Container>
  )
}
