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
  useColorModeValue,
} from '@chakra-ui/react'

import { Icon, Country } from '@components'

/**
 * Because there are a lot of users, the identification is using className.
 */
export function CollectionUsers({ users }) {
  const dividerBorderColor = useColorModeValue('gray.200', 'gray.700')

  return (
    <Stack divider={<StackDivider borderColor={dividerBorderColor} />}>
      {users.map((user, index) => {
        return (
          <NextLink key={user.id} href={user.handle} passHref>
            <Link as="article" rounded="md" p={3} _hover={{ bg: 'gray.100' }}>
              <Stack
                className="user-and-contents"
                direction={{ base: 'column', lg: 'row' }}
              >
                <HStack minW={300} spacing={3}>
                  <Avatar name={user.name} src={user.avatarUrl} size="xl" />
                  <Stack spacing={1}>
                    <Flex id="user-name-verified">
                      <Heading className="user-name" as="h3" size="md">
                        {user.name}
                      </Heading>
                      <chakra.span
                        color="teal.500"
                        position="relative"
                        top="2px"
                        ml={1}
                      >
                        {user.isVerified && <Icon name="verified" />}
                      </chakra.span>
                    </Flex>
                    <Heading
                      className="user-handle"
                      as="h4"
                      size="sm"
                      color="gray.500"
                      fontFamily="body"
                      fontWeight="400"
                    >
                      @{user.handle}
                    </Heading>
                    <Country code={user.countryCode} />
                  </Stack>
                </HStack>

                <HStack width="100%" overflow="scroll">
                  <Box bg="gray.500" height={100} width={200}>
                    {' '}
                  </Box>
                  <Box bg="red.500" height={100} width={200}>
                    {' '}
                  </Box>
                  <Box bg="blue.500" height={100} width={200}>
                    {' '}
                  </Box>
                  <Box bg="green.500" height={100} width={200}>
                    {' '}
                  </Box>
                  <Box bg="yellow.500" height={100} width={200}>
                    {' '}
                  </Box>
                </HStack>
              </Stack>
            </Link>
          </NextLink>
        )
      })}
    </Stack>
  )
}
