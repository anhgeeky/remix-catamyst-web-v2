import NextImage from 'next/image'
import NextLink from 'next/link'
import {
  chakra,
  Avatar,
  Box,
  Heading,
  HStack,
  Flex,
  Link,
  LinkBox,
  LinkOverlay,
  Stack,
  StackDivider,
  VStack,
  SimpleGrid,
  useColorModeValue,
} from '@chakra-ui/react'

import { Icon } from '@components'

/**
 * Because there are a lot of organizations,
 * the identification is using className.
 */
export function CollectionOrganizations({ organizations }) {
  return (
    <SimpleGrid spacing={5} width="100%" minChildWidth={220}>
      {organizations.map((org, index) => {
        return (
          <NextLink key={org.handle} href={org.handle} passHref>
            <Link
              as="article"
              rounded="md"
              p={3}
              _hover={{ bg: useColorModeValue('gray.100', 'gray.800') }}
            >
              <Stack
                className="org-and-contents"
                maxW="200px"
                direction={{ base: 'column', lg: 'row' }}
              >
                <HStack minW={300} spacing={3}>
                  {!org.avatarUrl && (
                    <Avatar
                      name={org.name}
                      src={org.avatarUrl}
                      width={100}
                      height={100}
                      size="2xl"
                      rounded="md"
                    />
                  )}
                  {org.avatarUrl && (
                    <Box
                      className="next-image-container org-avatar"
                      rounded="md"
                    >
                      <NextImage
                        className="next-image"
                        src={org.avatarUrl}
                        width={100}
                        height={100}
                        layout="fixed"
                      />
                    </Box>
                  )}
                  <Stack spacing={1}>
                    <Flex id="org-name-verified">
                      <Heading className="org-name" as="h3" size="md">
                        {org.name}
                      </Heading>
                      <chakra.span
                        color="teal.500"
                        position="relative"
                        top="2px"
                        ml={1}
                      >
                        {org.isVerified && <Icon name="verified" />}
                      </chakra.span>
                    </Flex>
                    <Heading
                      className="org-handle"
                      as="h4"
                      size="sm"
                      color="gray.500"
                      fontFamily="body"
                      fontWeight="400"
                    >
                      @{org.handle}
                    </Heading>
                  </Stack>
                </HStack>
              </Stack>
            </Link>
          </NextLink>
        )
      })}
    </SimpleGrid>
  )
}
