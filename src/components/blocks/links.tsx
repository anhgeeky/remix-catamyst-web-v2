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
import { checkUrl } from '@/utils'

/**
 * Block only can be used for actual content
 * Because the CMS need combined control with the preview
 */
export function BlockLinks({ block }) {
  const bg = useColorModeValue('white', 'gray.800')

  return (
    <Box maxW={760} width="100%" px={5}>
      <Stack spacing={2}>
        {block.is_references && (
          <Heading
            className="heading-with-anchor"
            as="h1"
            id="references"
            pt={10}
            color="gray.500"
            fontFamily="body"
            fontSize="xl"
            textAlign="center"
            textTransform="uppercase"
            letterSpacing={0.5}
          >
            <span>References</span>
            <Link
              href="#references"
              aria-label="Anchor to references"
              color="teal.500"
              opacity={0}
              ml={1}
            >
              #
            </Link>
          </Heading>
        )}

        {Array.isArray(block.links) &&
          block.links.map((link, index) => {
            /**
             * Only render link item if it has a title.
             */
            if (!link?.title) {
              return null
            }
            return (
              <Flex
                isExternal
                as={Link}
                align="stretch"
                bg={bg}
                boxShadow="base"
                cursor="pointer"
                flexWrap="wrap"
                href={checkUrl(link.url)}
                key={index}
                rounded="md"
                spacing={0}
                _hover={{
                  textDecoration: 'none',
                  boxShadow: 'outline',
                }}
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
                    {link.source && link.author && <span> · </span>}
                    {link.author && <Text as="span">{link.author}</Text>}
                  </Text>
                  {link.url && (
                    <Text
                      color="gray.500"
                      fontSize="xs"
                      overflowWrap="anywhere"
                    >
                      {link.url}
                    </Text>
                  )}
                </Stack>
              </Flex>
            )
          })}
      </Stack>
    </Box>
  )
}
