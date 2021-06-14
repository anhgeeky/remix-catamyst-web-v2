import { chakra, Box, Text } from '@chakra-ui/react'
import { checkUrl } from '@/utils'

export function BlockQuote({ block }) {
  return (
    <Box className="block-quote" width="100%" maxW={760} px={5}>
      <chakra.figure
        px={3}
        borderLeftWidth={3}
        borderLeftStyle="solid"
        borderLeftColor="teal.500"
      >
        <Text as="blockquote" cite={checkUrl(block.cite)} fontSize="lg">
          <p>“{block.text}”</p>
        </Text>

        {block.author && (
          <chakra.figcaption>
            <span>— {block.author}</span>
          </chakra.figcaption>
        )}
      </chakra.figure>
    </Box>
  )
}
