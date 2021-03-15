import NextImage from 'next/image'
import {
  Flex,
  Image,
  Box,
  Text,
  Link,
  useColorModeValue,
} from '@chakra-ui/react'

/**
 * Block that can be used both for actual content and CMS
 * Because the CMS can show this as the preview
 */
export function BlockImage({ block, renderer = 'NextImage' }) {
  const width =
    block.size === 'Huge' // Fill the width
      ? 1440
      : block.size === 'Large' // Beyond texts
      ? 1048
      : block.size === 'Medium' // Same as BlockTexts
      ? 720
      : block.size === 'Small' // Standard size
      ? 300
      : 100 // Tiny for Logo or Icon
  const height =
    block.size === 'Huge'
      ? 900
      : block.size === 'Large'
      ? 600
      : block.size === 'Medium'
      ? 300
      : block.size === 'Small'
      ? 300
      : 100 // Tiny

  return (
    <Box>
      {renderer === 'Image' && (
        <Flex justify="center">
          <Image
            src={block.url || `https://example.com`}
            alt={block.alt || block.title || 'Unknown'}
            width={width}
            height={height}
            objectFit="contain"
          />
        </Flex>
      )}
      {renderer === 'NextImage' && (
        <Box
          className="next-image-container"
          bg={
            block.size === 'Huge' && useColorModeValue('gray.100', 'gray.500')
          }
        >
          {/* Need URL validaton later */}
          <NextImage
            src={block.url || `https://example.com`}
            alt={block.alt || block.title || 'Unknown'}
            width={width}
            height={height}
            layout="intrinsic"
            objectFit="contain"
          />
        </Box>
      )}

      {block.showMeta !== false && block.title && (
        <Box opacity={0.5} align="center" mt={2}>
          <Text>{block.title}</Text>
          {block.source && (
            <Link fontSize="sm" href={block.source}>
              {block.source}
            </Link>
          )}
        </Box>
      )}
    </Box>
  )
}
