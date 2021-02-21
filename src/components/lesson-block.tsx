import {
  Image,
  Flex,
  Box,
  HStack,
  Heading,
  Badge,
  Stack,
  Text,
  Link,
} from '@chakra-ui/react'
import ReactHtmlParser from 'react-html-parser'

export default function LessonBlock({ block }) {
  if (block.component === 'image') {
    return (
      <Stack align="center">
        <Image
          src={block.imageUrl}
          alt={block.imageName}
          maxW={block.imageSize}
        />
        <Stack opacity={0.5} align="center" spacing={0}>
          <Text>{block.imageName}</Text>
          <Link fontSize="sm" href={block.sourceUrl}>
            {block.sourceUrl}
          </Link>
        </Stack>
      </Stack>
    )
  } else if (block.component === 'text') {
    return (
      <Box className="text-block" maxW="680px" p={5}>
        <Text>{ReactHtmlParser(block.contentHtml)}</Text>
      </Box>
    )
  } else {
    return <Box />
  }
}
