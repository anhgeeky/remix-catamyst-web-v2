import NextHead from 'next/head'
import { Heading, HStack, Stack, Text } from '@chakra-ui/react'

import { Content } from '@components'
import { SettingsHero, UserEmailForm } from '@components/settings'
import dataUsers from '@data/users.json'

export function SettingsEmail({ auth }) {
  const user = dataUsers.find((user) => user.id === auth.user.id)

  return (
    <>
      <NextHead>
        <title>Email Settings · Catamyst</title>
      </NextHead>

      <SettingsHero>
        <Heading as="h1" size="xl">
          Email Settings
        </Heading>
        <HStack>
          <Text>Update your email and notification preferences.</Text>
        </HStack>
      </SettingsHero>

      <Content>
        <Stack spacing={5} width="100%" maxW={760}>
          <UserEmailForm user={user} />
        </Stack>
      </Content>
    </>
  )
}
