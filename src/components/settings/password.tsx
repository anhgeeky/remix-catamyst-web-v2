import NextHead from 'next/head'
import { Stack, Heading, HStack, Text, Badge } from '@chakra-ui/react'

import { Content } from '@components'
import { SettingsHero } from '@components/settings'

export function SettingsPassword({ auth }) {
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
        <Stack spacing={5} width="100%">
          <Stack>
            <p>Password</p>
          </Stack>
        </Stack>
      </Content>
    </>
  )
}
