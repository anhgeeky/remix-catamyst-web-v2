import NextHead from 'next/head'
import { Stack, Heading, HStack, Text, Badge } from '@chakra-ui/react'

import { Content } from '@components'
import { SettingsHero } from '@components/settings'

export function SettingsEmail({ auth }) {
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
          <Text>Change your email if you need to.</Text>
        </HStack>
      </SettingsHero>

      <Content>
        <Stack spacing={5} width="100%">
          <Stack>
            <p>Email</p>
          </Stack>
        </Stack>
      </Content>
    </>
  )
}
