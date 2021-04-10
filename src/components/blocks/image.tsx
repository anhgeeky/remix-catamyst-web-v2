import NextImage from 'next/image'
import {
  Flex,
  Image,
  Box,
  Text,
  Link,
  useColorModeValue,
} from '@chakra-ui/react'
import { v4 as uuidv4 } from 'uuid'

/**
 * Block that can be used both for actual content and CMS
 * Because the CMS can show this as the preview
 */
export function BlockImage({ block, renderer = 'NextImage' }) {
  const uuid = uuidv4()
  const autoWidth =
    block.size === 'Huge' // Fill the width
      ? 1440
      : block.size === 'Large' // Beyond texts
      ? 1048
      : block.size === 'Medium' // Same as BlockTexts
      ? 720
      : block.size === 'Small' // Standard size
      ? 300
      : 150 // Tiny for Logo or Icon
  const autoHeight =
    block.size === 'Huge'
      ? 900
      : block.size === 'Large'
      ? 600
      : block.size === 'Medium'
      ? 300
      : block.size === 'Small'
      ? 300
      : 150 // Tiny

  /**
   * Renderer should be automatice to determine based on next.config.js
   */
  return (
    <Box>
      {renderer === 'Image' && (
        <Flex justify="center">
          <Image
            className={`${block.is_invertable && 'invertable'}`}
            src={block.url || `https://example.com`}
            alt={block.alt || block.title || 'Unknown'}
            width={block.width || autoWidth}
            height={block.height || autoHeight}
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
            key={uuid}
            className={`next-image${block.is_invertable ? ' invertable' : ''}`}
            src={block.url || `https://example.com`}
            alt={block.alt || block.title || 'Unknown'}
            width={block.width || autoWidth}
            height={block.height || autoHeight}
            layout="intrinsic"
            objectFit="contain"
          />
        </Box>
      )}

      {block.show_meta !== false && block.title && (
        <Box opacity={0.5} align="center" mt={2}>
          <Text fontSize="sm">{block.title}</Text>
          {block.source && (
            <Link fontSize="xs" href={block.source}>
              {block.source}
            </Link>
          )}
        </Box>
      )}
    </Box>
  )
}
