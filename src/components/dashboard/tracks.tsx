import NextHead from 'next/head'
import NextImage from 'next/image'
import { Box, Heading, Stack, Text } from '@chakra-ui/react'
import { Card, Content, HeadingStack } from '@components'
import { DashboardHero } from '@components/dashboard'

export default function DashboardTracks({ auth }) {
  return (
    <>
      <NextHead>
        <title>Tracks Dashboard · Catamyst</title>
      </NextHead>

      <DashboardHero>
        <Heading as="h1" size="xl">
          Tracks
        </Heading>
        <Text>Your current and available tracks</Text>
      </DashboardHero>

      <Content>
        <Stack spacing={5} width="100%">
          <Stack>
            <HeadingStack>Enrolled Tracks:</HeadingStack>
            <Card>
              <Box>
                <NextImage
                  src={`${process.env.NEXT_PUBLIC_STORAGE_URL}/illustrations/dashboard-tracks-none.png`}
                  alt="No Tracks"
                  width={200}
                  height={200}
                />
              </Box>
              <Text>
                Hey {auth.user.name}, you haven't enrolled in any track yet.
              </Text>
            </Card>
          </Stack>
          <Stack>
            <HeadingStack>Completed Tracks:</HeadingStack>
            <Card>
              <Text>
                Hey {auth.user.name}, you haven't completed any track yet.
              </Text>
            </Card>
          </Stack>
        </Stack>
      </Content>
    </>
  )
}
