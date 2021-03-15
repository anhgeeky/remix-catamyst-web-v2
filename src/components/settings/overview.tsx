import NextHead from 'next/head'
import { Stack, Heading, HStack, Text, Badge } from '@chakra-ui/react'

import { Content } from '@components'
import { SettingsHero } from '@components/settings'

export function SettingsOverview({ auth }) {
  return (
    <>
      <NextHead>
        <title>Overview Settings · Catamyst</title>
      </NextHead>

      <SettingsHero>
        <Heading as="h1" size="xl">
          Settings Overview
        </Heading>
        <HStack>
          <Text>Your account is in a good condition.</Text>
        </HStack>
      </SettingsHero>

      <Content>
        <Stack spacing={5} width="100%">
          <Stack>
            <ul>
              <li>Profile information</li>
              <li>Email</li>
              <li>Plan</li>
              <li>Billing</li>
              <li>Export data</li>
            </ul>
          </Stack>
        </Stack>
      </Content>
    </>
  )
}
