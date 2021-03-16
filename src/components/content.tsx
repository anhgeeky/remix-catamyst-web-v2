import { Container } from '@chakra-ui/react'

export default function Content(props) {
  return (
    <Container maxW={1200} p={5} {...props}>
      {props.children}
    </Container>
  )
}
