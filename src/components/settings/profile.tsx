import NextHead from 'next/head'
import { Heading, HStack, Stack, Text } from '@chakra-ui/react'

import { Content } from '@components'
import {
  SettingsHero,
  UserProfilePreview,
  UserNameForm,
  UserHandleForm,
  UserAvatarForm,
  UserCoverForm,
  UserPersonalForm,
  UserWorkForm,
  UserSocialsForm,
} from '@components/settings'

export function SettingsProfile({ state }) {
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
        <Stack
          direction={{ base: 'column', md: 'row' }}
          align={{ md: 'flex-start' }}
          spacing={5}
        >
          <UserProfilePreview profile={state.profile} />
          <Stack flex={1} spacing={5} maxW={760}>
            <UserHandleForm state={state} />
            <UserNameForm state={state} />
            {/* <UserAvatarForm state={state} /> */}
            {/* <UserCoverForm state={state} /> */}
            <UserPersonalForm state={state} />
            <UserWorkForm state={state} />
            <UserSocialsForm state={state} />
          </Stack>
        </Stack>
      </Content>
    </>
  )
}
