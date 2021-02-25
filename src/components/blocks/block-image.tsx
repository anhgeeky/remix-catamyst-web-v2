import Image from 'next/image'
import { Box, Stack, Text, Link, useColorModeValue } from '@chakra-ui/react'
export default function BlockImage({ block }) {
  const bg = useColorModeValue('gray.100', 'gray.800')

  return (
    <Box align="center">
      <Box bg={block.type === 'screenshot' && bg}>
        <Image
          src={block.src}
          alt={block.name || 'Unknown'}
          width={block.width || '100%'}
          height={block.height || '100%'}
          layout="intrinsic"
          objectFit="contain"
        />
      </Box>
      {block.type === 'screenshot' && (
        <Stack opacity={0.5} align="center" spacing={0}>
          <Text>{block.name}</Text>
          {block.sourceUrl && (
            <Link fontSize="sm" href={block.sourceUrl}>
              {block.sourceUrl}
            </Link>
          )}
        </Stack>
      )}
    </Box>
  )
}
