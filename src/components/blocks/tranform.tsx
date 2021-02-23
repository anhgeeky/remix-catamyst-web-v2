import { Heading, Text } from '@chakra-ui/react'

export default function transform(node) {
  const data = node.children[0].data
  if (node.name === 'p') {
    return (
      <Text fontSize="lg" mt={6} mb={3}>
        {data}
      </Text>
    )
  }
  if (node.name === 'h1') {
    return (
      <Heading as="h1" fontFamily="body" size="xl" mt={10} mb={5}>
        {data}
      </Heading>
    )
  }
  if (node.name === 'h2') {
    return (
      <Heading as="h2" fontFamily="body" size="lg" mt={8} mb={4}>
        {data}
      </Heading>
    )
  }
  if (node.name === 'h3') {
    return (
      <Heading as="h3" fontFamily="body" size="md" mt={6} mb={3}>
        {data}
      </Heading>
    )
  }
  return null
}
