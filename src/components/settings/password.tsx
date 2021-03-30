import NextHead from 'next/head'
import { Stack, Heading, HStack, Text } from '@chakra-ui/react'

import { Content } from '@components'
import { SettingsHero, UserPasswordForm } from '@components/settings'
import dataUsers from '@data/users.json'

export function SettingsPassword({ auth }) {
  const user = dataUsers.find((user) => user.id === auth.user.id)

  return (
    <>
      <NextHead>
        <title>Password Settings · Catamyst</title>
      </NextHead>

      <SettingsHero>
        <Heading as="h1" size="xl">
          Password Settings
        </Heading>
        <HStack>
          <Text>Change your password if you need to.</Text>
        </HStack>
      </SettingsHero>

      <Content>
        <Stack spacing={5} width="100%" maxW={760}>
          <UserPasswordForm user={user} />
        </Stack>
      </Content>
    </>
  )
}
