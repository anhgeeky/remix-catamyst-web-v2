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
import { getName } from '@utils'

export function DashboardMentors({ state }) {
  return (
    <>
      <NextHead>
        <title>Mentors Dashboard · Catamyst</title>
      </NextHead>

      <DashboardHero>
        <Heading as="h1" size="xl">
          Mentors
        </Heading>
        <Text>
          You can be assigned with a dedicated 1-on-1 live mentorship from
          experienced professionals.
        </Text>
      </DashboardHero>

      <Content>
        <Stack spacing={5} width="100%">
          <Stack spacing={5} width="100%">
            <Stack>
              <HeadingStack>Assigned</HeadingStack>
              <Card>
                <CardPlaceholder>
                  <Box>
                    <NextImage
                      className="invertable next-image"
                      src={`https://storage.catamyst.com/illustrations/dashboard-mentors-none.png`}
                      alt="No Mentors"
                      width={200}
                      height={200}
                    />
                  </Box>
                  <Text>
                    Hey {getName(state.profile)}, you don't have any mentors
                    yet.
                  </Text>
                  <LinkButton colorScheme="teal" href="/settings/super">
                    Upgrade to Super
                  </LinkButton>
                </CardPlaceholder>
              </Card>
            </Stack>

            <Stack>
              <HeadingStack>Available</HeadingStack>
              <Card>
                <CardPlaceholder>
                  <Text>
                    Here are the available mentors you can request when you
                    enroll in <b>Super</b> plan.
                  </Text>
                  <LinkButton colorScheme="teal" href="/settings/super">
                    Upgrade to Super
                  </LinkButton>
                </CardPlaceholder>
              </Card>
            </Stack>
          </Stack>
        </Stack>
      </Content>
    </>
  )
}
