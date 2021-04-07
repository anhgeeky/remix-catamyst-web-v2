import NextHead from 'next/head'
import NextImage from 'next/image'
import { Box, Heading, Stack, Text, useMediaQuery } from '@chakra-ui/react'

import {
  Card,
  CardPlaceholder,
  Content,
  HeadingStack,
  LinkButton,
} from '@components'
import { DashboardHero } from '@components/dashboard'

export function DashboardProjects({ state }) {
  const [isTablet] = useMediaQuery('(max-width: 768px)')

  return (
    <>
      <NextHead>
        <title>Projects Dashboard · Catamyst</title>
      </NextHead>

      <DashboardHero>
        <Heading as="h1" size="xl">
          Projects
        </Heading>
        <Text>
          You can publish your own or contributed projects. Whether from the
          past, present, or still in development.
        </Text>
      </DashboardHero>

      <Content>
        <Stack spacing={5} width="100%">
          <Stack>
            <HeadingStack>Published Projects:</HeadingStack>
            <Card>
              <CardPlaceholder>
                <Box>
                  <NextImage
                    className="invertable next-image"
                    src={`https://storage.catamyst.com/illustrations/dashboard-projects-none-${
                      isTablet ? 'mobile' : 'desktop'
                    }.png`}
                    alt="No Projects"
                    width={200}
                    height={200}
                  />
                </Box>
                <Text>
                  Hey {state.profile.nickname}, you don't have any published
                  projects yet.
                </Text>
                <LinkButton colorScheme="teal" href="/dashboard/projects/new">
                  Publish a project
                </LinkButton>
              </CardPlaceholder>
            </Card>
          </Stack>

          <Stack>
            <HeadingStack>Draft Projects:</HeadingStack>
            <Card>
              <CardPlaceholder>
                <Text>
                  Hey {state.profile.nickname}, you don't have any draft
                  projects.
                </Text>
                <LinkButton colorScheme="teal" href="/dashboard/projects/new">
                  Publish a project
                </LinkButton>
              </CardPlaceholder>
            </Card>
          </Stack>
        </Stack>
      </Content>
    </>
  )
}
