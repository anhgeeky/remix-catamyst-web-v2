import {
  Box,
  Flex,
  Heading,
  HStack,
  Link,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'
import { ReferenceIcon } from '@/components'
import theme from '@/theme/theme.json'

export default function BlockLinks({ block }) {
  const bg = useColorModeValue('white', 'gray.800')

  if (Array.isArray(block.items)) {
    return (
      <Stack maxW={theme.maxContentWidth} width="100%" px={5} spacing={3}>
        {block.items.map((item, index) => {
          return (
            <Flex
              isExternal
              align="stretch"
              as={Link}
              bg={bg}
              boxShadow="base"
              cursor="pointer"
              flexWrap="wrap"
              href={item.url}
              key={index}
              rounded="md"
              spacing={0}
              _hover={{ textDecoration: 'none', boxShadow: 'outline' }}
            >
              <Box
                bg={item.color || 'transparent'}
                width="5px"
                borderTopLeftRadius="md"
                borderBottomLeftRadius="md"
              />
              <Stack p={3} spacing={1}>
                <HStack>
                  {item.type && <ReferenceIcon type={item.type} />}
                  <Heading as="h4" fontFamily="body" size="sm">
                    {item.title}
                  </Heading>
                </HStack>
                <Text fontSize="sm">
                  {item.source && <Text as="span">{item.source}</Text>}
                  {item.author && <Text as="span"> · {item.author}</Text>}
                </Text>
                {item.url && (
                  <Text color="gray.500" fontSize="xs" overflowWrap="anywhere">
                    {item.url}
                  </Text>
                )}
              </Stack>
            </Flex>
          )
        })}
      </Stack>
    )
  }

  return null
}
