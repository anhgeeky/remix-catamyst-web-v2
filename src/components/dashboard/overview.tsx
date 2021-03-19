import NextHead from 'next/head'
import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Heading,
  HStack,
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
} from '@components'
import { DashboardHero } from '@components/dashboard'
import { UserNameHandle } from '@components/user'
import { dayNamePeriod } from '@utils'

import dataUsers from '@data/users.json'

export function DashboardOverview({ auth }) {
  const user = dataUsers.find((user) => user.id === auth.user.id)

  return (
    <>
      <NextHead>
        <title>Overview Dashboard · Catamyst</title>
      </NextHead>

      {user && (
        <>
          <DashboardHero>
            <Heading as="h1" size="xl">
              Welcome, {user.name}!
            </Heading>
            <HStack>
              <Text>
                Happy {dayNamePeriod}. This is your dashboard. You are a{' '}
                <b>{user.role}</b> with <b>{user.plan}</b> plan.
              </Text>
            </HStack>
          </DashboardHero>

          <Content>
            <SimpleGrid
              spacing={5}
              width="100%"
              minChildWidth={280}
              minChildHeight={300}
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
                        name={user.name}
                        src={user.avatarUrl}
                        size="2xl"
                      />
                    </Box>

                    <UserNameHandle user={user} />
                    <Heading as="h3" size="xs" fontFamily="body">
                      {user.email || 'name@example.com'}
                    </Heading>

                    <ButtonGroup size="xs">
                      <Button colorScheme="teal">Visit Profile</Button>
                      <Button colorScheme="teal" variant="outline">
                        Edit Profile
                      </Button>
                    </ButtonGroup>
                  </VStack>
                </Card>
              </Stack>

              <Stack width="100%">
                <HeadingStack>
                  <Icon name="tracks" />
                  Tracks
                </HeadingStack>
                <Card>
                  <CardPlaceholder>
                    <Text>
                      You can learn then practice from our guided curriculum
                      called tracks that contain various topics and lessons.
                    </Text>
                    <LinkButton href="/learn">Choose a track</LinkButton>
                  </CardPlaceholder>
                </Card>
              </Stack>

              <Stack width="100%">
                <HeadingStack>
                  <Icon name="projects" />
                  Projects
                </HeadingStack>
                <Card>
                  <CardPlaceholder>
                    <Text>
                      You can publish your own or contributed projects. Whether
                      from the past, present, or still in development.
                    </Text>
                    <LinkButton href="/dashboard/projects/new">
                      Publish a project
                    </LinkButton>
                  </CardPlaceholder>
                </Card>
              </Stack>

              <Stack width="100%">
                <HeadingStack>
                  <Icon name="posts" />
                  Posts
                </HeadingStack>
                <Card>
                  <CardPlaceholder>
                    <Text>
                      You can write a blog post, notes, tutorial, publication,
                      announcement, news, or a changelog.
                    </Text>
                    <LinkButton href="/dashboard/posts/new">
                      Write a post
                    </LinkButton>
                  </CardPlaceholder>
                </Card>
              </Stack>

              <Stack width="100%">
                <HeadingStack>
                  <Icon name="discussions" />
                  Discussions
                </HeadingStack>
                <Card>
                  <CardPlaceholder>
                    <Text>
                      You can discuss ideas, ask questions, and answer things
                      with other community members in the forum.
                    </Text>
                    <LinkButton href="/forum">Explore the forum</LinkButton>
                  </CardPlaceholder>
                </Card>
              </Stack>

              <Stack width="100%">
                <HeadingStack>
                  <Icon name="jobs" />
                  Jobs
                </HeadingStack>
                <Card>
                  <CardPlaceholder>
                    <Text>
                      You can search and apply jobs that suits you. Either for a
                      full-time, part-time, quarter-time, freelance, or
                      project-based.
                    </Text>
                    <LinkButton href="/jobs">Search for a job</LinkButton>
                  </CardPlaceholder>
                </Card>
              </Stack>

              <Stack width="100%">
                <HeadingStack>
                  <Icon name="mentors" />
                  Mentors
                </HeadingStack>
                <Card>
                  <CardPlaceholder>
                    <Text>
                      You can be assigned with a dedicated 1-on-1 live
                      mentorship from experienced professionals. This needs a{' '}
                      <b>Super</b> plan.
                    </Text>
                    <LinkButton href="/settings/billing?plan=super">
                      Request Super plan
                    </LinkButton>
                  </CardPlaceholder>
                </Card>
              </Stack>
            </SimpleGrid>
          </Content>
        </>
      )}
    </>
  )
}
