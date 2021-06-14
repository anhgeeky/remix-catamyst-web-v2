import NextHead from 'next/head'
import { Stack, Heading, HStack, Text } from '@chakra-ui/react'

import { Content } from '@/components'
import { SettingsHero } from '@/components/settings'

export function SettingsBilling() {
  return (
    <>
      <NextHead>
        <title>Billing and Plans Settings · Catamyst</title>
      </NextHead>

      <SettingsHero>
        <Heading as="h1" size="xl">
          Billing and Plans Settings
        </Heading>
        <HStack>
          <Text>Upgrade or just see your current plan status.</Text>
        </HStack>
      </SettingsHero>

      <Content>
        <Stack spacing={5} width="100%">
          <Stack>
            <p>Billing and Plans</p>
          </Stack>
        </Stack>
      </Content>
    </>
  )
}
