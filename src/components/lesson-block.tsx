import Image from 'next/image'
import {
  Flex,
  Box,
  HStack,
  Heading,
  Badge,
  Stack,
  Text,
  Link,
  useColorModeValue,
} from '@chakra-ui/react'
import ReactHtmlParser from 'react-html-parser'

export default function LessonBlock({ block }) {
  if (block.component === 'image') {
    const bg = useColorModeValue('gray.100', 'gray.800')
    return (
      <Stack align="center">
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
      </Stack>
    )
  } else if (block.component === 'text') {
    return (
      <Box className="text-block" maxW="680px" p={5}>
        <Text>{ReactHtmlParser(block.html)}</Text>
      </Box>
    )
  } else {
    return <Box />
  }
}
