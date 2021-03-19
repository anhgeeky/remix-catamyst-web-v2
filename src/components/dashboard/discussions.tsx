import NextHead from 'next/head'
import NextImage from 'next/image'
import { Box, Heading, Stack, Text } from '@chakra-ui/react'

import {
  Card,
  CardPlaceholder,
  Content,
  HeadingStack,
  LinkButton,
} from '@components'
import { DashboardHero } from '@components/dashboard'

export function DashboardDiscussions({ auth }) {
  return (
    <>
      <NextHead>
        <title>Discussions Dashboard · Catamyst</title>
      </NextHead>

      <DashboardHero>
        <Heading as="h1" size="xl">
          Discussions
        </Heading>
        <Text>
          You can discuss ideas, ask questions, and answer things with other
          community members in the forum.
        </Text>
      </DashboardHero>

      <Content>
        <Stack spacing={5} width="100%">
          <Stack>
            <HeadingStack>Involved</HeadingStack>
            <Card>
              <CardPlaceholder>
                <Box>
                  <NextImage
                    src={`${process.env.NEXT_PUBLIC_STORAGE_URL}/illustrations/dashboard-discussions-none.png`}
                    alt="No Discussions"
                    width={200}
                    height={200}
                  />
                </Box>
                <Text>
                  Hey {auth.user.name}, you haven't involved in any discussions
                  yet.
                </Text>
                <LinkButton href="/forum" colorScheme="teal">
                  Explore the forum
                </LinkButton>
              </CardPlaceholder>
            </Card>
          </Stack>
        </Stack>
      </Content>
    </>
  )
}
