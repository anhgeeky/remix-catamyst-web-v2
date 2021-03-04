import NextImage from 'next/image'
import { Box, Stack, Text, Link, useColorModeValue } from '@chakra-ui/react'
export default function BlockImage({ block }) {
  const bg = useColorModeValue('gray.100', 'gray.800')
  const width = block.type === 'screenshot' ? '1440px' : block.width || '100%'
  const height = block.type === 'screenshot' ? '900px' : block.height || '100%'

  return (
    <Box align="center">
      <Box bg={block.type === 'screenshot' && bg}>
        <NextImage
          src={block.src}
          alt={block.name || 'Unknown'}
          width={width}
          height={height}
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
