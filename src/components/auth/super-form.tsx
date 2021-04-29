import NextLink from 'next/link'
import { Box, Text, Input, Button, Link, Stack, VStack } from '@chakra-ui/react'
import Iframe from 'react-iframe'

export function AuthSuperForm() {
  return (
    <VStack>
      <Box width="100%" maxW={760}>
        <Iframe
          id="super-form"
          className="iframe"
          title="Catamyst Super form"
          url="https://tally.so/embed/m6LaNw?hideTitle=1&alignLeft=1&transparentBackground=1"
          width="100%"
          height="720px"
        />
      </Box>
    </VStack>
  )
}
