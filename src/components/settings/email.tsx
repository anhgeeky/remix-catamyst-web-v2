import NextHead from 'next/head'
import { Heading, HStack, Stack, Text } from '@chakra-ui/react'

import { Content } from '@components'
import { SettingsHero, UserEmailForm } from '@components/settings'

export function SettingsEmail({ state }) {
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
          {/* user, not profile */}
          <UserEmailForm user={state.user} />
        </Stack>
      </Content>
    </>
  )
}
