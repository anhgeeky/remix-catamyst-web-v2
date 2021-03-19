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

export function DashboardTracks({ auth }) {
  return (
    <>
      <NextHead>
        <title>Tracks Dashboard · Catamyst</title>
      </NextHead>

      <DashboardHero>
        <Heading as="h1" size="xl">
          Tracks
        </Heading>
        <Text>
          You can learn then practice from our guided curriculum called tracks
          that contain various topics and lessons.
        </Text>
      </DashboardHero>

      <Content>
        <Stack spacing={5} width="100%">
          <Stack>
            <HeadingStack>Enrolled</HeadingStack>
            <Card>
              <CardPlaceholder>
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
                <LinkButton href="/learn" colorScheme="teal">
                  Choose a track
                </LinkButton>
              </CardPlaceholder>
            </Card>
          </Stack>
          <Stack>
            <HeadingStack>Completed</HeadingStack>
            <Card>
              <CardPlaceholder>
                <Text>
                  Hey {auth.user.name}, you haven't completed any track yet.
                </Text>
              </CardPlaceholder>
            </Card>
          </Stack>
        </Stack>
      </Content>
    </>
  )
}
