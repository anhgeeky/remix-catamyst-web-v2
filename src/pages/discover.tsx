import NextLink from 'next/link'
import {
  useColorModeValue,
  Text,
  Stack,
  Box,
  Heading,
  StackDivider,
} from '@chakra-ui/react'
import { LayoutDefault } from '@/layouts'
import topUsers from '@/data/top-users.json'

export default function Discover() {
  const dividerBorderColor = useColorModeValue('gray.200', 'gray.700')

  return (
    <LayoutDefault title="Discover members and projects on Catamyst">
      <Heading as="h1" size="xl">
        Discover members and projects
      </Heading>
      <Text>
        Connect with learners, developers, and designers on Catamyst. Check out
        their showcase projects!
      </Text>

      <Stack
        my={10}
        divider={<StackDivider borderColor={dividerBorderColor} />}
      >
        {topUsers.map((user) => {
          return (
            <Box py={5}>
              <Heading as="h4" size="md">
                <NextLink href={user.handle}>
                  <a>
                    {user.name} (@{user.handle})
                  </a>
                </NextLink>
              </Heading>
            </Box>
          )
        })}
      </Stack>
    </LayoutDefault>
  )
}
