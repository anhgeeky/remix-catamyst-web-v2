import NextHead from 'next/head'
import {
  Stack,
  Heading,
  HStack,
  Text,
  ButtonGroup,
  Button,
  SimpleGrid,
  Link,
} from '@chakra-ui/react'

import { Content, Card, LinkButton, Icon } from '@components'
import { SettingsHero, ProfileModeForm } from '@components/settings'
import { getCompleteDateTime } from '@utils'

export function SettingsOverview({ state }) {
  return (
    <>
      <NextHead>
        <title>Overview Settings · Catamyst</title>
      </NextHead>

      {state.loading && <p>Loading...</p>}
      {!state.loading && state.user && state.profile && (
        <SettingsOverviewContent state={state} />
      )}
    </>
  )
}

export function SettingsOverviewContent({ state }) {
  const { user, profile } = state

  return (
    <>
      <SettingsHero>
        {!profile.name && (
          <Heading as="h1" size="xl">
            Hello {user.email}
          </Heading>
        )}
        {profile.name && (
          <Heading as="h1" size="xl">
            Hey, {profile.name}
          </Heading>
        )}
        <HStack>
          <Text>
            Welcome to the Settings. This is your overal account information.
          </Text>
        </HStack>
      </SettingsHero>

      <Content>
        <SimpleGrid
          spacing={3}
          width="100%"
          minChildWidth={{ base: 280, sm: 400 }}
        >
          <ProfileModeForm state={state} />

          <Card as={Stack}>
            <Heading as="h2" size="md">
              Email
            </Heading>
            <Text>{user.email || 'name@example.com'}</Text>
            <Text>
              {user.confirmed_at ? (
                <span>
                  Your email is confirmed on{' '}
                  {getCompleteDateTime(user.confirmed_at)}
                </span>
              ) : (
                <span>Your email is not confirmed yet</span>
              )}
            </Text>
            <Stack direction={{ base: 'column', sm: 'row' }}>
              {!user.confirmed_at && (
                <Button
                  size="sm"
                  colorScheme="green"
                  leftIcon={<Icon name="email" />}
                >
                  Resend confirmation email
                </Button>
              )}
              <LinkButton
                href="/settings/email"
                variant="outline"
                size="sm"
                leftIcon={<Icon name="edit" />}
              >
                Edit email preferences
              </LinkButton>
            </Stack>
          </Card>

          <Card as={Stack}>
            <Heading as="h2" size="md">
              Plan and Billing
            </Heading>
            <Text>
              Your <b>{profile.mode}</b> account is on the <b>{profile.plan}</b>{' '}
              plan. {profile.plan === 'Basic' && 'Free of charge.'}
            </Text>
            <Stack direction={{ base: 'column', sm: 'row' }}>
              {profile.plan !== 'Super' && (
                <LinkButton
                  href="/settings/pro"
                  colorScheme="yellow"
                  size="sm"
                  leftIcon={<Icon name="pro" />}
                >
                  {profile.plan !== 'Pro'
                    ? 'Upgrade to Pro plan'
                    : 'Manage Pro plan'}
                </LinkButton>
              )}
              <LinkButton
                href="/settings/super"
                colorScheme="yellow"
                size="sm"
                leftIcon={<Icon name="super" />}
              >
                {profile.plan !== 'Super'
                  ? 'Upgrade to Super plan'
                  : 'Manage Super plan'}
              </LinkButton>
            </Stack>
          </Card>

          <Card as={Stack} align="flex-start">
            <Heading as="h2" size="md">
              Account Data
            </Heading>
            <Text>Receive your whole owned data, because it's all yours.</Text>
            <ButtonGroup colorScheme="green" size="sm">
              <Button isDisabled leftIcon={<Icon name="export" />}>
                Export my account data
              </Button>
            </ButtonGroup>
          </Card>

          <Card as={Stack} align="flex-start">
            <Heading as="h2" size="md">
              Account Removal
            </Heading>
            <Text>
              Permanently remove your account and all of its contents from the
              Catamyst platform. This action is not reversible, so please
              continue with caution.
            </Text>
            <ButtonGroup colorScheme="red" size="sm">
              <Button isDisabled leftIcon={<Icon name="delete" />}>
                Delete my account
              </Button>
            </ButtonGroup>
          </Card>

          {process.env.NODE_ENV === 'test' && (
            <>
              <Card as={Stack}>
                <Heading as="h2" size="md">
                  Raw User Data
                </Heading>
                <Text>This is your user data that we store:</Text>
                <Text as="pre" fontSize="xs">
                  {JSON.stringify(user, null, 2)}
                </Text>
              </Card>

              <Card as={Stack}>
                <Heading as="h2" size="md">
                  Raw Profile Data
                </Heading>
                <Text>This is your profile data that we store:</Text>
                <Text as="pre" fontSize="xs">
                  {JSON.stringify(profile, null, 2)}
                </Text>
              </Card>
            </>
          )}
        </SimpleGrid>
      </Content>
    </>
  )
}
