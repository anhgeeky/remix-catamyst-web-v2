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
import { OrganizationAvatar } from '@components/organizations'

/**
 * Because there are a lot of organizations,
 * the identification is using className.
 */
export function CollectionOrganizations({ organizations }) {
  return (
    <SimpleGrid spacing={3} width="100%" minChildWidth={250}>
      {organizations
        .filter((org) => org.isPublished)
        .map((org, index) => {
          return (
            <NextLink key={org.handle} href={org.handle} passHref>
              <Link
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
                    <OrganizationAvatar org={org} />
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
