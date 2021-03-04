import NextImage from 'next/image'
import { Box, Stack, Text, Link, useColorModeValue } from '@chakra-ui/react'

export default function BlockImage({ block }) {
  return (
    <Box align="center" py={5}>
      <Box
        className="next-image-container"
        bg={
          block.type === 'screenshot' &&
          useColorModeValue('gray.100', 'gray.500')
        }
      >
        <NextImage
          className="next-image"
          src={block.imageUrl || block.src}
          alt={block.caption || 'Unknown'}
          width={block.type === 'screenshot' ? '1440px' : block.width}
          height={block.type === 'screenshot' ? '900px' : block.height}
          layout="intrinsic"
          objectFit="contain"
        />
      </Box>

      {block.caption && (
        <Box opacity={0.5} align="center" mt={3}>
          <Text>{block.caption}</Text>
          {block.sourceUrl && (
            <Link fontSize="sm" href={block.sourceUrl}>
              {block.sourceUrl}
            </Link>
          )}
        </Box>
      )}
    </Box>
  )
}
