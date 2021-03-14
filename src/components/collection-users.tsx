import NextLink from 'next/link'
import {
  Avatar,
  Box,
  Heading,
  HStack,
  Stack,
  StackDivider,
  useColorModeValue,
} from '@chakra-ui/react'

export default function CollectionUsers({ users }) {
  const dividerBorderColor = useColorModeValue('gray.200', 'gray.700')

  return (
    <Stack divider={<StackDivider borderColor={dividerBorderColor} />}>
      {users.map((user, index) => {
        return (
          <Stack key={user.id} py={5}>
            <NextLink href={user.handle} passHref>
              <a>
                <HStack>
                  <Avatar
                    name={user.name}
                    src={user.avatarUrl}
                    width="50px"
                    height="50px"
                  />
                  <Heading as="h3" size="md">
                    {user.name} (@{user.handle})
                  </Heading>
                </HStack>
              </a>
            </NextLink>
          </Stack>
        )
      })}
    </Stack>
  )
}
