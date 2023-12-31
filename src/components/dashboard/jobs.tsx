import NextHead from 'next/head'
import NextImage from 'next/image'
import { Box, Heading, Stack, Text } from '@chakra-ui/react'

import {
  Card,
  CardPlaceholder,
  Content,
  HeadingStack,
  LinkButton,
} from '@/components'
import { DashboardHero } from '@/components/dashboard'
import { getName } from '@/utils'

export function DashboardJobs({ state }) {
  return (
    <>
      <NextHead>
        <title>Jobs Dashboard · Catamyst</title>
      </NextHead>

      <DashboardHero>
        <Heading as="h1" size="xl">
          Jobs
        </Heading>
        <Text>
          You can search and apply jobs that suits you. Either for a full-time,
          part-time, quarter-time, freelance, or project-based.
        </Text>
      </DashboardHero>

      <Content>
        <Stack spacing={5} width="100%">
          {state?.profile?.mode === 'Learner' && (
            <Stack>
              <HeadingStack>Applied</HeadingStack>
              <Card>
                <CardPlaceholder>
                  <Box>
                    <NextImage
                      className="invertable next-image"
                      src={`https://storage.catamyst.com/illustrations/dashboard-jobs-none.png`}
                      alt="No Jobs"
                      width={200}
                      height={200}
                    />
                  </Box>
                  <Text>
                    Hey {getName(state.profile)}, you haven't applied to a job
                    yet.
                  </Text>
                  <LinkButton colorScheme="teal" href="/jobs">
                    Search for a job
                  </LinkButton>
                </CardPlaceholder>
              </Card>
            </Stack>
          )}

          {state?.profile?.mode !== 'Learner' && (
            <Stack>
              <HeadingStack>Posted</HeadingStack>
              <Card>
                <CardPlaceholder>
                  <Box>
                    <NextImage
                      className="invertable next-image"
                      src={`https://storage.catamyst.com/illustrations/dashboard-jobs-none.png`}
                      alt="No Jobs"
                      width={200}
                      height={200}
                    />
                  </Box>
                  <Text>
                    Hey {getName(state.profile)}, you haven't applied to a job
                    yet.
                  </Text>
                  <LinkButton colorScheme="teal" href="/jobs">
                    Search for a job
                  </LinkButton>
                </CardPlaceholder>
              </Card>
            </Stack>
          )}
        </Stack>
      </Content>
    </>
  )
}
