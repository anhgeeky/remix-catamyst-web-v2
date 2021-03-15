import NextHead from 'next/head'
import NextImage from 'next/image'
import { Box, Heading, Stack, Text } from '@chakra-ui/react'

import { Card, Content, HeadingStack } from '@components'
import { DashboardHero } from '@components/dashboard'

export default function DashboardDiscussions({ auth }) {
  return (
    <>
      <NextHead>
        <title>Discussions Dashboard · Catamyst</title>
      </NextHead>

      <DashboardHero>
        <Heading as="h1" size="xl">
          Discussions
        </Heading>
        <Text>Your discussions in the forum.</Text>
      </DashboardHero>

      <Content>
        <Stack spacing={5} width="100%">
          <Stack>
            <HeadingStack>Involved discussions:</HeadingStack>
            <Card>
              <Box>
                <NextImage
                  src={`${process.env.NEXT_PUBLIC_STORAGE_URL}/illustrations/dashboard-discussions-none.png`}
                  alt="No Discussions"
                  width={200}
                  height={200}
                />
              </Box>
              Hey {auth.user.name}, you haven't involved in any discussions yet.
            </Card>
          </Stack>
        </Stack>
      </Content>
    </>
  )
}
