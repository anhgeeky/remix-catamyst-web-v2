import { Container } from '@chakra-ui/react'

export default function Content(props) {
  return (
    <Container maxW="1200px" p={5} {...props}>
      {props.children}
    </Container>
  )
}
