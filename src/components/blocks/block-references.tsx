import { Heading, Stack, Divider } from '@chakra-ui/react'
import BlockLinks from './block-links'

export default function BlockReferences({ block }) {
  return (
    <Stack maxW="720px" width="100%" spacing={5}>
      <Stack px={5} pt={10}>
        <Divider opacity={1} />
      </Stack>
      <Heading
        fontFamily="body"
        textTransform="uppercase"
        textAlign="center"
        fontSize="xl"
        letterSpacing={0.5}
      >
        References
      </Heading>
      <BlockLinks block={block} />
    </Stack>
  )
}
