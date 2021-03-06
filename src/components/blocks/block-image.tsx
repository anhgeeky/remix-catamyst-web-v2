import NextImage from 'next/image'
import { Box, Text, Link, useColorModeValue } from '@chakra-ui/react'

export default function BlockImage({ block }) {
  return (
    <Box align="center" py={5}>
      <Box
        className="next-image-container"
        bg={
          block.category === 'screenshot' &&
          useColorModeValue('gray.100', 'gray.500')
        }
      >
        <NextImage
          className="next-image"
          src={block.imageUrl || block.src}
          alt={block.caption || 'Unknown'}
          width={
            block.category === 'screenshot' ? '1440px' : block.width || '250px'
          }
          height={
            block.category === 'screenshot' ? '900px' : block.height || '250px'
          }
          layout="intrinsic"
          objectFit="contain"
        />
      </Box>

      {block.showMeta !== false && block.caption && (
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
