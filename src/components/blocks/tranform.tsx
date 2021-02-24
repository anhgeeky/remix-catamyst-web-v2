import { Heading, Text } from '@chakra-ui/react'
import { v4 as uuidv4 } from 'uuid'

export default function transform(node) {
  const data = node.children[0].data
  const uuid = uuidv4()

  if (node.name === 'p') {
    return (
      <Text key={uuid} fontSize={['md', 'lg']} mt={6} mb={3}>
        {data}
      </Text>
    )
  }
  if (node.name === 'h1') {
    return (
      <Heading key={uuid} as="h1" fontFamily="body" size="xl" mt={10} mb={5}>
        {data}
      </Heading>
    )
  }
  if (node.name === 'h2') {
    return (
      <Heading key={uuid} as="h2" fontFamily="body" size="lg" mt={8} mb={4}>
        {data}
      </Heading>
    )
  }
  if (node.name === 'h3') {
    return (
      <Heading key={uuid} as="h3" fontFamily="body" size="md" mt={6} mb={3}>
        {data}
      </Heading>
    )
  }
  return null
}
