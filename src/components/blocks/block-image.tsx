import Image from 'next/image'
import { Box, Stack, Text, Link, useColorModeValue } from '@chakra-ui/react'
export default function BlockImage({ block }) {
  const bg = useColorModeValue('gray.100', 'gray.800')

  return (
    <Box align="center">
      <Box bg={block.type === 'screenshot' && bg}>
        <Image
          src={block.src}
          alt={block.name}
          width={block.width}
          height={block.height}
          layout="intrinsic"
          objectFit="contain"
        />
      </Box>
      <Stack opacity={0.5} align="center" spacing={0}>
        <Text>{block.name}</Text>
        <Link fontSize="sm" href={block.sourceUrl}>
          {block.sourceUrl}
        </Link>
      </Stack>
    </Box>
  )
}