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
import { ReferenceIcon } from '@components'

/**
 * Block only can be used for actual content
 * Because the CMS need combined control with the preview
 */
export default function BlockLinks({ block }) {
  const bg = useColorModeValue('white', 'gray.800')

  return (
    <Stack spacing={2} px={5}>
      {block.category === 'References' && (
        <Heading
          as="h1"
          pt={10}
          color="gray.500"
          fontFamily="body"
          fontSize="xl"
          textAlign="center"
          textTransform="uppercase"
          letterSpacing={0.5}
        >
          References
        </Heading>
      )}
      {Array.isArray(block.links) &&
        block.links.map((link, index) => {
          return (
            <Flex
              isExternal
              as={Link}
              align="stretch"
              bg={bg}
              boxShadow="base"
              cursor="pointer"
              flexWrap="wrap"
              href={link.url}
              key={index}
              rounded="md"
              spacing={0}
              _hover={{ textDecoration: 'none', boxShadow: 'outline' }}
            >
              <Box
                bg={link.color || 'transparent'}
                width="5px"
                borderTopLeftRadius="md"
                borderBottomLeftRadius="md"
              />
              <Stack p={3} spacing={1}>
                <HStack>
                  {link.category && <ReferenceIcon name={link.category} />}
                  <Heading as="h2" fontFamily="body" size="sm">
                    {link.title}
                  </Heading>
                </HStack>
                <Text fontSize="sm">
                  {link.source && <Text as="span">{link.source}</Text>}
                  {link.author && <Text as="span"> · {link.author}</Text>}
                </Text>
                {link.url && (
                  <Text color="gray.500" fontSize="xs" overflowWrap="anywhere">
                    {link.url}
                  </Text>
                )}
              </Stack>
            </Flex>
          )
        })}
    </Stack>
  )
}
