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

import { Icon } from '@components'

/**
 * Because there are a lot of users, the identification is using className.
 */
export function CollectionUsers({ users }) {
  return (
    <Stack
      divider={
        <StackDivider borderColor={useColorModeValue('gray.200', 'gray.700')} />
      }
    >
      {users.map((user, index) => {
        return (
          <NextLink key={user.handle} href={user.handle} passHref>
            <Link
              as="article"
              rounded="md"
              p={3}
              _hover={{ bg: useColorModeValue('gray.100', 'gray.800') }}
            >
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
                  </Stack>
                </HStack>

                <HStack
                  className="hidden-scrollbar"
                  width="100%"
                  overflowX="scroll"
                >
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
