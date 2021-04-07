import NextHead from 'next/head'
import NextImage from 'next/image'
import { Box, Heading, Stack, Text, Button } from '@chakra-ui/react'

import {
  Card,
  CardPlaceholder,
  Content,
  HeadingStack,
  LinkButton,
} from '@components'
import { DashboardHero } from '@components/dashboard'

export function DashboardPosts({ state }) {
  return (
    <>
      <NextHead>
        <title>Posts Dashboard · Catamyst</title>
      </NextHead>

      <DashboardHero>
        <Heading as="h1" size="xl">
          Posts
        </Heading>
        <Text>
          You can write a blog post, notes, tutorial, publication, announcement,
          news, or a changelog.
        </Text>
      </DashboardHero>

      <Content>
        <Stack spacing={5} width="100%">
          <Stack>
            <HeadingStack>Published</HeadingStack>
            <Card>
              <CardPlaceholder>
                <Box>
                  <NextImage
                    className="invertable next-image"
                    src={`https://storage.catamyst.com/illustrations/dashboard-posts-none.png`}
                    alt="No Posts"
                    width={200}
                    height={200}
                  />
                </Box>
                <Text>
                  Hey {state.profile.nickname}, you don't have any published
                  posts yet.
                </Text>
                <LinkButton href="/dashboard/posts/new" colorScheme="teal">
                  Write a post
                </LinkButton>
              </CardPlaceholder>
            </Card>
          </Stack>

          <Stack>
            <HeadingStack>Drafted:</HeadingStack>
            <Card>
              <CardPlaceholder>
                <Text>
                  Hey {state.profile.nickname}, you don't have any draft posts.
                </Text>
                <LinkButton href="/dashboard/posts/new" colorScheme="teal">
                  Write a post
                </LinkButton>
              </CardPlaceholder>
            </Card>
          </Stack>
        </Stack>
      </Content>
    </>
  )
}
