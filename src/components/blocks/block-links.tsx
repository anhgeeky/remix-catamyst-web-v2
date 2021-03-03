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
      <Stack maxW={theme.maxContentWidth} width="100%" px={5} spacing={2}>
        {block.items.map((item, index) => {
          return (
            <Link
              isExternal
              key={index}
              href={item.url}
              _hover={{ textDecoration: 'none' }}
            >
              <Flex
                bg={bg}
                flexWrap="wrap"
                boxShadow="base"
                cursor="pointer"
                align="stretch"
                spacing={0}
                _hover={{ boxShadow: 'outline' }}
              >
                <Box bg={item.color || 'transparent'} width="5px" />
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
                    <Text
                      color="gray.500"
                      fontSize="xs"
                      overflowWrap="anywhere"
                    >
                      {item.url}
                    </Text>
                  )}
                </Stack>
              </Flex>
            </Link>
          )
        })}
      </Stack>
    )
  }

  return null
}
