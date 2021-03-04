import { Heading, Stack, Divider } from '@chakra-ui/react'
import BlockLinks from '@/components/blocks/block-links'
import theme from '@/theme/theme.json'

export default function BlockReferences({ block }) {
  return (
    <Stack maxW={theme.maxContentWidth} width="100%" spacing={5} pt={10}>
      <Heading
        as="h1"
        color="gray.500"
        fontFamily="body"
        fontSize="xl"
        textAlign="center"
        textTransform="uppercase"
        letterSpacing={0.5}
      >
        References
      </Heading>
      <BlockLinks block={block} />
    </Stack>
  )
}
