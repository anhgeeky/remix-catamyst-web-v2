import NextHead from 'next/head'
import NextLink from 'next/link'
import {
  Avatar,
  Box,
  ButtonGroup,
  Heading,
  HStack,
  Link,
  SimpleGrid,
  Stack,
  Text,
  VStack,
  useColorModeValue,
} from '@chakra-ui/react'

import {
  Content,
  HeadingStack,
  Card,
  CardPlaceholder,
  Icon,
  LinkButton,
  MembershipButtons,
} from '@components'
import { DashboardHero } from '@components/dashboard'
import { UserNameHandle } from '@components/users'
import { dayNamePeriod } from '@utils'

export function DashboardOverview({ state }) {
  return (
    <>
      <NextHead>
        <title>Overview Dashboard · Catamyst</title>
      </NextHead>

      <DashboardHero>
        <Heading as="h1" size="xl">
          Happy {dayNamePeriod}
          {state.profile.nickname && `, ${state.profile.nickname}`}!
        </Heading>
        <HStack>
          <Text>
            Welcome to the Dashboard.{' '}
            <NextLink href="/settings/overview" passHref>
              <Link color="teal.500">Go to the Settings</Link>
            </NextLink>
          </Text>
        </HStack>
      </DashboardHero>

      <Content>
        <SimpleGrid
          spacing={5}
          width="100%"
          minChildWidth={{ base: 280, sm: 350 }}
        >
          <Stack width="100%">
            <HeadingStack>You</HeadingStack>
            <Card>
              <VStack spacing={3}>
                <Box
                  rounded="full"
                  p={1}
                  zIndex={1}
                  bg={useColorModeValue('gray.50', 'gray.900')}
                >
                  <Avatar
                    name={state.profile.name}
                    src={state.profile.avatar_url}
                    size="2xl"
                  />
                </Box>

                <UserNameHandle user={state.profile} />

                <ButtonGroup size="sm">
                  {state.profile.handle && (
                    <LinkButton
                      href={`/${state.profile.handle}`}
                      colorScheme="teal"
                      leftIcon={<Icon name="profile" />}
                    >
                      Visit profile
                    </LinkButton>
                  )}
                  {!state.profile.handle && (
                    <LinkButton
                      href="/settings/profile"
                      colorScheme="teal"
                      leftIcon={<Icon name="edit" />}
                    >
                      Setup profile
                    </LinkButton>
                  )}
                  <LinkButton
                    href="/settings/overview"
                    colorScheme="teal"
                    variant="outline"
                    leftIcon={<Icon name="settings" />}
                  >
                    Settings
                  </LinkButton>
                </ButtonGroup>
              </VStack>
            </Card>
          </Stack>

          <Stack>
            <HeadingStack>
              <Icon name="cat" />
              Membership
            </HeadingStack>
            <CardOverview>
              <CardPlaceholder>
                <Text>You're currently on {state.profile.plan} plan.</Text>
                <MembershipButtons plan={state.profile.plan} />
              </CardPlaceholder>
            </CardOverview>
          </Stack>

          <Stack width="100%">
            <HeadingStack>
              <Icon name="tracks" />
              Tracks
            </HeadingStack>
            <CardOverview>
              <CardPlaceholder>
                <Text>
                  You can learn then practice from our guided curriculum called
                  tracks that contain various topics and lessons.
                </Text>
                <LinkButton href="/learn">Choose a track</LinkButton>
              </CardPlaceholder>
            </CardOverview>
          </Stack>

          <Stack width="100%">
            <HeadingStack>
              <Icon name="projects" />
              Projects
            </HeadingStack>
            <CardOverview>
              <CardPlaceholder>
                <Text>
                  You can publish your own or contributed projects. Whether from
                  the past, present, or still in development.
                </Text>
                <LinkButton href="/dashboard/projects/new">
                  Publish a project
                </LinkButton>
              </CardPlaceholder>
            </CardOverview>
          </Stack>

          <Stack width="100%">
            <HeadingStack>
              <Icon name="posts" />
              Posts
            </HeadingStack>
            <CardOverview>
              <CardPlaceholder>
                <Text>
                  You can write a blog post, notes, tutorial, publication,
                  announcement, news, or a changelog.
                </Text>
                <LinkButton href="/dashboard/posts/new">
                  Write a post
                </LinkButton>
              </CardPlaceholder>
            </CardOverview>
          </Stack>

          <Stack width="100%">
            <HeadingStack>
              <Icon name="discussions" />
              Discussions
            </HeadingStack>
            <CardOverview>
              <CardPlaceholder>
                <Text>
                  You can discuss ideas, ask questions, and answer things with
                  other community members in the forum.
                </Text>
                <LinkButton href="/forum">Explore the forum</LinkButton>
              </CardPlaceholder>
            </CardOverview>
          </Stack>

          <Stack width="100%">
            <HeadingStack>
              <Icon name="jobs" />
              Jobs
            </HeadingStack>
            <CardOverview>
              <CardPlaceholder>
                <Text>
                  You can search and apply jobs that suits you. Either for a
                  full-time, part-time, quarter-time, freelance, or
                  project-based.
                </Text>
                <LinkButton href="/jobs">Search for a job</LinkButton>
              </CardPlaceholder>
            </CardOverview>
          </Stack>

          <Stack width="100%">
            <HeadingStack>
              <Icon name="mentors" />
              Mentors
            </HeadingStack>
            <CardOverview>
              <CardPlaceholder>
                <Text>
                  You can be assigned with a dedicated 1-on-1 live mentorship
                  from experienced professionals. This needs a <b>Super</b>{' '}
                  plan.
                </Text>
                <LinkButton href="/settings/super">
                  Request Super plan
                </LinkButton>
              </CardPlaceholder>
            </CardOverview>
          </Stack>
        </SimpleGrid>
      </Content>
    </>
  )
}

function CardOverview({ children }) {
  return (
    <Card
      minH={250}
      height="100%"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      {children}
    </Card>
  )
}
