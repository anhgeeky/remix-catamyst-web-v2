import NextLink from 'next/link'
import {
  useColorModeValue,
  Text,
  Stack,
  HStack,
  Box,
  Heading,
  StackDivider,
} from '@chakra-ui/react'
import { Layout } from '@/layouts'
import { Hero, Content } from '@/components'
import topUsers from '@/data/top-users.json'

export default function Discover() {
  const dividerBorderColor = useColorModeValue('gray.200', 'gray.700')

  return (
    <Layout title="Discover members and projects on Catamyst">
      <Hero>
        <Heading as="h1" size="xl">
          Discover members and projects
        </Heading>
        <Text>
          Connect with learners, developers, and designers on Catamyst. Check
          out their showcase projects!
        </Text>
      </Hero>

      <Content>
        <Stack divider={<StackDivider borderColor={dividerBorderColor} />}>
          {topUsers.map((user, index) => {
            return (
              <Stack key={user.id} py={5}>
                <NextLink href={user.handle}>
                  <a>
                    <HStack>
                      <Box
                        data-id="placeholder-image"
                        borderRadius="full"
                        bg="black"
                        width="50px"
                        height="50px"
                      />
                      <Heading as="h4" size="md">
                        {user.name} (@{user.handle})
                      </Heading>
                    </HStack>
                  </a>
                </NextLink>
              </Stack>
            )
          })}
        </Stack>
      </Content>
    </Layout>
  )
}
