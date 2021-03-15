import NextHead from 'next/head'
import NextImage from 'next/image'
import { Box, Heading, Stack, Text } from '@chakra-ui/react'
import { Card, Content, HeadingStack } from '@components'
import { DashboardHero } from '@components/dashboard'

export default function DashboardMentors({ auth }) {
  return (
    <>
      <NextHead>
        <title>Mentors Dashboard · Catamyst</title>
      </NextHead>

      <DashboardHero>
        <Heading as="h1" size="xl">
          Mentors
        </Heading>
        <Text>Your assigned mentors from Catamyst.</Text>
      </DashboardHero>

      <Content>
        <Stack spacing={5} width="100%">
          <Stack spacing={5} width="100%">
            <Stack>
              <HeadingStack>Assigned mentors:</HeadingStack>
              <Card>
                <Box>
                  <NextImage
                    src={`${process.env.NEXT_PUBLIC_STORAGE_URL}/illustrations/dashboard-mentors-none.png`}
                    alt="No Mentors"
                    width={200}
                    height={200}
                  />
                </Box>
                <Text>
                  Hey {auth.user.name}, you don't have any mentors yet.
                </Text>
              </Card>
            </Stack>

            <Stack>
              <HeadingStack>Available mentors:</HeadingStack>
              <Card>
                <Text>Here are the available mentors you can request.</Text>
              </Card>
            </Stack>
          </Stack>
        </Stack>
      </Content>
    </>
  )
}
