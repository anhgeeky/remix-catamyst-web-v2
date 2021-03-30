import NextHead from 'next/head'
import { Stack, Heading, HStack, Text } from '@chakra-ui/react'

import { Content } from '@components'
import { SettingsHero } from '@components/settings'

export function SettingsSuper({ auth }) {
  return (
    <>
      <NextHead>
        <title>Super Plan Settings · Catamyst</title>
      </NextHead>

      <SettingsHero>
        <Heading as="h1" size="xl">
          Super Plan Settings
        </Heading>
        <HStack>
          <Text>Request to receive Super plan.</Text>
        </HStack>
      </SettingsHero>

      <Content>
        <Stack spacing={5} width="100%">
          <Stack>
            <p>Super plan</p>
          </Stack>
        </Stack>
      </Content>
    </>
  )
}
