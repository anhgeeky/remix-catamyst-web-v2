import NextHead from 'next/head'
import NextImage from 'next/image'
import { Box, Heading, Stack, Text } from '@chakra-ui/react'
import { Card, Content, HeadingStack } from '@components'
import { DashboardHero } from '@components/dashboard'

export function DashboardPosts({ auth }) {
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
              <Box>
                <NextImage
                  src={`${process.env.NEXT_PUBLIC_STORAGE_URL}/illustrations/dashboard-posts-none.png`}
                  alt="No Posts"
                  width={200}
                  height={200}
                />
              </Box>
              <Text>
                Hey {auth.user.name}, you don't have any published posts yet.
              </Text>
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
