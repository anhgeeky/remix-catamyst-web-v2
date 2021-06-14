import NextImage from 'next/image'
import {
  chakra,
  Flex,
  Image,
  Box,
  Text,
  Link,
  Stack,
  useColorModeValue,
} from '@chakra-ui/react'
import { v4 as uuidv4 } from 'uuid'

import { isUrl } from '@/utils'

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
      ? 420
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
            alt={block.alt || ''}
            title={block.title || ''}
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
            title={block.title || block.alt || 'Unknown'}
            width={block.width || autoWidth}
            height={block.height || autoHeight}
            layout="intrinsic"
            objectFit="contain"
          />
        </Box>
      )}

      {block.show_meta !== false && (
        <Stack
          opacity={0.5}
          mt={2}
          px={3}
          spacing={1}
          align="center"
          textAlign="center"
        >
          {block.title && <Text fontSize="sm">{block.title}</Text>}
          {block.source && (
            <Text fontSize="xs">
              {isUrl(block.source) ? (
                <Link href={block.source}>{block.source}</Link>
              ) : (
                <chakra.span>{block.source}</chakra.span>
              )}
            </Text>
          )}
        </Stack>
      )}
    </Box>
  )
}
