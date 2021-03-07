import NextHead from 'next/head'
import { Heading, Stack, Text } from '@chakra-ui/react'
import { Card, Content, HeadingStack } from '@components'
import { DashboardHero } from '@components/dashboard'

export default function DashboardPosts({ auth }) {
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
          Your published and draft posts. Can be used for a blog, notes, or
          news.
        </Text>
      </DashboardHero>
      <Content>
        <Stack spacing={5} width="100%">
          <Stack>
            <HeadingStack>Published Posts:</HeadingStack>
            <Card>
              Hey {auth.user.name}, you don't have any published posts yet.
            </Card>
          </Stack>
          <Stack>
            <HeadingStack>Draft Posts:</HeadingStack>
            <Card>
              Hey {auth.user.name}, you don't have any draft posts yet.
            </Card>
          </Stack>
        </Stack>
      </Content>
    </>
  )
}
