import {
  Link,
  Box,
  Heading,
  Stack,
  HStack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'
import { ReferenceIcon } from '@/components'
import React from 'react'

export default function BlockReferences({ block }) {
  const bg = useColorModeValue('white', 'gray.800')

  return (
    <Stack maxW="720px" p={5} spacing={5} width="100%">
      <hr />
      <Heading fontFamily="body">References</Heading>
      <Stack>
        {Array.isArray(block.items) &&
          block.items.map((item, index) => {
            return (
              <Link
                isExternal
                key={index}
                href={item.url}
                _hover={{ textDecoration: 'none' }}
              >
                <Box
                  key={index}
                  bg={bg}
                  boxShadow="base"
                  cursor="pointer"
                  p={3}
                  _hover={{ boxShadow: 'outline' }}
                >
                  <HStack>
                    <ReferenceIcon type={item.type} />
                    <Heading as="h4" fontFamily="body" size="sm">
                      {item.title}
                    </Heading>
                  </HStack>
                  <Text fontSize="sm">{item.source || 'Unknown'}</Text>
                  <Text fontSize="xs" color="gray.500">
                    {item.url}
                  </Text>
                </Box>
              </Link>
            )
          })}
      </Stack>
    </Stack>
  )
}
