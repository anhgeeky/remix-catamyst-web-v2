import NextHead from 'next/head'
import {
  Stack,
  Heading,
  HStack,
  Text,
  ButtonGroup,
  Button,
  SimpleGrid,
  Radio,
  RadioGroup,
} from '@chakra-ui/react'

import { Content, Card, LinkButton } from '@components'
import { SettingsHero } from '@components/settings'

import dataUsers from '@data/users.json'

export function SettingsOverview({ auth }) {
  const user = dataUsers.find((user) => user.id === auth.user.id)

  return (
    <>
      <NextHead>
        <title>Overview Settings · Catamyst</title>
      </NextHead>

      <SettingsHero>
        <Heading as="h1" size="xl">
          Hey, {user.name}
        </Heading>
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
          <Card as={Stack} align="flex-start">
            <Heading as="h2" size="md">
              Profile
            </Heading>
            <Text>Name: {user.name}</Text>
            <Text>Username: @{user.handle}</Text>
            {user.isVerified && <Text>{'Account is verified'}</Text>}
            <RadioGroup defaultValue={user.role}>
              <Text>Profile Type:</Text>
              <Stack direction="row">
                <Radio value="Learner">Learner</Radio>
                <Radio value="Employer">Employer</Radio>
              </Stack>
            </RadioGroup>
            <ButtonGroup colorScheme="blue" size="sm">
              <Button>Update profile type</Button>
              <LinkButton variant="outline" href="/settings/profile">
                Edit profile
              </LinkButton>
            </ButtonGroup>
          </Card>

          <Card as={Stack} align="flex-start">
            <Heading as="h2" size="md">
              Email
            </Heading>
            <Text>{user.email || 'name@example.com'}</Text>
            <Text>
              {user.isConfirmed
                ? 'Your email is confirmed'
                : 'Your email is not confirmed yet'}
            </Text>
            <ButtonGroup colorScheme="blue" size="sm">
              <LinkButton href="/settings/email">
                Edit email preferences
              </LinkButton>
              {!user.isConfirmed && (
                <Button variant="outline">Resend confirmation email</Button>
              )}
            </ButtonGroup>
          </Card>

          <Card as={Stack} align="flex-start">
            <Heading as="h2" size="md">
              Account Plan
            </Heading>
            <Text>
              Your <b>{user.role}</b> account is on the <b>{user.plan}</b> plan.
              Free of charge.
            </Text>
            <ButtonGroup colorScheme="yellow" size="sm">
              {user.plan !== 'Pro' && user.plan !== 'Super' && (
                <LinkButton href="/settings/pro">
                  Upgrade to Pro plan
                </LinkButton>
              )}
              {user.plan !== 'Super' && (
                <LinkButton href="/settings/super">
                  Upgrade to Super plan
                </LinkButton>
              )}
            </ButtonGroup>
          </Card>

          <Card as={Stack}>
            <Heading as="h2" size="md">
              Billing and Payment
            </Heading>
            <Text>
              If you already subscribed for a Pro plan or enrolled for a Super
              plan, you can check your license key in your email.
            </Text>
            <Text>
              You can also manage or cancel your ongoing subscription by
              clicking the <b>View content</b> button, then click the{' '}
              <b>Manage membership</b> button. There you will also see the{' '}
              <b>Cancel membership</b> button. Alternatively, you can also{' '}
              <b>Update membership</b> information.
            </Text>
          </Card>

          <Card as={Stack} align="flex-start">
            <Heading as="h2" size="md">
              Account Data
            </Heading>
            <Text>Receive your whole owned data, because it's all yours.</Text>
            <ButtonGroup colorScheme="teal" size="sm">
              <Button>Export my account data</Button>
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
              <Button>Delete my account</Button>
            </ButtonGroup>
          </Card>
        </SimpleGrid>
      </Content>
    </>
  )
}
