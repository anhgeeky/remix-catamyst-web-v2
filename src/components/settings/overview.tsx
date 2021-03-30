import NextHead from 'next/head'
import {
  Stack,
  Heading,
  HStack,
  Text,
  Button,
  SimpleGrid,
  Radio,
  RadioGroup,
} from '@chakra-ui/react'

import { Content, Card } from '@components'
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
          </Card>

          <Card as={Stack}>
            <Heading as="h2" size="md">
              Email
            </Heading>
            <Text>{user.email || 'name@example.com'}</Text>
            <Text>{user.isConfirmed && 'Email is confirmed'}</Text>
          </Card>

          <Card as={Stack}>
            <Heading as="h2" size="md">
              Account Plan
            </Heading>
            <Text>
              Your {user.role} account is on the {user.plan} plan. Free of
              charge.
            </Text>
          </Card>

          <Card as={Stack}>
            <Heading as="h2" size="md">
              Billing and Payment
            </Heading>
            <Text>No information yet.</Text>
          </Card>

          <Card as={Stack} align="flex-start">
            <Heading as="h2" size="md">
              Account Data
            </Heading>
            <Text>Receive your whole owned data. It's yours.</Text>
            <Button colorScheme="teal">Export my account data</Button>
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
            <Button colorScheme="red">Delete my account</Button>
          </Card>
        </SimpleGrid>
      </Content>
    </>
  )
}
