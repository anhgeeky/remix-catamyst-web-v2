import NextHead from 'next/head'
import { Stack, Heading, HStack, Text, Badge } from '@chakra-ui/react'

import { Content } from '@components'
import { SettingsHero } from '@components/settings'

export function SettingsProfile({ auth }) {
  return (
    <>
      <NextHead>
        <title>Profile Settings · Catamyst</title>
      </NextHead>

      <SettingsHero>
        <Heading as="h1" size="xl">
          Profile Settings
        </Heading>
        <HStack>
          <Text>Edit your profile here. Make it good!</Text>
        </HStack>
      </SettingsHero>

      <Content>
        <Stack spacing={5} width="100%">
          <Stack>
            <ul>
              <li>Username handle</li>
              <li>Avatar picture</li>
              <li>Cover picture</li>
              <li>Name</li>
              <li>Nick name</li>
              <li>Headline</li>
              <li>Bio</li>
              <li>Location</li>
              <li>Website</li>
              <li>Socials</li>
              <li>Organization</li>
              <li>Skill set</li>
              <li>Available for hire</li>
              <li>Country</li>
              <li>Preferred language</li>
            </ul>
          </Stack>
        </Stack>
      </Content>
    </>
  )
}
