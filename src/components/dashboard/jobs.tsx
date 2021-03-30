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
        <Text>
          You can search and apply jobs that suits you. Either for a full-time,
          part-time, quarter-time, freelance, or project-based.
        </Text>
      </DashboardHero>

      <Content>
        <Stack spacing={5} width="100%">
          <Stack>
            <HeadingStack>Jobs you've applied to:</HeadingStack>
            <Card>
              <CardPlaceholder>
                <Box>
                  <NextImage
                    className="invertable next-image"
                    src={`${process.env.NEXT_PUBLIC_STORAGE_URL}/illustrations/dashboard-jobs-none.png`}
                    alt="No Jobs"
                    width={200}
                    height={200}
                  />
                </Box>
                <Text>
                  Hey {auth.user.name}, you haven't applied to a job yet.
                </Text>
                <LinkButton colorScheme="teal" href="/jobs">
                  Search for a job
                </LinkButton>
              </CardPlaceholder>
            </Card>
          </Stack>
        </Stack>
      </Content>
    </>
  )
}
