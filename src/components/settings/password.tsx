import NextHead from 'next/head'
import { Stack, Heading, HStack, Text } from '@chakra-ui/react'

import { Content } from '@components'
import { SettingsHero, UserPasswordForm } from '@components/settings'

export function SettingsPassword({ state }) {
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
          <Text>Update your password if you need to.</Text>
        </HStack>
      </SettingsHero>

      <Content>
        <Stack spacing={5} width="100%" maxW={760}>
          {/* user, not profile */}
          <UserPasswordForm user={state.user} />
        </Stack>
      </Content>
    </>
  )
}
