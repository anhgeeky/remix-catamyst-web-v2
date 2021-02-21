import { Container } from '@chakra-ui/react'

export default function Content({ children }) {
  return (
    <Container maxW="1200px" p={5}>
      {children}
    </Container>
  )
}
