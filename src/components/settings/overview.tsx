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

import { Content, Card, LinkButton, Icon } from '@components'
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
          <Card as={Stack}>
            <Heading as="h2" size="md">
              Account Type
            </Heading>
            <RadioGroup defaultValue={user.role}>
              <Text></Text>
              <Stack direction="row">
                <Radio value="Learner">Learner</Radio>
                <Radio value="Employer">Employer</Radio>
              </Stack>
            </RadioGroup>
            <Stack direction={{ base: 'column', sm: 'row' }}>
              <Button
                colorScheme="blue"
                size="sm"
                leftIcon={<Icon name="save" />}
              >
                Change profile type
              </Button>
              <LinkButton
                variant="outline"
                size="sm"
                href="/settings/profile"
                leftIcon={<Icon name="edit" />}
              >
                Edit profile details
              </LinkButton>
            </Stack>
          </Card>

          <Card as={Stack}>
            <Heading as="h2" size="md">
              Email
            </Heading>
            <Text>{user.email || 'name@example.com'}</Text>
            <Text>
              {user.isConfirmed
                ? 'Your email is confirmed'
                : 'Your email is not confirmed yet'}
            </Text>
            <Stack direction={{ base: 'column', sm: 'row' }}>
              {!user.isConfirmed && (
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
              Account Plan
            </Heading>
            <Text>
              Your <b>{user.role}</b> account is on the <b>{user.plan}</b> plan.
              Free of charge.
            </Text>
            <Stack direction={{ base: 'column', sm: 'row' }}>
              {user.plan !== 'Super' && (
                <LinkButton
                  href="/settings/pro"
                  colorScheme="yellow"
                  size="sm"
                  leftIcon={<Icon name="pro" />}
                >
                  {user.plan !== 'Pro'
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
                {user.plan !== 'Super'
                  ? 'Upgrade to Super plan'
                  : 'Manage Super plan'}
              </LinkButton>
            </Stack>
          </Card>

          <Card as={Stack}>
            <Heading as="h2" size="md">
              Billing and Payment
            </Heading>
            <Text>
              If you already subscribed for a <b>Pro</b> plan or enrolled for a{' '}
              <b>Super</b> plan, you can check your license key in your email.
            </Text>
            <Text>
              You can also manage or cancel your ongoing <b>Pro</b> plan
              subscription by clicking the <b>View content</b> button, then
              click the <b>Manage membership</b> button. There you will also see
              the <b>Cancel membership</b> button. Alternatively, you can also{' '}
              <b>Update membership</b> information.
            </Text>
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
        </SimpleGrid>
      </Content>
    </>
  )
}
