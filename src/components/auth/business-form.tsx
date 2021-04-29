import NextLink from 'next/link'
import { Box, Text, Input, Button, Link, Stack, VStack } from '@chakra-ui/react'
import Iframe from 'react-iframe'

export function AuthBusinessForm() {
  return (
    <VStack>
      <Box width="100%" maxW={760} color="white">
        <Iframe
          id="business-form"
          className="iframe"
          title="Catamyst Business form"
          url="https://tally.so/embed/3Eq9B3?hideTitle=1&alignLeft=1&transparentBackground=1"
          width="100%"
          height="1400px"
        />
      </Box>
    </VStack>
  )
}
