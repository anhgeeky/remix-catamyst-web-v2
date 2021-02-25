import {
  Box,
  Link,
  Heading,
  Stack,
  HStack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'
import { ReferenceIcon } from '@/components'

export default function BlockLinks({ block }) {
  const bg = useColorModeValue('white', 'gray.800')

  if (Array.isArray(block.items)) {
    return (
      <Stack maxW="720px" width="100%" px={5} spacing={2}>
        {block.items.map((item, index) => {
          return (
            <Link
              isExternal
              key={index}
              href={item.url}
              _hover={{ textDecoration: 'none' }}
            >
              <HStack
                bg={bg}
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
                    <Text fontSize="xs" color="gray.500">
                      {item.url}
                    </Text>
                  )}
                </Stack>
              </HStack>
            </Link>
          )
        })}
      </Stack>
    )
  }

  return null
}
