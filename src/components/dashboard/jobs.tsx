import NextHead from 'next/head'
import NextImage from 'next/image'
import { Box, Heading, Stack, Text } from '@chakra-ui/react'

import { Card, Content, HeadingStack } from '@components'
import { DashboardHero } from '@components/dashboard'

export function DashboardJobs({ auth }) {
  return (
    <>
      <NextHead>
        <title>Jobs Dashboard · Catamyst</title>
      </NextHead>

      <DashboardHero>
        <Heading as="h1" size="xl">
          Jobs
        </Heading>
        <Text>Your applied jobs and posted jobs.</Text>
      </DashboardHero>

      <Content>
        <Stack spacing={5} width="100%">
          <Stack>
            <HeadingStack>Jobs you've applied to:</HeadingStack>
            <Card>
              <Box>
                <NextImage
                  src={`${process.env.NEXT_PUBLIC_STORAGE_URL}/illustrations/dashboard-jobs-none.png`}
                  alt="No Jobs"
                  width={200}
                  height={200}
                />
              </Box>
              <Text>
                Hey {auth.user.name}, you haven't applied to a job yet.
              </Text>
            </Card>
          </Stack>

          <Stack>
            <HeadingStack>Jobs you've posted:</HeadingStack>
            <Card>Hey {auth.user.name}, you haven't posted any job yet.</Card>
          </Stack>
        </Stack>
      </Content>
    </>
  )
}
